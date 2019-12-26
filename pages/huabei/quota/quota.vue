<template>
	<view class="cu-list menu sm-border">
		<view class="cu-item arrow">
			<view class="content margin" @click="showDetail">
				<text class="text-black text-bold">通用额度 · 可用</text>
				<view class="text-blue text-bold amount" >{{this.userInfo.creditAmount}}</view>
				<view class="bottomAmount">
					<view class="amountInfo">
						<text class="text-df text-black text-bold">{{this.userInfo.creditAmount}}</text>
						<text class="text-sm text-gray">总额度</text>
					</view>
					
					<view class="vline">
					</view>
					
					<view class="amountInfo">
						<text class="text-df text-black text-bold">{{this.userInfo.usedCreditAmount }}</text>
						<text class="text-sm text-gray">已用额度</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	
	import util from '@/common/util.js'
	import {
		mapMutations, mapGetters
	} from 'vuex';
	
	export default {
		data() {
			return {
				
			}
		},
		
		onLoad:function(){
			_this = this;
		},
		
		onShow:function(){
			this.getUserInfo();
		},
		
		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		
		methods: {
			...mapMutations(['updateToken', 'logout', "setUserInfo"]),
			
			showDetail: function(e) {
				uni.navigateTo({
					url: "../quota-detail/quota-detail"
				})
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
	}
</script>

<style>
	.amount {
		font-size: 60upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}
	
	.bottomAmount {
		display: flex;
		flex-direction: row;
		margin-top: 40upx;
		align-items: center;
	}
	
	.amountInfo {
		display: flex;
		flex-direction: column;
	}
	
	.vline {
		margin-left: 30upx;
		margin-right: 30upx;
		height: 70upx;
		width: 1px;
		background-color: #CCCCCC;
	}

</style>
