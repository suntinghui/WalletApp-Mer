<template>
	<view>
		<view class="text-center" v-if="!hasOpenHuabeiAccount">
			<view class="text-sm text-gray" style="margin-top: 60px;" >您尚未开通花呗信用账户</view>
			<button class="cu-btn round line-blue shadow margin-top"  @tap="openHuaBeiAccount()">立即开通</button>
		</view>
		
		<view v-if="hasOpenHuabeiAccount">
			<view class="bg-title text-white text-center padding-lg" >
				<view>
					通用额度可用(元)
				</view>
				<view class="amount text-price">
					{{userInfo.creditAmount}}
				</view>
				<view>
					这月买  下月还  {{userInfo.nextMonthRepaymentBalance}}费用
				</view>
				<view class="m-t-10">
					<button class="cu-btn round bg-white" >查看详情</button>
				</view>
			</view>
			<view class="cu-list grid col-2 no-border card-menu margin-top">
				<view class="cu-item">
					<navigator url="../../huabei/billLists/billLists" hover-class="none">
						<view class="tui-grid-label">我的账单</view>
						<view class="text-sm text-gray margin-top" style="height: 40rpx;">还款日本月{{userInfo.repaymentDate}}号</view>
					</navigator>
				</view>
				<view class="cu-item">
					<view>
						<view class="tui-grid-label">钱包花呗</view>
						<view class="text-danger font-bold text-price margin-top">{{userInfo.creditAmount}}</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu sm-border card-menu">
				<view class="cu-item arrow" @tap="showRepayment">
					<view class="content">
						<image src="/static/icon-lijihuankuan.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">立即还款</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="showStaging">
					<view class="content">
						<image src="/static/icon-zhangdanfenqi.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">账单分期</text>
					</view>
				</view>
				<view class="cu-item arrow" @tap="showPaymentCode" style="display: none;">
					<view class="content">
						<image src="/static/icon-fenqima.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">分期码</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>
<script>
	
	var _this;
	
	import {
		mapMutations, mapGetters
	} from 'vuex';

export default {
	data() {
		return {
			hasOpenHuabeiAccount: true,
			// {"id":52,"accountNbr":"7067","customerNbr":"P20191210133446474fad93d39","customerName":"孙廷会1","subjectType":"个人","accountType":"205",
			// "accountTypeMsg":"花呗支付记账","accountName":"孙廷会1","mobileNbr":"18500972876","accountStatus":"正常","balanceAmountAll":0.00,
			// "balanceAmountToday":0.00,"balanceAmount":0.00,"canuseAmount":0.00,"frozenAmount":0.00,"numberAccount":0.00,"interestAmount":0.00,
			// "creditAmount":5000.00,"usedCreditAmount":0.00,"usedAmount":0.00,"creditBalance":5000.00,"dayLimitTimes":50,"singleLimitAmount":5000.00,
			// "dayLimitAmount":50000.00,"isDefaultAccount":"false","accountOrganName":"","defaultType":"","openDate":"2019-12-16 11:06:52","bankName":"",
			// "bankNbr":"","currency":"CNY","accountNbrFormat":"贷款（剩余¥0.00）"}
			huabeiAccountInfo: {}
		};
	},
	
	onLoad:function(){
		_this = this;
	},
	
	onShow:function(){
		this.getUserInfo();
		this.queryHuabeiAccount();
	},
	
	computed: {
		...mapGetters(["token", "userInfo"]),
	},

	methods: {
		...mapMutations(['updateToken', 'logout', "setUserInfo"]),
		
		showRepayment: function(e) {
			uni.navigateTo({
				url: "../../huabei/repayment/repayment"
			})
		},
		showStaging: function(e) {
			uni.navigateTo({
				url: "../../huabei/staging/staging"
			})
		},
		showDetail: function(e) {
			uni.navigateTo({
				url: "../../huabei/quota/quota"
			})
		},
		showPaymentCode: function(e) {
			uni.navigateTo({
				url: "../../huabei/payment-code/payment-code"
			})
		},
		
		// 查询花呗额度
		queryHuabeiAccount: function(e) {
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
							
							_this.huabeiAccountInfo = res.data.data[0];
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
						
						_this.queryHuabeiAccount()
						
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
.amount{
	font-size: 60upx;
	font-weight: bold;
	padding: 10px 0;
}
.bg-title{
	background: $uni-color-primary;
}
</style>
