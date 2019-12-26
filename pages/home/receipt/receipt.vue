<!-- 收款 -->
<template>
	<view>
		<view class="bg-white text-center padding ">
			<view class="text-sm margin-tb">
				扫二维码直接向我付钱，安全又便捷
			</view>

			<view class="text-center" v-if="transferAmount != 0">
				<text class="text-price text-black text-bold text-sl">{{transferAmount}}</text>
			</view>

			<tki-qrcode class="qrimg" v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :icon="icon"
			 :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" loadingText="正在加载" @result="qrR" />

			<view class="flex margin-top-lg  text-blue">
				<navigator url="../setAmount/setAmount" hover-class="none" class="flex-sub solid-right">
					设置金额
				</navigator>
				<view class="flex-sub" @tap="saveQrCode()">
					保存图片
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border margin-tb">
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="../collectionRecord/collectionRecord">
					<text class="cuIcon-text text-grey"></text>
					<text class="text-grey">收款纪录</text>
				</navigator>
			</view>
		</view>
		
		<!-- 支付状态 -->
		<view class="padding bg-white uni-flex uni-row solid-bottom" v-for="(item, index) in payerList" v-key="index">
			<image class="" src="../../../static/man.png" style="width: 25px; height: 25px;"></image>
			<view class="text-black margin-left">{{item.payerName}}</view>
			<view class="text" style="-webkit-flex: 1;flex: 1;"></view>
			<view class="text-grey">{{item.msg}}</view>
		</view>
		
		
	</view>
</template>

<script>
	import tkiQrcode from "../../../components/tki-qrcode/tki-qrcode.vue"
	import {
		mapMutations,
		mapGetters
	} from 'vuex';

	var _this;

	export default {
		data() {
			return {
				transferAmount: 0,
				transferTip:'',
				intervalID:0,
				payerList:[],

				ifShow: true,
				val: '', // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '/static/gold.png', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: "", // 二维码生成后的图片地址或base64
			}
		},

		components: {
			tkiQrcode,
		},

		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		
		watch:{
			transferAmount (val) {
				this.queryStaticCode();
			}
		},
		
		onLoad() {
			_this = this;
			
			this.queryStaticCode();
			
			this.startRefreshPayer()
		},

		onUnload() {
			this.stopRefreshPayer();
		},

		methods: {
			...mapMutations(['updateToken', "setUserInfo"]),

			queryStaticCode: function() {
				this.$api.loading("加载中...")

				uni.request({
					url: this.BASE_URL + '/QRcode/make/static/payeeCode',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						codeType: '0',
						transferAmount: _this.transferAmount==0?"":_this.transferAmount
					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));

						if (res.data.code == "B0000") {
							_this.val = res.data.data;

						} else {
							uni.showModal({
								title: "提示",
								showCancel: false,
								content: res.data.msg,
								success: function(res) {
									if (res.confirm) {
										uni.switchTab({
											url: '../../tabBar/home/home'
										});
									}
								}
							})
						}

					},
					fail: (res) => {
						console.log("fail:" + res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},

			qrR(res) {
				this.src=res;
			},
			
			saveQrCode() {
				this.$refs.qrcode._saveCode()
			},
			
			startRefreshPayer:function() {
				this.intervalID = setInterval(this.queryPayerList, 3000);
			},
			
			stopRefreshPayer:function() {
				clearInterval(this.intervalID)
			},
			
			// 查询他人付款状态, 每隔2秒钟执行一次
			queryPayerList: function() {
				uni.request({
					url: this.BASE_URL + '/transfer/scan/pay/status',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						code: _this.val,
					},
					success: (res) => {
			
						if (res.data.code == "B0000") {
							_this.payerList = res.data.data;
						} 
			
					},
					fail: (res) => {
						console.log("fail:" + res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			

		}
	}
</script>

<style>
	.qrimg {
		margin-top: 30upx;
	}
</style>
