<template>
	<view>
		<view class="bg-white padding text-center">
			<image src="../../../static/img-tiaoxingma.png" mode="widthFix" style="width: 100%;"></image>
			<view class=" text-gray">2000 <text>****</text> 查看数字</view>
			<image src="../../../static/img-erweima.png" mode="widthFix" style="width: 60%;" class="margin-top-lg"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				radio: 'A',
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
		}
	}
</script>

<style>
	.select-payment{
	 padding: 10px 0;
	}

</style>
