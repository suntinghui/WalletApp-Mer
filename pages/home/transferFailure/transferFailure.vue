<template>
	<view class="text-center bg-white full-screen">
		
		<view style="margin-top: 100px;">
			<image style="width: 60px; height: 60px;" src="/static/failure.png"></image>
		</view>
		<view style="margin-bottom: 30px;">
			<view class="text-xl padding">交易失败</view>
		</view>
		
		<view class="margin-lr-xl flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="gotoHome()">返回首页</button>
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
			gotoHome() {
				uni.switchTab({
				    url: '/pages/tabBar/home/home'
				});
			},
		}
	}
</script>

<style>
	
	.full-screen {
		width: 100%;
		height: 100%;
		display: block;
		background-color: #FFFFFF;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}

</style>
