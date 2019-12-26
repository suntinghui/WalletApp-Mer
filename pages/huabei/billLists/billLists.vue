<template>
	<view>
		<view class="cu-list menu sm-border">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view class="text-gray">本月</view>
					<view class="text-black">支出 ¥ {{sumPay}}  收入 ¥ {{sumIncome}} </view>
				</view>
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item, index) in dataList">
				<view class="cu-avatar round"  :style=" 'background-image:url(' + url + item.photo +');' "></view>
				<view class="content">
					<view class="text-cut">{{item.transferDesc}}</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">{{item.transferDatetime}}</view>
					</view>
				</view>
				<view class="action">
					<!--  0=支出  1=收入 -->
					<view class="text-bold text-price text-red" v-if="item.transferDirection == 0">-{{item.transferAmount}}</view>
					<view class="text-bold text-price text-green" v-if="item.transferDirection == 1">{{item.transferAmount}}</view>
					<view class="cu-tag round bg-grey">{{item.transferTypeMsg}}</view>
				</view>
			</view>
			
		</view>
		
		<view>
			<uni-load-more :status="loadMoreStatus" iconType="auto" color="#007aff" />
		</view>
	</view>
</template>

<script>
	var _this;
	
	import permision from "@/common/permission.js"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	
	import {
		mapMutations,
		mapGetters
	} from 'vuex';
	
	export default {
		components: {
			uniLoadMore
		},
		
		data() {
			return {
				url: this.BASE_URL,
				
				dataList:[],
				sumIncome: 0.00,
				sumPay: 0.00,
				currentPage: 1,
				pageSize : 10,
				totalCount: 0,
				
				loadMoreStatus: 'more',
			}
		},
		
		onLoad: function() {
			_this = this;
		
			this.getHistoryList();
		},
		
		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		
		methods: {
			...mapMutations(['updateToken', "setUserInfo"]),
			
			onPullDownRefresh: function() {
				this.currentPage = 1;
				this.dataList = [];
				this.getHistoryList();
			},
			
			onReachBottom:function() {
				if (this.totalCount >  this.pageSize * this.currentPage) {
					this.currentPage += 1;
					this.getHistoryList();
					
					_this.loadMoreStatus = "loding";
					
				} else {
					// 已没有更多数据
					this.loadMoreStatus = "noMore";
				}
				
			},

			getHistoryList:function() {
				uni.request({
					url: this.BASE_URL + '/transfer/query/transferInfo/currentMonth',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						accountType: '205,206',
						queryType: '0',
						start: this.currentPage,
						length: this.pageSize
					},
					success: (res) => {
						console.log(JSON.stringify(res));
						if (res.data.code == "B0000") {
							
							_this.dataList = _this.dataList.concat(res.data.data.detail);
							
							_this.sumPay = res.data.data.sumPay;
							_this.sumIncome = res.data.data.sumIncome;
							_this.totalCount = res.data.data.sumCount;
							
							if (_this.totalCount >  _this.pageSize * _this.currentPage) {
								_this.loadMoreStatus = 'more';
								
							} else {
								_this.loadMoreStatus = 'noMore';
							}
							
							_this.$token.updateToken(res.header.token);
							
						} else {
							_this.$api.alert(res.data.msg)
						}
					},
					fail: (res) => {},
					complete: (res) => {
						uni.hideLoading();
						uni.stopPullDownRefresh();
					}
				});
			},
			
		}
	}
</script>

<style>

</style>
