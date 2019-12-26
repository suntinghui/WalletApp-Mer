<template>
	<view class="uni-padding-wrap uni-common-pb">

		<view class="cu-list menu-avatar ">
			<view class="cu-item bg-title">
				<image class="cu-avatar round lg" :src="url + userInfo.userPhoto " @tap="chooseImg">
				</image>
				<view class="content text-white">
					<view class="">
						<view class="text-cut">{{userInfo.customerName}}</view>
					</view>
					<view class=" flex">
						<view class="text-cut">
							{{userInfo.mobileNbr}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @tap="enterChangeMobile">
				<view class="content">
					<image src="/static/icon-genghuan.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">更换手机号</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="enterUpdateLoginPwd">
				<view class="content">
					<image src="/static/icon_loginpwd.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">修改登录密码</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="enterUpdatePayPwd">
				<view class="content">
					<image src="/static/icon_paypwd.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">修改支付密码</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="enterPaysetting">
				<view class="content">
					<image src="/static/icon-zhifushezhi.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">支付设置</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="enterBiopayment">
				<view class="content">
					<image src="/static/icon-shengwuzhifu.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">生物支付</text>
				</view>
			</view>
			<view class="cu-item arrow" @tap="enterFeedback">
				<view class="content">
					<image src="/static/icon-fenqima.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">意见建议</text>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction" @tap="logoutSys">
			<button class="cu-btn bg-red margin-tb-sm lg">退出登录</button>
		</view>

	</view>
</template>
<script>
	var _this;

	import {
		mapMutations,
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				url: this.BASE_URL
			};
		},

		onLoad: function() {
			_this = this;
		},

		onShow: function() {
			this.getUserInfo();
		},

		computed: {
			...mapGetters(["token", "userInfo"]),
		},

		methods: {
			...mapMutations(['updateToken', "setUserInfo", "logout"]),

			enterChangeMobile: function(e) {
				uni.navigateTo({
					url: '../../account/change-mobile1/change-mobile1'
				});
			},
			enterUpdateLoginPwd: function(e) {
				uni.navigateTo({
					url: '../../account/update-loginpwd/update-loginpwd'
				});
			},
			enterUpdatePayPwd: function(e) {
				uni.navigateTo({
					url: '../../account/update-paypwd/update-paypwd'
				});
			},
			enterPaysetting: function(e) {
				uni.navigateTo({
					//url: '../../account/paysetting/paysetting'
					url: '../../common/testTransfer'
				});
			},
			enterBiopayment: function(e) {
				uni.navigateTo({
					url: '../../account/biopayment/biopayment'
				});
			},

			enterFeedback: function(e) {
				uni.navigateTo({
					url: '../../account/feedback/feedback'
				});
			},

			getUserInfo: function(e) {
				uni.request({
					url: this.BASE_URL + '/login/query/userInfo',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.setUserInfo(res.data.data);

							_this.$token.updateToken(res.header.token);

						} else {
							console.log(res.data.msg)
						}
					},
					fail: (res) => {},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},

			logoutSys: function(e) {
				uni.showModal({
					title: "提示",
					content: "确定要退出登录吗?",
					success: function(res) {
						if (res.confirm) {
							_this.logoutAction();

						} else if (res.cancel) {
							// do nothing
						}
					}
				})
			},

			logoutAction: function(e) {
				uni.showLoading({
					title: '加载中'
				});

				uni.request({
					url: this.BASE_URL + '/login/logout',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {

					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));

						this.logout();

						uni.reLaunch({
							url: '../../login/login',
							success() {
								uni.showToast({
									title: "已退出登录",
									icon: 'none',
									position: 'bottom'
								})
							}
						})

					},
					fail: (res) => {
						console.log("fail:" + res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},

			chooseImg() { //选择图片
				uni.chooseImage({
					sourceType: ["camera", "album"],
					sizeType: "compressed",
					count: 1,
					success: (res) => {
						console.log(res.tempFilePaths[0])
						uni.uploadFile({
							url: this.BASE_URL + '/login/modify/upload/userPhoto',
							filePath: res.tempFilePaths[0],
							name: 'photo',
							header: {
								"Content-Type": "multipart/form-data",
								'token': _this.token
							},
							success: (uploadFileRes) => {
								var res = JSON.parse(uploadFileRes.data);
								
								if (res.code == 'B0000') {
									_this.$api.msg("用户头像已上传成功")
									_this.getUserInfo();
								} else {
									_this.$api.alert(res.msg);
								}
							},
							fail: (res) => {
								console.log(res.data)
							},
							complete: (res) => {
								uni.hideLoading();
							}
						});
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	.bg-title {
		background: $uni-color-primary !important
	}
</style>
