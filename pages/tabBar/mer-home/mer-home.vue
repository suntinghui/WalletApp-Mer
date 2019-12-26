<template>
	<view>
		<view class="cu-list grid col-1 no-border card-menu shadow shadow-lg">
			<view class="text-center padding-sm">
				<view class="text-gray">余额</view>
				<view class="text-danger font-bold text-price text-sl">{{merchantInfo.history.balance}}</view>
			</view>
		</view>

		<view class="cu-list grid col-4 no-border card-menu shadow shadow-lg">
			<view class="text-right text-gray  padding-tb-sm solid-bottom">总收入</view>
			<view class="text-price text-black padding-tb-sm solid-bottom text-lg text-bold">{{merchantInfo.history.sumIn}}</view>
			<view class="text-right text-gray  padding-tb-sm solid-bottom">退款</view>
			<view class="text-price text-black  padding-tb-sm solid-bottom text-lg text-bold">{{merchantInfo.history.sumBack}}</view>
			
			<view class="text-right text-gray  padding-tb-sm">钱包</view>
			<view class="text-price text-black  padding-tb-sm text-lg text-bold" @tap="queryBillList('10')">{{merchantInfo.history.amountQb}}</view>
			
			<view class="text-right text-gray  padding-tb-sm">银行卡</view>
			<view class="text-price text-black  padding-tb-sm text-lg text-bold">{{merchantInfo.history.amountCard}}</view>
			
			<view class="text-right text-gray padding-tb-sm">花呗</view>
			<view class="text-price text-black padding-tb-sm text-lg text-bold"  @tap="queryBillList('205')">{{merchantInfo.history.amountHb}}</view>
			
			<view class="text-right text-gray padding-tb-sm">花呗分期</view>
			<view class="text-price text-black padding-tb-sm text-lg text-bold">{{merchantInfo.history.amountHbfq}}</view>
			
		</view>
		
		<view class="cu-list grid col-4 no-border card-menu shadow shadow-lg">
			<view class="text-right text-gray  padding-tb-sm solid-bottom">收入</view>
			<view class="text-price text-black padding-tb-sm solid-bottom text-lg text-bold">{{merchantInfo.today.sumIn}}</view>
			<view class="text-right text-gray  padding-tb-sm solid-bottom">退款</view>
			<view class="text-price text-black  padding-tb-sm solid-bottom text-lg text-bold">{{merchantInfo.today.sumBack}}</view>
			
			<view class="text-right text-gray  padding-tb-sm">钱包</view>
			<view class="text-price text-black  padding-tb-sm text-lg text-bold">{{merchantInfo.today.amountQb}}</view>
			
			<view class="text-right text-gray  padding-tb-sm">银行卡</view>
			<view class="text-price text-black  padding-tb-sm text-lg text-bold">{{merchantInfo.today.amountCard}}</view>
			
			<view class="text-right text-gray padding-tb-sm">花呗</view>
			<view class="text-price text-black padding-tb-sm text-lg text-bold">{{merchantInfo.today.amountHb}}</view>
			
			<view class="text-right text-gray padding-tb-sm">花呗分期</view>
			<view class="text-price text-black padding-tb-sm text-lg text-bold">{{merchantInfo.today.amountHbfq}}</view>
			
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
				merchantInfo: null
			}
		},
		
		onLoad:function(){
			_this = this;
		},
		
		onShow() {
			this.queryInfo();
		},
		
		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		
		methods: {
			...mapMutations(['updateToken', "setUserInfo"]),
			
			queryBillList(type) {
				uni.navigateTo({
					url: '../../home/billLists/billLists?accountType='+type
				})
			},
			
			queryInfo:function() {
				this.$api.loading("正在加载")
				
				uni.request({
				    url: this.BASE_URL+'/merchant/query/merchantAmount',
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
							_this.merchantInfo = res.data.data
							
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
	}
</script>

<style>

</style>
