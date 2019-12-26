<template>
	<view class="uni-padding-wrap uni-common-pb padding">
		
		<button type="primary" size="default" class="margin-top" @tap="bankCard2QbTransfer()">钱包充值</button>
		
		<button type="primary" size="default" class="margin-top" @tap="bankCardPay()">银行卡支付处理</button>
		
		<button type="primary" size="default" class="margin-top" @tap="bankCardTransfer()">银行卡到钱包转账处理</button>
		
		<button type="primary" size="default" class="margin-top" @tap="billPay()">花呗账单还款处理</button>
		
		<button type="primary" size="default" class="margin-top" @tap="hbPay()">花呗支付</button>
		
		<button type="primary" size="default" class="margin-top" @tap="hbfqPay()">花呗分期支付</button>
		
		<button type="primary" size="default" class="margin-top" @tap="qb2BankCardTransfer()">钱包提现</button>
		
		<button type="primary" size="default" class="margin-top" @tap="qbPay()">钱包支付处理</button>
		
		<button type="primary" size="default" class="margin-top" @tap="qbTransfer()">钱包到钱包转账处理</button>
		
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
			// 钱包充值
			bankCard2QbTransfer: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/FirstPage/BankCard2QbTransfer',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				        currency: "CNY",
				        transferAmount: "100",
				        customerNbr: "0001",
				        payerName: "付款人",
				        payerAccountNbr: "213984210384",
				        payerAccountType: "30",
				        transferPassword: "123456",
				        payerSubjectType: "2000",
				        transferType: "503",
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
			
			// 银行卡支付处理
			bankCardPay: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/FirstPage/BankCardPay',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				        orderNbr: "10001",
				        merchantNbr: "10000001",
				        merchantName: "北京中恒创业信息技术有限公司",
				        currency: "CNY",
				        transferAmount: "100",
				        customerNbr: "2009081",
				        payerName: "李好",
				        payerAccountNbr: "61168978977",
				        payerAccountType: "30",
				        transferPassword: "123456",
				        productName: "11111",
				        transferDesc: "111111",
				        payeeSubjectType: "3000",
				        payerSubjectType: "2000",
				        transferType: "311",
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
			
			// 银行卡到钱包转账处理
			bankCardTransfer: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/FirstPage/BankCardTransfer',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				        currency: "CNY",
				        transferAmount: "100",
				        payeeNbr: "234214",
				        payeName: "李四",
				        payeeAccountNbr: "4365346324",
				        payeeAccountType: "10",
				        customerNbr: "324245324",
				        payerName: "王诚",
				        payerAccountNbr: "33443222",
				        payerAccountType: "30",
				        transferPassword: "123456",
				        transferDesc: "1111111111111111",
				        payeeSubjectType: "2000",
				        payerSubjectType: "2000",
				        transferType: "502",
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
			
			// 花呗账单还款处理
			billPay: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/FirstPage/BillPay',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				        billNbr: "2214321",
				        loanNbr: "11421414",
				        repaymentPlanNbr: "1234214124",
				        normalRepaymentAmount: "1000",
				        repaymentAmount: "1000",
				        customerNbr: "10012222",
				        payerName: "张哲",
				        payerAccountNbr: "2341243124",
				        payerAccountType: "10",
				        transferPassword: "123456",
				        transferType: "200",
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
			
			// 花呗支付
			hbPay: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/FirstPage/HbPay',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						orderNbr: "23412431234",
						merchantNbr: "23412431234",
						merchantName: "23412431234",
						currency: "CNY",
						transferAmount: "23412431234",
						customerNbr: "23412431234",
						payerName: "23412431234",
						payerAccountNbr: "23412431234",
						payerAccountType: "205",
						sumRepaymentNumber: "1",
						transferPassword: "123456",
						productName: "23412431234",
						transferDesc: "23412431234",
						payeeSubjectType: "3000",
						payerSubjectType: "2000",
						transferType: "205",
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
			
			// 花呗分期支付
			hbfqPay: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/FirstPage/HbfqPay',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						orderNbr: "3242143214",
						merchantNbr: "213412341324",
						merchantName: '中恒创业',
						currency: 'CNY',
						transferAmount: '1000',
						customerNbr: '2143214',
						payerName: '2134214',
						payerAccountNbr: '43123412',
						payerAccountType: '206',
						sumRepaymentNumber: '2',
						transferPassword: '123456',
						productName: '231414',
						transferDesc: '3214321',
						payeeSubjectType: '3000',
						payerSubjectType: '2000',
						transferType: '206',
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
			
			
			// 钱包提现
			qb2BankCardTransfer: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/FirstPage/Qb2BankCardTransfer',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						payeeAccountNbr: "10",
						payeeAccountType: "30",
						currency: "CNY",
						transferAmount: "1000",
						customerNbr: "10",
						payerName: "张三",
						payerAccountNbr: "432523453223421",
						payerAccountType: "10",
						transferPassword: "123456",
						payerSubjectType: "2000",
						transferType: "504",
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
			
			// 钱包支付处理
			qbPay: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/FirstPage/QbPay',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						orderNbr: "101911219065795741",
						merchantNbr: "1",
						merchantName: "1",
						currency: "CNY",
						transferAmount: "1000",
						customerNbr: "13245325432",
						payerName: "王刚",
						payerAccountNbr: "134532453254235",
						payerAccountType: "10",
						transferPassword: "123456",
						productName: "产品名称",
						transferDesc: "备注",
						payeeSubjectType: "3000",
						payerSubjectType: "2000",
						transferType: "301",
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
			
			// 钱包到钱包转账处理
			qbTransfer: function() {
				this.$api.loading();
				
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/FirstPage/QbTransfer',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						currency: "CNY",
						transferAmount: "1000",
						payeeNbr: "65532666666",
						payeName: "小四",
						payeeAccountNbr: "1324214324433",
						payeeAccountType: "10",
						customerNbr: "3453223434532532",
						payerName: "钱多",
						payerAccountNbr: "243524532",
						payerAccountType: "10",
						transferPassword: "123456",
						transferDesc: "1000",
						payeeSubjectType: "2000",
						payerSubjectType: "2000",
						transferType: "501"
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
