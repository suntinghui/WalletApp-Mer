<template>
	<view>
		<view class="bg-white padding text-center solid-bottom">
			<!-- <image src="../../../static/img-tiaoxingma.png" mode="widthFix" style="width: 100%;"></image> -->

			<view>
				<view class=" text-gray padding-tb-sm" @tap="showCode()">点击可查看付款码数字</view>
				<tkiBarcode cid="code128" :loadMake="true" :opations="opations" :onval="true" format="code128" :val="val" ref="code128"
				 @result="code128" />
			</view>

			<view class="padding-tb">
				<tki-qrcode class="qrimg" v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :icon="icon"
				 :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" loadingText="正在加载"
				 @result="qrR" />
			</view>

		</view>

		<view class="cu-list menu bg-white select-payment solid-top">
			<view class="cu-item arrow border-top">
				<button class="cu-btn content" @tap="showModal" data-target="bottomModal">
					<image src="../../../static/icon-huabei.png" class="png" mode="aspectFit"></image>
					<view class="text-grey text-left">
						<view class="font-bold">{{bankList[current].accountNbrFormat}}</view>
						<view>优先使用此付款方式</view>
					</view>
				</button>
			</view>
		</view>
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-grey" @tap="hideModal">取消</view>
					<view class="action text-green" @tap="hideModal">确定</view>
				</view>

				<view class="uni-list">
					<radio-group class="block" v-for="(item, index) in bankList" @change="RadioChange">
						<view class="cu-form-group">
							<view class="padding-sm solid-bottom">
								<view class="title">{{item.accountNbrFormat}}</view>
								<view class="desc text-sm">单笔限额{{item.singleLimitAmount}}元,每日限额{{item.dayLimitAmount}}元</view>
							</view>
							<radio :checked="index === current" :value="item.id"></radio>
						</view>
					</radio-group>
				</view>
			</view>
		</view>

		<!--  popup -->
		<uni-popup class="radius" :show="showPwdModal" :mask-click="false" @change="change">
			<view class="pay-modal">
				<view class="padding-bottom solid-bottom text-center">请输入支付密码</view>
				<view class="padding-xs flex justify-between">
					<view class="text-gray">支付方式：</view>
					<view class="text-black">{{bankList[current].bankName}} {{bankList[current].accountNbr}}</view>
				</view>
				<view class="padding-xs flex justify-between">
					<view class="text-gray">金额：</view>
					<view class="text-black text-price text-bold text-xxl">{{transferInfo.transAmount}}</view>
				</view>

				<view class="padding-tb-xs pay-modal-pwd">
					<validCode ref="pwdInput" :maxlength="6" :isPwd="true" @finish="getPwd"></validCode>
				</view>

				<view class="flex p-xs margin-sm">
					<button class="flex-sub bg-red cu-btn lg" @tap="cancelAction()">取消</button>
					<button class="flex-twice bg-green margin-left-lg cu-btn lg" @tap="paymentAction()">确认</button>
				</view>

			</view>
		</uni-popup>
		<!--  popup  end -->

	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	import tkiQrcode from "../../../components/tki-qrcode/tki-qrcode.vue"
	import tkiBarcode from "../../../components/tki-barcode/tki-barcode.vue"
	import otp from '../../../common/otp.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import validCode from '@/components/p-validCode/validCode.vue'

	import {
		mapMutations,
		mapGetters
	} from 'vuex';

	var _this;


	export default {
		components: {
			uniPopup,
			validCode,
			tkiQrcode,
			tkiBarcode,
		},

		data() {
			return {
				showPwdModal: false,
				pwd: "",

				bankList: [],

				ifShow: true,
				val: '000000000000000000', // 要生成的二维码值
				size: 350, // 二维码大小
				unit: 'upx', // 单位
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '/static/gold.png', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64


				opations: {
					// format: "CODE128",//选择要使用的条形码类型 微信支持的条码类型有 code128\code39\ena13\ean8\upc\itf14\
					width: 5, //设置条之间的宽度
					height: 180, //高度
					displayValue: false, //是否在条形码下方显示文字
					textAlign: "left", //设置文本的水平对齐方式
					textPosition: "bottom", //设置文本的垂直位置
					textMargin: 0, //设置条形码和文本之间的间距
					// fontSize: 24,//设置文本的大小
					// fontColor: "#0000ef",//设置文本的颜色
					// lineColor: "#0000ef",//设置条形码的颜色
					background: "#FFFFFF", //设置条形码的背景色
					margin: 0, //设置条形码周围的空白边距
					// marginTop: 10,//设置条形码周围的上边距
					// marginBottom: 20,//设置条形码周围的下边距
					// marginLeft: 30,//设置条形码周围的左边距
					// marginRight: 40,//设置条形码周围的右边距
				},

				modalName: null,
				current: 0,

				intervalCodeID: 0,
				intervalPayID: 0,
				
				transferInfo: {},
			}
		},

		computed: {
			...mapGetters(["token", "userInfo", "accountList"]),
		},
		
		onLoad: function() {
			_this = this;
			
			this.getAccountList();
			this.startRefreshPayStatusTask();
		},

		onUnload() {
			this.stopRefreshCodeTask();
			this.stopRefreshPayStatusTask();
		},

		methods: {
			...mapMutations(['updateToken', "setUserInfo", "saveAccountList"]),

			getPwd(val) {
				this.pwd = val
			},
			
			change(e) {
			},

			cancelAction() {
				this.showPwdModal = false
				this.cancelTransferAction();
			},

			okAction() {
				this.pwd = this.$refs.pwdInput.val;
				console.log(this.pwd);

				if (this.pwd.length != 6) {
					this.$api.msg("请输入6位交易密码")
				} else {
					this.transferStaticPay();
				}
			},

			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},

			hideModal(e) {
				this.modalName = null
			},
			
			getDefaultAccount() {
				this.bankList.forEach((item, index, arr) => {
					if (item.isDefaultAccount == 'true') {
						this.current = index;
					}
				})
			},
			

			RadioChange(evt) {
				for (let i = 0; i < this.bankList.length; i++) {
					if (this.bankList[i].id == evt.target.value) {
						this.current = i;
						break;
					}
				}

				_this.refreshQRCode();
			},

			creatQrcode() {
				this.$refs.qrcode._makeCode()
			},

			createBarcode() {
				this.$refs.code128._makeCode()
			},

			clearQrcode() {
				this.$refs.qrcode._clearCode()
				this.val = ''
			},

			qrR(res) {
				this.src = res
			},

			code128(v) {},

			showCode() {
				this.$api.alert(this.val)
			},

			getAccountList: function(e) {
				uni.request({
					url: this.BASE_URL + '/account/query/byType',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						accountType: ''
					},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {

							_this.bankList = res.data.data;
							if (_this.bankList.length > 0) {
								
								_this.saveAccountList(res.data.data);
								
								console.log("----"+JSON.stringify(_this.accountList))

								_this.refreshQRCode();

								_this.startRefreshCodeTask()

							} else {
								uni.showModal({
									title: "提示",
									content: "请选择添加银行卡",
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.switchTab({
												url: '/pages/tabBar/home/home'
											});
										}
									}
								})
							}

							_this.$token.updateToken(res.header.token);

						} else {
							_this.$api.alert(res.data.msg)
						}
					},
					fail: (res) => {
						console.log("===================================")
						console.log("++"+JSON.stringify(this.accountList));
						this.bankList = this.accountList;
						
						this.getDefaultAccount();
						this.refreshQRCode();
						this.startRefreshCodeTask();
						
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},

			refreshPayStatus: function() {
				uni.request({
					url: this.BASE_URL + '/transfer/scan/pay/status',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						code: _this.val
					},
					success: (res) => {
						// console.log(JSON.stringify(res));

						if (res.data.code == "B0000") {
							_this.transferInfo = res.data.data[0];
							if (_this.transferInfo.status == '2') {
								if (_this.showPwdModal == false) {
									_this.$refs.pwdInput.clear();
									_this.showPwdModal = true;
								}
							} else if (_this.transferInfo.status == '6') {
								
								uni.navigateTo({
									url:'/pages/home/transferSuccess/transferSuccess'
								})
							}

						}
						_this.$token.updateToken(res.header.token);

					},
					fail: (res) => {},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			// 告知服务器正在输入密码
			inputPwdAction() {
				uni.request({
					url: this.BASE_URL + '/transfer/scan/pay/status/input',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						code: _this.val,
						// 1，正在输入密码；2，交易取消
						codeType: "1"
					},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							
							_this.$token.updateToken(res.header.token);
							
							_this.stopRefreshCodeTask();
							
							uni.navigateTo({
								url:'/pages/home/transferSuccess/transferSuccess'
							})
							
						} else {
							_this.$api.alert(res.data.msg)
						}
					},
					fail: (res) => {
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			cancelTransferAction() {
				uni.request({
					url: this.BASE_URL + '/transfer/scan/pay/status/input',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						code: _this.val,
						// 1，正在输入密码；2，交易取消
						codeType: "2"
					},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$api.msg("交易已取消")
						} else {
							_this.$api.alert(res.data.msg)
						}
					},
					fail: (res) => {
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			
			paymentAction: function() {
				uni.request({
					url: this.BASE_URL + '/transfer/scan/pay/authorize',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						code: _this.val,
						transferPassword: _this.pwd
					},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							
							_this.$token.updateToken(res.header.token);
							
							uni.navigateTo({
								url:'/pages/home/transferSuccess/transferSuccess'
							})
			
						} else {
							_this.$api.alert(res.data.msg)
						}
					},
					fail: (res) => {
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},

			startRefreshCodeTask() {
				this.intervalCodeID = setInterval(this.refreshQRCode, 30 * 1000);
			},

			stopRefreshCodeTask() {
				console.log("停止定时刷新。。。")
				clearInterval(this.intervalCodeID);
			},

			startRefreshPayStatusTask() {
				this.intervalPayID = setInterval(this.refreshPayStatus, 2 * 1000);
			},

			stopRefreshPayStatusTask() {
				console.log("停止定时刷新。。。")
				clearInterval(this.intervalPayID);
			},

			refreshQRCode() {
				this.val = this.genOTP();
			},

			genOTP() {
				console.log("default userId: "+this.userInfo.id);
				
				var newToken = this.token + this.bankList[this.current].id;
				var result = otp.makeCode(newToken, this.userInfo.id);
				console.log("result:" + result)
				return result;
			},

		}
	}
</script>

<style>
	.select-payment {
		padding: 10px 0;
	}

	.qrimg {
		margin-top: 30upx;
	}
</style>
