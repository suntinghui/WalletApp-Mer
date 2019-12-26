<template>
	<view>
		<view class="cu-list menu border">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">请选择银行卡类型</text>
				</view>
			</view>
		</view>
		<form>
			<view class="cu-form-group solid-top">
				<view class="title">银行</view>
				<picker @change="PickerNameChange" :value="bankNameIndex" :range="bankLists" range-key="bankName">
					<view class="picker" style="text-align: left;">
						{{bankNameIndex>-1?bankLists[bankNameIndex].bankName:'请选择银行卡'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">卡类型</view>
				<picker @change="PickerTypeChange" :value="bankTypeIndex" :range="bankType">
					<view class="picker" style="text-align: left;">
						{{bankTypeIndex>-1?bankType[bankTypeIndex]:'请选择银行卡类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="请输入银行预留的手机号" name="input" maxlength="11" type="number" v-model.trim="phoneNum"></input>
				<text class='cuIcon-info text-orange'></text>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg radius" @tap="addAction()">下一步</button>

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
				cardNo:"",
				bankNameIndex: -1,
				bankTypeIndex: 0,
				phoneNum:'',
				
				bankLists: [],
				bankType: ['借记卡'],
			}
		},
		
		onLoad(options) {
			_this = this;
			this.cardNo = options.cardNo;
			
			this.getBankList();
		},
		
		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		
		methods: {
			...mapMutations(['updateToken', 'logout', "setUserInfo"]),
			
			PickerNameChange(e) {
				this.bankNameIndex = e.detail.value
			},
			
			PickerTypeChange(e) {
				this.bankTypeIndex = e.detail.value
			},
			
			// 查询系统支持的银行卡
			getBankList: function(e) {
				this.$api.loading("加载中...")
				
				uni.request({
				    url: this.BASE_URL+'/bank/query/bankList',
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
							_this.$token.updateToken(res.header.token);
							
							_this.bankLists = res.data.data;
							
							if (_this.bankLists.length == 1) {
								_this.bankNameIndex = 0;
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
			
			addAction:function(e) {
				if (this.phoneNum.length == 0) {
					this.$api.msg("请输入手机号");
					return;
				}
				
				this.$api.loading("加载中...")
				
				uni.request({
				    url: this.BASE_URL+'/account/bindBankCard',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						subjectType: '2000',
						bankName: _this.bankLists[_this.bankNameIndex].bankName,
						bankNbr: _this.bankLists[_this.bankNameIndex].bankNbr,
						accountNbr: _this.cardNo,
						mobileNbr:_this.phoneNum,
				    },
				    success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							_this.$api.msg("添加成功")
							uni.navigateBack({
								delta:2
							})
							
						} else {
							_this.$api.alert(res.data.msg+" 卡bin:"+_this.bankLists[_this.bankNameIndex].bankBin)
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
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
