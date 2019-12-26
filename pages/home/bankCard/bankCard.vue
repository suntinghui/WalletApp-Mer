<template>
	<view>
		<view class="bg-white">
			<view class="cu-card case no-card">
				<view class="cu-item shadow">
					
					<view v-if="bankList.length == 0" class="text-center margin-tb-xl">
						您还未添加银行卡
					</view>
					
					<view class="cu-list menu-avatar" v-for="(item, index) in bankList" v-key="index" >
						
						<navigator :url="'../../home/bankCardDetail/bankCardDetail?data=' + JSON.stringify(item)" hover-class="none" class="cu-item">
							<view class="cu-avatar round" style="background-image:url(/static/bank-icbc.png);"></view>
							<view class="content flex-sub">
								<view class="text-grey">{{item.bankName}}</view>
								<view class="flex justify-between">
									<text class="text-bold text-lg">**** **** **** {{item.accountNbr}}</text>
									<view class="cu-tag round bg-orange text-sm">
										储蓄卡
									</view>
								</view>
							</view>
						</navigator>
						
					</view>
				</view>
			</view>
			
		</view>
		<view class="padding flex flex-direction">
				<navigator class="cu-btn bg-red margin-tb-sm lg radius" url="../../home/addBankCard-01/addBankCard-01">添加银行卡</navigator>
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
				bankList:[]
			}
		},
		
		onLoad:function(){
			_this = this;
		},
		
		onShow:function(){
			this.geBankcardList();
		},
		
		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		
		methods: {
			...mapMutations(['updateToken', "setUserInfo"]),
			
			
			geBankcardList: function(e) {
				this.$api.loading("正在加载...")
				
				uni.request({
				    url: this.BASE_URL+'/account/query/byType',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						accountType:'30'
				    },
				    success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							
							_this.bankList = res.data.data;
							
							if (_this.bankList[0].accountNbr == null) {
								_this.bankList = [];
							}
							
							_this.$token.updateToken(res.header.token);
							
						} else {
							_this.$api.alert(res.data.msg)
						}
				    },
					fail: (res) => {
						console.log(JSON.stringify(res))
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
