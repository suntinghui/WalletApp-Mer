<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">金额</view>
				<input placeholder="请输入收款金额" type="digit" name="input" v-model="amount"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea :disabled="modalName!=null" maxlength="10" @input="textareaBInput" v-model="tips" placeholder="添加收款备注"></textarea>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-orange margin-tb-sm lg" @tap="inputDone()">确定</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount: "",
				tips: ""
			}
		},
		methods: {
			inputDone: function() {
				let pages = getCurrentPages();  
				let prevPage = pages[pages.length - 2]; //上一个页面  
				prevPage.setData({  
				     "transferAmount":this.amount,
					 "transferTip": this.tips
				})
				
				 uni.navigateBack();
			}

		}
	}
</script>

<style>

</style>
