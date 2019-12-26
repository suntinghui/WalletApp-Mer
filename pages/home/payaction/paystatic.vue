<template>
	<view>
		<view class="padding bg-white">
			<view class="padding-xs flex justify-between align-center">
				<view class="text-black text-bold">付款给 {{transferInfo.customerName}}</view>
				<view class="cu-avatar lg round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg)"></view>
			</view>
			
			<view class="text-black">金额</view>
			
			<view class="flex margin solid-bottom">
				<view class="text-price text-sl"></view>
				<input type="digit" v-model="amount" :disabled="changeAmount" style="min-height:50px; height: 50px;" class="text-bold text-sl padding-lr-lg" />
			</view>
			
			<!--  选择支付方式 -->
			<view class="text-black">支付方式</view>
			<view class="cu-list margin menu select-payment solid-bottom">
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
			<!--  选择支付方式 end -->
			
			<view class="padding flex flex-direction">
					<button class="cu-btn bg-green margin-tb-sm lg radius" @tap="doPay()">付款</button>
			</view>
			
			
		</view>
		
		<!--  popup -->
		<uni-popup class="radius" :show="showPwdModal" :mask-click="false" @change="change">
			<view class="pay-modal">
				<view class="padding-bottom solid-bottom text-center">请输入支付密码</view>
				<view class="padding-xs flex justify-between">
					<view class="text-gray">付款给：</view>
					<view class="text-black"> {{transferInfo.customerName}}</view>
				</view>
				<view class="padding-xs flex justify-between">
					<view class="text-gray">支付方式：</view>
					<view class="text-black">{{bankList[current].bankName}} [{{bankList[current].accountNbr}}]</view>
				</view>
				<view class="padding-xs flex justify-between">
					<view class="text-gray">金额：</view>
					<view class="text-black text-price text-bold text-xxl">{{amount}}</view>
				</view>
				
				<view class="padding-tb-xs pay-modal-pwd">
					<validCode ref="pwdInput" :maxlength="6" :isPwd="true" @finish="getPwd"></validCode>
				</view>
				
				<view class="flex p-xs margin-sm">
					<button class="flex-sub bg-red cu-btn lg" @tap="cancelAction()">取消</button>
					<button class="flex-twice bg-green margin-left-lg cu-btn lg" @tap="okAction()">确认支付</button>
				</view>
				
			</view>
		</uni-popup>
		<!--  popup  end -->
		
		
	</view>

</template>

<script>
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
			validCode
		},
		
		data() {
			return {
				// 	// {"codeType":"0","spAccountType":["10","30"],"customerNbr":"201912111358253623e514d31","userPhoto":"","customerName":"2","merchantName":"2",
				// "merchantNbr":"201912111358253623e514d31","payerAccountNbr":"","transferAmount":1209,"orderNbr":"","transferDesc":"","transferStatus":"",
				// "hasTransferAmount":true,"creditFree":false,"hbFree":false,"hbfqFree":false,"maxFreeMonth":0,"minFreeAmount":0,
				// "creditInterestRate":0,"hbInterestRate":0.01,"hbfqMinAmount":100,"hbfqInterestRate":{"3":0.01,"6":0.01,"12":0.01,"360":0.005},"signStatus":"true"}
				transferInfo: {},
				amount: "",
				changeAmount: true,
				scancode:"",
				
				bankList: [],
				showPwdModal: false,
				pwd: "",
				modalName: null,
				current: 0,
			}
		},
		
		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		
		onLoad(options) {
			console.log(options.data)
			this.transferInfo = JSON.parse(options.data);
			this.scancode = options.scancode;
			
			if (this.transferInfo.transferAmount != 0) {
				this.amount = this.transferInfo.transferAmount+"";
				this.changeAmount = true;
			} else {
				this.amount = "";
				this.changeAmount = false;
			}
		},
		
		onShow: function() {
			_this = this;
		
			this.getAccountList();
		},

		methods: {
			...mapMutations(['updateToken', "setUserInfo"]),
			
			doPay() {
				if(this.amount == '' || Number(this.amount) == 0) {
					this.$api.msg("请输入付款金额")
				} else {
					this.$refs.pwdInput.clear();
					this.showPwdModal = true;
				}
			},
			
			change(e) {
				console.log(e.show)
			},
			
			getPwd(val) {
				this.pwd = val
			},
			
			cancelAction() {
				this.showPwdModal = false
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
			
			getAccountList: function(e) {
				uni.request({
					url: this.BASE_URL + '/account/query/byType',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						accountType: _this.transferInfo.spAccountType.toString()
					},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
			
							_this.bankList = res.data.data;
							
							if (_this.bankList.length > 0) {
								
								
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
					fail: (res) => {},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			RadioChange(evt) {
				for (let i = 0; i < this.bankList.length; i++) {
					if (this.bankList[i].id == evt.target.value) {
						this.current = i;
						break;
					}
				}
				
			},
			
			// 静态收款处理
			transferStaticPay() {				
				uni.request({
					url: this.BASE_URL + '/transfer/scan/code/static/pay',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						code: _this.scancode,
						payerAccountNbr: _this.bankList[_this.current].accountNbr,
						transferAmount:_this.amount,
						transferPassword:_this.pwd
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
					fail: (res) => {},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
		},

	}
</script>

<style>
	/* 提示窗口 */
	
	.pay-modal {
		width: 550upx;
		background: #fff;
	}
	
	
	.pay-modal-pwd {
		width: 100%;
		margin-top: 15px;
	}

</style>
