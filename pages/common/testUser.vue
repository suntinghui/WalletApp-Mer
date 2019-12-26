<template>
	<view class="uni-padding-wrap uni-common-pb padding">
		
		<button type="primary" size="default" class="margin-top" @tap="openCreditAccount()">开通信用账户</button>
		
		<button type="primary" size="default" class="margin-top" @tap="modifyBillDate()">修改账单日</button>
		
		<button type="primary" size="default" class="margin-top" @tap="modifyPasswdType()">修改密码首选方式</button>
		
		<button type="primary" size="default" class="margin-top" @tap="openFreePasswd()">开通免密支付</button>
		
		<button type="primary" size="default" class="margin-top" @tap="validate()">用户信息校验</button>
		
		<button type="primary" size="default" class="margin-top" @tap="modifyUserInfo()">修改用户信息</button>
		
		<button type="primary" size="default" class="margin-top" @tap="accountQueryByType()">查询账户信息（类型）</button>
		
		<button type="primary" size="default" class="margin-top" @tap="accountQueryByNbr()">查询账户信息（账号）</button>
		
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
			openCreditAccount: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/login/open/creditAccount',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				        hbOpen: "1"
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            
							        } 
							    }
							});
							
						} else {
							_this.$api.alert(res.data.errorMsg);
						}
												
				    },
					fail: (res) => {
						console.log("fail:"+res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			modifyBillDate: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/login/modify/billDate',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				        billDate: "1"
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							uni.showModal({
							    title: '提示',
							    content: '账单日修改成功',
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            
							        } 
							    }
							});
							
						} else {
							_this.$api.alert(res.data.errorMsg);
						}
												
				    },
					fail: (res) => {
						console.log("fail:"+res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			modifyPasswdType: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/login/modify/passwdType',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				        loginPasswordFirst: "11"
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            
							        } 
							    }
							});
							
						} else {
							_this.$api.alert(res.data.errorMsg);
						}
												
				    },
					fail: (res) => {
						console.log("fail:"+res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			openFreePasswd: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/login/open/freePasswd',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				        isNoPwdPay: "1",
						noPwdMaxAmount: "200"
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            
							        } 
							    }
							});
							
						} else {
							_this.$api.alert(res.data.errorMsg);
						}
												
				    },
					fail: (res) => {
						console.log("fail:"+res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			validate: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/login/validate',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            
							        } 
							    }
							});
							
						} else {
							_this.$api.alert(res.data.errorMsg);
						}
												
				    },
					fail: (res) => {
						console.log("fail:"+res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			modifyUserInfo: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/login/modify/userInfo',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						nickName: "原来如此",
						wxNbr: "18jpdjdas93",
						customerEducational: '40'
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            
							        } 
							    }
							});
							
						} else {
							_this.$api.alert(res.data.errorMsg);
						}
												
				    },
					fail: (res) => {
						console.log("fail:"+res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			accountQueryByType: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/account/query/byType',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						accountType: "10",
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            
							        } 
							    }
							});
							
						} else {
							_this.$api.alert(res.data.errorMsg);
						}
												
				    },
					fail: (res) => {
						console.log("fail:"+res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			accountQueryByNbr: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/account/query/byNbr',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						accountNbr: "101911219065795741",
						accountStatus: "1"
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							uni.showModal({
							    title: '提示',
							    content: res.data.msg,
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            
							        } 
							    }
							});
							
						} else {
							_this.$api.alert(res.data.errorMsg);
						}
												
				    },
					fail: (res) => {
						console.log("fail:"+res.data);
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
