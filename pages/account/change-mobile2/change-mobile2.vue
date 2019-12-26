<template>
	<view>
		<view class="text-center bg-white padding">
			<view class="title margin-top">我们已发送验证码短信到您的手机：</view>
			<view class=" margin-top">
				+86  <text class="text-phone text-black text-bold">18500972879</text>
			</view>
		</view>
		<view class="margin-top">
			<valid-code style="font-size: 20px;" :maxlength="4" :isPwd="false" @finish="getCode"></valid-code>
		</view>
		<view class="text-center margin-top">
			收短信大约需要56秒
		</view>
	</view>
</template>

<script>
	import validCode from '../../../components/p-validCode/validCode.vue'
	export default {
		components: {
			validCode
		},
		data() {
			return {

			}
		},
		methods: {
			getCode(val) {
				console.log(val);
			},
			getPwd(val) {
				console.log(val);
			}
		}
	}
</script>

<style>
	.title {
		font-size: 36rpx;
	}

	.text-phone {
		font-size: 50rpx;
	}

	.content {
		height: 400upx;
	}
</style>
