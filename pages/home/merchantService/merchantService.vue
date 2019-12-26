<template>
	<view>
		<view class="cu-list menu-avatar ">
			<view class="cu-item bg-title arrow">
				<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">

				</view>
				<view class="content text-white">
					<view class="">
						<view class="text-cut">周瑶</view>
					</view>
					<view class=" flex">
						<view class="text-cut">
							zhouyaoiu@163.com
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list grid col-2 no-border card-menu shadow shadow-lg">
			<view class="cu-item solid-right">
				<navigator url="../collectionRecord/collectionRecord" hover-class="none">
					<view class="text-sm">今日收款</view>
					<view class="text-danger font-bold padding-tb-xs">฿100.00</view>
					<view class="text-sm text-blue">查看明细</view>
				</navigator>
			</view>
			<view class="cu-item">
				<view>
					<navigator url="../../home/withdraw/withdraw" hover-class="none">
						<view class="text-sm">钱包花呗</view>
						<view class="text-danger font-bold  padding-tb-xs">฿495034.00</view>
						<view class="text-sm text-blue">提现</view>
					</navigator>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu shadow shadow-lg">
			<view class="cu-item arrow">
				<navigator url="../collectionCode/collectionCode" hover-class="none" class="content">
					<image src="/static/icon-zhangdan.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">商户收款码</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator url="../../home/billLists/billLists" hover-class="none" class="content">
					<image src="/static/icon-shangjia.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">账单</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator url="../../home/returnLists/returnLists" hover-class="none" class="content">
					<image src="/static/icon-yinhangka.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">退货</text>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.bg-title {
		background: $uni-color-primary !important
	}
</style>
