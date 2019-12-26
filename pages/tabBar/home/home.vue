<template>
	<view>
		<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="rgba(255,255, 255, 0.5)" indicator-active-color="rgba(255,255, 255, 1)" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item>
				<image src="../../../static/slider-01.png" class="slider-item" mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../../static/slider-02.jpg" class="slider-item" mode="widthFix"></image>
			</swiper-item>
			<swiper-item>
				<image src="../../../static/slider-03.jpg" class="slider-item" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="cu-list grid col-2 no-border text-grid card-menu shadow shadow-lg" style="margin-top: 20px; position: relative; z-index: 9999;">
			<view class="cu-item" @click="scan">
				<view class="iconfont cu-grid-icon">&#xe629;</view>
				<text class="text-grid">扫一扫</text>
			</view>
			<view class="cu-item" style="display: none;">
				<navigator url="../../home/payment/payment" hover-class="none">
					<view class="iconfont cu-grid-icon">&#xe639;</view>
					<text class="text-grid">付款</text>
				</navigator>
			</view>
			<view class="cu-item">
				<navigator url="../../home/receipt/receipt"  hover-class="none">
					<view class="iconfont cu-grid-icon">&#xe628;</view>
					<text class="text-grid">收款</text>
				</navigator>
			</view>
		</view>

		<view class="cu-list grid col-2 no-border card-menu shadow shadow-lg" style="display: none;">
			<view class="cu-item solid-right">
				<navigator url="../../home/balance/balance" hover-class="none">
					<view class="">余额</view>
					<view class="text-sm text-gray" style="height: 40rpx;"></view>
					<view class="text-danger font-bold text-price">{{balanceAmount}}</view>
				</navigator>
			</view>
			<view class="cu-item" @tap="showHuabei" >
				<view>
					<view class="">钱包花呗</view>
					
					<view v-if="hasOpenHuabeiAccount">
						<view class="text-sm text-gray" style="height: 40rpx;">通用额度</view>
						<view class="text-danger font-bold text-price">{{huabeiAmount}}</view>
					</view>
					
					<view v-if="!hasOpenHuabeiAccount" style="margin-top: 10px;">
						<button class="cu-btn round line-blue shadow" @tap="openHuaBeiAccount()">立即开通</button>
					</view>
					
				</view>
			</view>
		</view>

		<view class="cu-list menu sm-border card-menu shadow shadow-lg">
			<view class="cu-item arrow">
				<navigator url="../../home/billLists/billLists" hover-class="none" class="content">
					<image src="/static/icon-zhangdan.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">账单</text>
				</navigator>
			</view>
			<view class="cu-item arrow" style="display: none;">
				<navigator url="../mer-home/mer-home" hover-class="none" class="content">
					<image src="/static/icon-shangjia.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">商家服务</text>
				</navigator>
			</view>
			<navigator url="../../home/bankCard/bankCard" hover-class="none" class="cu-item arrow">
				<view class="content">
					<image src="/static/icon-yinhangka.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">银行卡</text>
				</view>
			</navigator>
		</view>

	</view>
</template>
<script>
	var _this;
	
	import permision from "@/common/permission.js"
	
	import {
		mapMutations, mapGetters
	} from 'vuex';
	
	export default {
		data() {
			return {
				balanceAmount: 0.00,
				huabeiAmount: 0.00,
				hasOpenHuabeiAccount: true,
				
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			};
		},
		
		onLoad:function(){
			_this = this;
		},
		
		computed: {
			...mapGetters(["token", "userInfo"]),
		},

		methods: {
			...mapMutations(['updateToken', "setUserInfo"]),
			
			async scan() {
				// #ifdef APP-PLUS
				let status = await this.checkPermission();
				if (status !== 1) {
				    return;
				}
				
				// #endif
				uni.scanCode({
					success: (res) => {
						console.log(JSON.stringify(res))
						
						this.result = res.result
						
						this.scanCodeDoneAction(this.result)
					},
					fail: (err) => {
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '钱包需要使用您的相机，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				});
			},
			// #ifdef APP-PLUS
			async checkPermission(code) {
				let status = permision.isIOS ? await permision.requestIOS('camera') :
					await permision.requestAndroid('android.permission.CAMERA');
			
				if (status === null || status === 1) {
					status = 1;
				} else {
					uni.showModal({
						content: "需要相机权限",
						confirmText: "设置",
						success: function(res) {
							if (res.confirm) {
								permision.gotoAppSetting();
							}
						}
					})
				}
				return status;
			},
			// #endif
			
			scanCodeDoneAction(code) {
				this.$api.loading("加载中...")
				
				uni.request({
					url: this.BASE_URL + '/QRcode/scan/code',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						code: code,
					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));
			
						if (res.data.code == "B0000") {
							var codeType = res.data.data.codeType;
							if (codeType == '0') { // 静态收款码
								uni.navigateTo({
									url:'/pages/home/payaction/paystatic?data='+JSON.stringify(res.data.data)+'&scancode='+ code
								})
								
							} else if (codeType == '3') { // 动态收款码
								uni.navigateTo({
									url:'/pages/home/payaction/paydynamic?data='+JSON.stringify(res.data.data)+'&scancode='+ code
								})
							} else {
								_this.$api.alert("暂不支持该交易类型")
							}
							
						} else {
							_this.$api.alert(res.data.msg);
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
			
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots;
			},
			
			changeAutoplay(e) {
				this.autoplay = !this.autoplay;
			},
			intervalChange(e) {
				this.interval = e.target.value;
			},
			durationChange(e) {
				this.duration = e.target.value;
			},
			
			showHuabei: function(e) {
				if (this.hasOpenHuabeiAccount) {
					uni.switchTab({
						url: '../huabei/huabei'
					})
				}
				
			},
			
			onShow:function(){
				this.queryBalance();
				this.queryHuabeiAmount();
				this.getUserInfo();
			},
			
			
			// 查询余额
			queryBalance: function(e) {
				uni.request({
				    url: this.BASE_URL+'/account/query/byType',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						accountType: '10'
				    },
				    success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.balanceAmount = res.data.data[0].balanceAmount
							_this.$token.updateToken(res.header.token);
							
						} else {
							console.log(res.data.msg)
						}
				    },
					fail: (res) => {
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			// 查询花呗额度
			queryHuabeiAmount: function(e) {
				uni.request({
				    url: this.BASE_URL+'/account/query/byType',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						accountType: '205'
				    },
				    success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							// 未开通花呗
							if (res.data.errorCode == "B100205") {
								_this.hasOpenHuabeiAccount = false
							} else {
								_this.hasOpenHuabeiAccount = true
								_this.huabeiAmount = res.data.data[0].creditAmount
							}
							
						} else {
							console.log(res.data.msg)
						}
				    },
					fail: (res) => {
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			// 开通花呗账户
			openHuaBeiAccount:function() {
				this.$api.loading("正在加载")
				
				uni.request({
				    url: this.BASE_URL+'/login/open/creditAccount',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						hbOpen: "1",
						hbfqOpen: "1",
						paymentOpen: "1"
				    },
				    success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$api.msg("开通成功")
							
							_this.queryHuabeiAmount()
							
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
			
			getUserInfo: function(e) {
				uni.request({
				    url: this.BASE_URL+'/login/query/userInfo',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						
				    },
				    success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.setUserInfo(res.data.data);
							
							_this.$token.updateToken(res.header.token);
							
						} else {
							console.log(res.data.msg)
						}
				    },
					fail: (res) => {
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
		}
	};
</script>

<style lang="scss">
	.cu-grid-icon {
		font-size: 70upx;
	}

	.slider-item {
		width: 100%;
	}

	.tui-list-cell-name {
		padding-left: 5px;
	}

	.text-grid {
		color: $uni-color-primary !important;
	}
</style>
