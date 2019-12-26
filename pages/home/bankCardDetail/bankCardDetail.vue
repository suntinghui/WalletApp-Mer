<template>
	<view>
		<view class="cu-list menu-avatar card-menu margin-top">
			<view class="cu-item">
				<view class="cu-avatar round lg" style="background-image:url(/static/bank-icbc.png);"></view>
				<view class="content">
					<view class="text-grey">{{bankInfo.bankName}}</view>
					<text class="text-bold text-lg">**** **** **** {{bankInfo.accountNbr}}</text>
					
				</view>
				<view class="action">
					<view class="cu-tag round bg-orange text-sm">
						储蓄卡
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu">
			<view class="cu-item">
				<view class="content">
					<text class="">银行支付限额</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">单笔限额</text>
				</view>
				<view class="action">
					<text class="text-grey">￥{{bankInfo.singleLimitAmount}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">每日限额</text>
				</view>
				<view class="action">
					<text class="text-grey">￥{{bankInfo.dayLimitAmount}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankInfo: {}
			}
		},
		
		onLoad(options) {
			this.bankInfo = JSON.parse(options.data)
		},
		
		methods: {

		}
	}
</script>

<style>

</style>
