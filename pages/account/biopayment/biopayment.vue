<!-- 生物支付 -->
<template>
	<view class="uni-padding-wrap uni-common-pb">
		
		<view class="text-sm text-gray" style="padding: 10px;">
			若两者同时开启，则优先使用指纹支付
		</view>
		
		<view class="cu-list menu text-left solid-top">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">指纹支付</text>
				</view>
				<view class="action">
					<switch @change="fpPay" :class="fpPay?'checked':''" :checked="fpPay?true:false"></switch>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">手势密码支付</text>
				</view>
				<view class="action">
					<switch @change="gesturePay" :class="gesturePay?'checked':''" :checked="gesturePay?true:false"></switch>
				</view>
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
			fpPay: function(e) {
				var flag = e.detail.value;
				if (flag) {
					uni.navigateTo({
						url:'../../account/fingerprint/fingerprint'
					});
				}
			},
			gesturePay: function(e) {
				var flag = e.detail.value;
				if (flag) {
					uni.navigateTo({
						url:'../../account/gesture-lock/gesture-lock'
					});
				}
			}
		}
	}
</script>

<style>

</style>
