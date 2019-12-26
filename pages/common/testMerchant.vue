<template>
	<view class="uni-padding-wrap uni-common-pb padding">

		<button type="primary" size="default" class="margin-top" @tap="merchantRegist()">商户自助注册</button>

		<button type="primary" size="default" class="margin-top" @tap="merchantLogin()">商户登录</button>

		<button type="primary" size="default" class="margin-top" @tap="employeeRegist()">商户员工注册</button>

		<button type="primary" size="default" class="margin-top" @tap="queryMerchantInfo()">商户信息查询</button>

		<button type="primary" size="default" class="margin-top" @tap="modifyMerchantInfo()">商户信息修改</button>

		<button type="primary" size="default" class="margin-top" @tap="openCreditAccount()">开通信用收款</button>

		<button type="primary" size="default" class="margin-top" @tap="openNk()">开通/关闭分期费率承担</button>

	</view>
</template>

<script>
	var _this;

	import {
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {

			}
		},

		mounted() {
			_this = this;
		},

		computed: {
			...mapGetters(["token", "userInfo"]),
		},

		methods: {
			merchantRegist: function() {
				this.$api.loading();

				console.log(_this.token)
				uni.request({
					url: this.BASE_URL + '/user/merchant/regist',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						bussinessLicenseCode: "Y394205320984", // 营业执照号码
						bussinessLicenseName: "北京中恒创业信息技术有限公司", // 营业执照名称
						licenseOpenDatetime: "2011-03-23", // 营业执照登记日
						merchantName: "北京中恒创业信息技术有限公司", // 商户名称
						nickName: "中恒创业", // 商户简称
						licenseExpiredDate: "2022-01-18", // 执照失效日期
						bussinessScope: "软件开发", // 经营范围
						industryLabel: "2A", // 所属行业
						businessContacts: "张三", // 联系人
						businessContactsMobile: "18593849389", // 联系人电话
						mobileNbr: "13783473829", // 手机号
						provence: "北京", // 省
						city: "北京", // 市
						address: "北京市东城区新中大厦", // 详细地址
						addressDesc: "无", // 地址说明
						callNbr: "4009383993", // 400电话
						email: "aqiiuiwe@163.com", // 邮箱
						maxBackDays:"15", // 最大退货周期（不可调整）
						settlementDate:"M1", // 结算日期（不可调整）
						customerWorkNbr: "001", // 用户工号
						loginPassword: "123456", // 登录密码
					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);

							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {

									}
								}
							});

						} else {
							_this.$api.alert(res.data.errorMsg);
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

			merchantLogin: function() {
				this.$api.loading();

				console.log(_this.token)
				uni.request({
					url: this.BASE_URL + '/user/merchant/login',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						bussinessLicenseCode: "Y394205320984",
						bussinessLicenseName: "北京中恒创业信息技术有限公司",
						customerWorkNbr: "001",
						loginPassword: "123456",
						fingerPassword: "",
						handPassword: "",
					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);

							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {

									}
								}
							});

						} else {
							_this.$api.alert(res.data.errorMsg);
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
 
			employeeRegist: function() {
				this.$api.loading();

				console.log(_this.token)
				uni.request({
					url: this.BASE_URL + '/merchant/employee/regist',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						customerWorkNbr: "201910001",
						customerName: "张柔",
						loginPassword: "123456",
					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);

							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {

									}
								}
							});

						} else {
							_this.$api.alert(res.data.errorMsg);
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
 
			queryMerchantInfo: function() {
				this.$api.loading();

				console.log(_this.token)
				uni.request({
					url: this.BASE_URL + '/merchant/query/merchantInfo',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);

							uni.showModal({
								title: '提示',
								content: res.data.data.merchantName,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {

									}
								}
							});

						} else {
							_this.$api.alert(res.data.errorMsg);
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

			modifyMerchantInfo: function() {
				this.$api.loading();

				console.log(_this.token)
				uni.request({
					url: this.BASE_URL + '/merchant/modify/merchantInfo',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						licenseExpiredDate: "2022-01-18", // 执照失效日期
						bussinessScope: "软件开发", // 经营范围
						industryLabel: "2A", // 所属行业
						businessContacts: "张三", // 联系人
						businessContactsMobile: "18593849389", // 联系人电话
						mobileNbr: "13783473829", // 手机号
						provence: "北京", // 省
						city: "北京", // 市
						address: "北京市东城区新中大厦", // 详细地址
						addressDesc: "无", // 地址说明
						callNbr: "4009383993", // 400电话
						email: "aqiiuiwe@163.com", // 邮箱
					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);

							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {

									}
								}
							});

						} else {
							_this.$api.alert(res.data.errorMsg);
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

			openCreditAccount: function() {
				this.$api.loading();

				console.log(_this.token)
				uni.request({
					url: this.BASE_URL + '/merchant/open/creditAccount',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						hbOpen: "1",
						hbfqOpen: "1",
					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);

							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {

									}
								}
							});

						} else {
							_this.$api.alert(res.data.errorMsg);
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

			openNk: function() {
				this.$api.loading();

				console.log(_this.token)
				uni.request({
					url: this.BASE_URL + '/merchant/open/nk',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						nkOpen: "1",
						nkMinimumNumber: "6",
						nkMinimumAmount: "10000",
					},
					success: (res) => {
						console.log("===" + JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);

							uni.showModal({
								title: '提示',
								content: res.data.msg,
								showCancel: false,
								success: function(res) {
									if (res.confirm) {

									}
								}
							});

						} else {
							_this.$api.alert(res.data.errorMsg);
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

</style>
