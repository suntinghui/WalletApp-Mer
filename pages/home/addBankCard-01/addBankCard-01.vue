<template>
	<view>
		<view class="cu-list menu border">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">请绑定持卡人本人的银行卡</text>
				</view>
			</view>
		</view>
		<form>
			<view class="cu-form-group solid-top">
				<view class="title">持卡人</view>
				<input class="text-grey" name="input" disabled="true" :value="customerName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">卡号</view>
				<input placeholder="请输入卡号" name="input" type="number" v-model.trim="cardNo"></input>
				<text class='cuIcon-camera text-orange'></text>
			</view>
		</form>
		<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg radius" @tap="nextStep()">下一步</button>
		</view>
	</view>
</template>

<script>
	
	var _this;
	
	import permision from "@/common/permission.js"
	import util from '@/common/util.js'
	
	import {
		mapMutations, mapGetters
	} from 'vuex';
	
	export default {
		data() {
			return {
				customerName:"",
				cardNo: ""
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
			
			
			// 实名认证后，查询用户信息，将用户名放在持卡人上，不得修改
			
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
							_this.customerName = res.data.data.customerName;
							
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
			
			
			nextStep() {
				if (this.cardNo.length == 0 ) {
					this.$api.msg("请输入卡号");
					return;
				}
				
				uni.navigateTo({
					url:'../../home/addBankCard-02/addBankCard-02?cardNo='+this.cardNo
				})
			},
			
		}
	}
</script>

<style>
.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
