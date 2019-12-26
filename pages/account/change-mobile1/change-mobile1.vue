<!-- 更换手机号 -->

<template>
	<view class="uni-padding-wrap uni-common-pb">
		
		<view class="cu-list menu sm-border">
			<view class="cu-item arrow" @tap="showCountryList">
				<view class="title">国家地区</view>
				<view class="picker">{{countryName}}</view>
			</view>
			
			<view class="cu-item">
				<view class="title">{{countryCode}}</view>
				<input placeholder="18500972879" name="input"></input>
			</view>
			
		</view>
		
		<view class="padding flex flex-direction">
			<navigator url="../change-mobile2/change-mobile2" hover-class="none" class="cu-btn bg-blue lg radius">下一步</navigator>
		</view>
		
		<view class="text-df padding" style="padding-top: 1px;">
			一个手机号只能作为一个账号的登录名，一个手机号最多可以被6个账号绑定。
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				countryName:"中国",
				countryCode:"+86"
			}
		},
		methods: {
			showCountryList: function(e) {
				uni.navigateTo({
					url:"../../account/country-code/country-code"
				})
			}
		}
	}
</script>

<style>

</style>
