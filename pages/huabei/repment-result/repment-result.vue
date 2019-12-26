<template>
	<view>
		<view class="bg-white padding">
			<view class="flex-sub text-center">
				<view class="text-xsl margin-top">
					<text class=" cuIcon-roundcheckfill text-green"></text>
				</view>
				<view class="result-msg margin-top-lg">还款成功</view>
				<view class="reslut-cny margin-top-xs">
					104.00
				</view>
			</view>
		</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">开关选择</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
		</form>
		<view class="padding text-grey text-sm">
			开启后本月即时生效，每月还款日将默认还最低还款，剩余部分转入下月账单，从最后还款日次日起按日利率0.05%计息。如不开启则以账单金额全额还款。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchA: false,
			}
		},
		methods: {
			SwitchA(e) {
				this.switchA = e.detail.value
			},
		}
	}
</script>

<style>
.result-msg{
	font-size: 40rpx;
}
.reslut-cny{
	font-size: 46rpx;
}
</style>
