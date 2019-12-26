<template>
	<view class="uni-padding-wrap uni-common-pb">

		<view class="cu-list menu">

			<view class="cu-item arrow" v-for="(item,index) in list" :key="index" @click="selectCountry(item)">
				<view class="content">
					<text class="title">{{item.cn}}</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{item.code}}</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import country from '@/common/country-code.js'

	export default {
		data() {
			return {
				list: country.list
			}
		},
		methods: {
			selectCountry: function (item) {
				var pages = getCurrentPages()
				var currPage = pages[pages.length - 1];   //当前页面
				var prevPage = pages[pages.length - 2];  //上一个页面
				prevPage.setData({
					countryName:item.cn,
					countryCode:item.code
				})
				
				uni.navigateBack()
			}

		}
	}
</script>

<style>

</style>
