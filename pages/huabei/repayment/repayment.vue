<template>
	<view>
		<view class="bg-white">
			<form>
				<view class="cu-form-group solid-bottom">
					<input placeholder="输入金额" value="100" name="input" class="text-bold" style="font-size: 55rpx; height: 60px; line-height: 60px;"></input>
					
					<text class='text-blue'>修改金额</text>
				</view>
				<view class="padding-sm text-sm text-grey">
					本月账单104元，最底还款10.4元
				</view>
			</form>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="showModal" data-target="bottomModal">确认还款</button>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''" style="z-index: 998;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal" style="margin-left: 0;">
						<text class="cuIcon-close"></text>
					</view>
					<view>确认付款</view>
					<view class="action text-blue">
						<text class="cuIcon-question"></text>
					</view>
				</view>
				<view class="padding-tb bg-white">
					<view class="text-cny text-bold">
						<text class="text-df">￥</text>104.00
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">订单信息</view>
						<view>花呗还款</view>
					</view>
					<view class="cu-form-group">
						<view class="title">付款方式</view>
						<picker @change="PickerChange" :value="index" :range="picker">
							<view class="picker">
								{{index>-1?picker[index]:'工商银行'}}
							</view>
						</picker>
					</view>
					<view class="padding flex flex-direction">
						<navigator url="../repment-result/repment-result" hover-class="none" class="cu-btn bg-red margin-tb-sm lg">立即付款</navigator>
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
				index: -1,
				modalName: null,
				picker: ['中国银行', '工商银行', '农业银行'],
			}
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			PickerChange(e) {
				this.index = e.detail.value
			},
		}
	}
</script>

<style>
.cny-input{
	font-size: ;
}
.text-cny{
	font-size: 36px;
}
</style>
