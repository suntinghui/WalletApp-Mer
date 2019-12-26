<template>
	<view>
		<view class="bg-white padding">
			<view class="bg-white padding-lr">
				<view class="padding-xs flex align-center">
					<view class="flex-sub text-center padding-top">
						<image style="width: 40px; height: 40px;" src="../../../static/balance.png"></image>
						<view class="padding text-xm">我的零钱</view>
						
						<view class="padding-tb">
							<text class="text-price text-black text-bold text-sl"> {{balanceAmount}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red lg" @tap="doWithdraw">提现</button>
			<button class="cu-btn bg-green margin-tb lg" @tap="doRecharge">充值</button>
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
			}
		},
		
		onLoad:function(){
			_this = this;
		},
		
		onShow:function(){
			this.queryBalance();
		},
		
		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		
		methods: {
			...mapMutations(['updateToken', "setUserInfo"]),
			
			doRecharge: function(e) {
				uni.navigateTo({
					url: "../recharge/recharge"
				})
			},
			
			doWithdraw: function(e) {
				if (this.balanceAmount == 0) {
					this.$api.msg("没有可提现的金额")
				} else {
					uni.navigateTo({
						url: "../withdraw/withdraw"
					})
				}
			},
			
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
			
		}
	}
</script>

<style>

</style>
