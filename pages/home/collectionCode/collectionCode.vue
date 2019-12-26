<template>
	<view>
		<view class="bg-theme padding-lg text-center text-bold text-white">
			<view class="title">
				支付就用支付宝
			</view>
			<view class="bg-white padding radius self-center" style="width: 80%; margin: 30rpx auto;">
				<image src="../../../static/img-erweima.png" mode="widthFix" style="width: 100%;"></image>
				<view class="text-xl margin-top text-theme">打开支付宝[扫一扫]</view>
			</view>
			<view class="margin-top">
				免费寄送收钱码：电话010-88888888
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
	page{
		background: $uni-color-primary !important;
	}

	.title {
		font-size: 60rpx;
	}
	.text-theme{
		color: $uni-color-primary !important;;
	}
</style>
