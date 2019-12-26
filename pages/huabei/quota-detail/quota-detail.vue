<template>
	<view>
		<view class="bg-white text-center padding">
			<view class="text-sm text-grey">总额度(元)</view>
			<view class="text-sl text-black margin-top">{{ this.userInfo.creditAmount }}</view>
			<view class="flex">
				<view class="flex-sub padding-sm margin-xs radius solid-right">
					<view class="text-df text-black text-bold">{{ this.userInfo.usedCreditAmount }}</view>
					<view class="text-sm text-grey">已用额度</view>
				</view>
				<view class="flex-sub padding-sm margin-xs radius">
					<view class="text-df text-black text-bold">{{ this.userInfo.creditAmount }}</view>
					<view class="text-sm text-grey">可用额度</view>
				</view>
			</view>
			<view class="text-sm text-grey margin-top text-left solid-top padding-top">
				通用额度是不限定使用场景的额度，包括通用基础额度和通用临时额度，支付时若有满足使用条件的其他额度，将优先使用其他额度，在其他额度不足时可叠加通用额度使用。
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>
				使用明细
			</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>百度网盘超级会员 </view>
					<view class="text-gray text-sm">通用额度</view>
					<view class="text-gray text-sm">2019-10-11</view>
				</view>
				<view class="action self-start padding-tb-sm">
					<view class="text-bold">25000</view>
					<view class="text-grey text-sm padding-tb-sm">-25</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>百度网盘超级会员 </view>
					<view class="text-gray text-sm">通用额度</view>
					<view class="text-gray text-sm">2019-10-11</view>
				</view>
				<view class="action self-start padding-tb-sm">
					<view class="text-bold">25000</view>
					<view class="text-grey text-sm padding-tb-sm">-25</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>百度网盘超级会员 </view>
					<view class="text-gray text-sm">通用额度</view>
					<view class="text-gray text-sm">2019-10-11</view>
				</view>
				<view class="action self-start padding-tb-sm">
					<view class="text-bold">25000</view>
					<view class="text-grey text-sm padding-tb-sm">-25</view>
				</view>
			</view>
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>百度网盘超级会员 </view>
					<view class="text-gray text-sm">通用额度</view>
					<view class="text-gray text-sm">2019-10-11</view>
				</view>
				<view class="action self-start padding-tb-sm">
					<view class="text-bold">25000</view>
					<view class="text-grey text-sm padding-tb-sm">-25</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	var _this;

	import util from '@/common/util.js'
	import {
		mapMutations,
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
			};
		},

		onLoad: function() {
			_this = this;
		},

		onShow: function() {
			this.getUserInfo();
			this.getTransferInfoDetail();
		},

		computed: {
			...mapGetters(["token", "userInfo"]),
		},

		methods: {
			...mapMutations(['updateToken', 'logout', "setUserInfo"]),

			getUserInfo: function(e) {
				uni.request({
					url: this.BASE_URL + '/login/query/userInfo',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.setUserInfo(res.data.data);

							_this.$token.updateToken(res.header.token);

						} else {
							console.log(res.data.msg)
						}
					},
					fail: (res) => {},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
			getTransferInfoDetail: function(e) {
				uni.request({
					url: this.BASE_URL + '/FirstPage/query/transferInfo/anyMonth',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token,
					},
					
					data: {
						accountType: '10,205,206',
						queryType: '1',
						transferMonth: util.currentMonth()
					},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
			
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
			
		}
	};
</script>

<style>

</style>
