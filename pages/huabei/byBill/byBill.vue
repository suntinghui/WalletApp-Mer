<template>
	<view>
		<view class="">
			<scroll-view scroll-x class="bg-theme-nav text-white nav text-center">
				<view class="cu-item" :class="index==TabCur?'text-white':''" v-for="(item,index) in dataLists" :key="index" @tap="tabSelect"
				 :data-id="index">
					{{item}}
				</view>
			</scroll-view>
			<view class="bg-theme tab-content padding">
				<view v-if="TabCur==0">
					<view class="daihuan-box padding shadow shaow-lg bg-white radius">
						<view class="daihuan-title text-bold">本月账单已还清</view>
						<view class="text-grey">好棒！点个赞</view>
						<view class="text-blue margin-top text-center text-detail">
							<text>详情</text>
							<text class="cuIcon-unfold"></text>
						</view>
					</view>
					<view class="margin-top">本月账单明细共16笔</view>
					<view class="cu-list menu margin-top radius shadow bg-white">
						<view class="cu-item">
							<view class="content padding-tb-sm">
								<view class="text-bold">7月29日</view>
							</view>
						</view>
						<navigator url="../myBillDetail/myBillDetail" hover-class="none" class="cu-item">
							<view class="content padding-tb-sm">
								<view class="text-bold">电费</view>
								<view class="text-gray text-sm">日常缴费</view>
							</view>
							<view class="action">
								-100
							</view>
						</navigator>
					</view>
					<view class="cu-list menu margin-top radius shadow bg-white">
						<view class="cu-item">
							<view class="content padding-tb-sm">
								<view class="text-bold">7月29日</view>
							</view>
						</view>
						<navigator url="../myBillDetail/myBillDetail" hover-class="none" class="cu-item">
							<view class="content padding-tb-sm">
								<view class="text-bold">电费</view>
								<view class="text-gray text-sm">日常缴费</view>
							</view>
							<view class="action">
								-100
							</view>
						</navigator>
					</view>

				</view>
				<view v-if="TabCur==1">
					<view class="daihuan-box padding shadow shaow-lg bg-white radius">
						<view>剩余待还（元）</view>
						<view class="daihuan-title text-bold">3.42</view>
						<view class="text-grey">最后还款日9月10日</view>
						<view class="text-blue margin-top text-center text-detail">
							<text>详情</text>
							<text class="cuIcon-unfold"></text>
						</view>
					</view>
					<view class="margin-top">本月账单明细共16笔</view>
					<view class="cu-list menu margin-top radius shadow bg-white">
						<view class="cu-item">
							<view class="content padding-tb-sm">
								<view class="text-bold">7月29日</view>
							</view>
						</view>
						<navigator url="../myBillDetail/myBillDetail" hover-class="none" class="cu-item">
							<view class="content padding-tb-sm">
								<view class="text-bold">条码支付</view>
								<view class="text-gray text-sm">餐饮美食</view>
							</view>
							<view class="action">
								-20.20
							</view>
						</navigator>
					</view>
				</view>
				<view v-if="TabCur==2">
					<view class="daihuan-box padding shadow shaow-lg bg-white radius">
						<view class="daihuan-title text-bold">确认收货后 下月还</view>
						<view class="text-grey">确认收货后才会计入账单</view>
					</view>
					<view class="margin-top">未确认收货订单共2笔，136元</view>
					<view class="cu-list menu margin-top radius shadow bg-white">
						<view class="cu-item">
							<view class="content padding-tb-sm">
								<view class="text-bold">7月29日</view>
							</view>
						</view>
						<navigator url="../myBillDetail/myBillDetail" hover-class="none" class="cu-item">
							<view class="content padding-tb-sm">
								<view class="text-bold">条码支付</view>
								<view class="text-gray text-sm">餐饮美食</view>
							</view>
							<view class="action">
								-20.20
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				dataLists: ['8月应还', '9月应还', '未入账']
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style lang="scss">
	.bg-theme-nav {
		background: $uni-color-primary !important;

		& .text-white {
			border-bottom: 2px solid #fff;
		}
	}

	.bg-theme {
		background: $uni-color-primary !important;
		height: 200rpx;
		& .daihuan-box {
			position: relative;
			height: 300rpx;
			& .daihuan-title {
				font-size: 50rpx;
			}
			& .text-detail{
				width: 88%;
				position: absolute;
				bottom:40rpx;
			}
		}
	}
</style>
