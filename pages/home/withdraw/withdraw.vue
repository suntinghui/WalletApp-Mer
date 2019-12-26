<template>
	<view>
		<view class="bg-white padding">
			<!--  选择充值方式 -->
			<view class="text-black">提现到银行卡</view>
			<view class="cu-list margin menu select-payment solid-bottom">
				<view class="cu-item arrow border-top">
					<button class="cu-btn content" @tap="showModal" data-target="bottomModal">
						<image src="../../../static/icon-huabei.png" class="png" mode="aspectFit"></image>
						<view class="text-grey text-left">
							<view class="font-bold">{{bankList[current].accountNbrFormat}}</view>
						</view>
					</button>
				</view>
			</view>
			
			<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action text-grey" @tap="hideModal">取消</view>
						<view class="action text-green" @tap="hideModal">确定</view>
					</view>
					
					<view class="uni-list">
						<radio-group class="block" v-for="(item, index) in bankList" @change="RadioChange">
							<view class="cu-form-group">
								<view class="padding-sm solid-bottom">
									<view class="title">{{item.accountNbrFormat}}</view>
									<view class="desc text-sm">申请提交成功后，2小时内到账</view>
								</view>
								<radio :checked="index === current" :value="item.id"></radio>
							</view>
						</radio-group>
					</view>
				</view>
			</view>
			<!--  选择支付方式 end -->
			
			<view class="flex">
				<view class="flex-sub padding-tb-sm">提现金额</view>
			</view>
			
			<view class="cu-form-group solid-bottom">
				<view class="title text-bold text-right" style="font-size: 50rpx;">￥</view>
				<input v-model="rechargeAmount" type="digit" class="text-bold" style="font-size: 55rpx; height: 60px; line-height: 60px;"></input>
			</view>

			
		</view>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="doRecharge(e)">提现</button>
		</view>
		
		<!--  popup -->
		<uni-popup class="radius" :show="showPwdModal" :mask-click="false" @change="change">
			<view class="pay-modal">
				<view class="padding-bottom solid-bottom text-center">请输入支付密码</view>
				<view class="padding-xs flex justify-between">
					<view class="text-gray">提现到：</view>
					<view class="text-black">{{bankList[current].bankName}} [{{bankList[current].accountNbr}}]</view>
				</view>
				<view class="padding-xs flex justify-between">
					<view class="text-gray">金额：</view>
					<view class="text-black text-price text-bold text-xxl">{{rechargeAmount}}</view>
				</view>
				
				<view class="padding-tb-xs pay-modal-pwd">
					<validCode ref="pwdInput" :maxlength="6" :isPwd="true" @finish="getPwd"></validCode>
				</view>
				
				<view class="flex p-xs margin-sm">
					<button class="flex-sub bg-red cu-btn lg" @tap="cancelAction()">取消</button>
					<button class="flex-twice bg-green margin-left-lg cu-btn lg" @tap="chargeAction()">确认提现</button>
				</view>
				
			</view>
		</uni-popup>
		<!--  popup  end -->
		
	</view>
</template>

<script>
	var _this;

	import permision from "@/common/permission.js"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import validCode from '@/components/p-validCode/validCode.vue'

	import {
		mapMutations,
		mapGetters
	} from 'vuex';

	export default {
		components: {
			uniPopup,
			validCode
		},
		
		data() {
			return {
				rechargeAmount: '',
				modalName: null,
				current: 0,
				bankList: [],
				
				showPwdModal: false,
				pwd: "",
			}
		},

		onLoad: function() {
			_this = this;

			this.getAccountList();
		},

		computed: {
			...mapGetters(["token", "userInfo"]),
		},

		methods: {
			...mapMutations(['updateToken', "setUserInfo"]),
			
			change(e) {
			},
			
			getPwd(val) {
				this.pwd = val
			},
			
			cancelAction() {
				this.showPwdModal = false
			},
			
			okAction() {
				this.pwd = this.$refs.pwdInput.val;
				console.log(this.pwd);
				
				if (this.pwd.length != 6) {
					this.$api.msg("请输入6位交易密码")
				} else {
					this.transferStaticPay();
				}
			},

			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},

			RadioChange(evt) {
				for (let i = 0; i < this.bankList.length; i++) {
					if (this.bankList[i].id == evt.target.value) {
						this.current = i;
						break;
					}
				}
				
			},

			getAccountList: function(e) {
				uni.request({
					url: this.BASE_URL + '/account/query/byType',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						accountType: '30'
					},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
			
							_this.bankList = res.data.data;
							
							if (_this.bankList.length > 0) {
								
								
							} else {
								uni.showModal({
									title: "提示",
									content: "请选择添加银行卡",
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											uni.switchTab({
												url: '/pages/tabBar/home/home'
											});
										}
									}
								})
							}
			
			
							_this.$token.updateToken(res.header.token);
			
						} else {
							_this.$api.alert(res.data.msg)
						}
					},
					fail: (res) => {},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},

			chargeAction: function() {
				console.log(_this.bankList[_this.current].accountNbr)
				uni.request({
					url: this.BASE_URL + '/transfer/pay/Qb2BankCard',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						payeeAccountNbr: _this.bankList[_this.current].accountNbr,
						transferAmount: _this.rechargeAmount,
						transferPassword: _this.pwd,
						transferDesc: ""
					},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							
							_this.$token.updateToken(res.header.token);
							
							uni.navigateTo({
								url:'/pages/home/transferSuccess/transferSuccess'
							})

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

			gotoAddBank() {
				uni.showModal({
					title: '提示',
					content: "请您先添加银行卡",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '../addBankCard-01/addBankCard-01'
							})
						}
					}
				})
			},
			
			doRecharge() {
				if(this.rechargeAmount == '' || Number(this.rechargeAmount) == 0) {
					this.$api.msg("请输入提现金额")
				} else {
					this.$refs.pwdInput.clear();
					this.showPwdModal = true;
				}
			},
			
			
		}
	}
</script>

<style>

</style>
