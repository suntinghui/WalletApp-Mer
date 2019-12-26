<template>
	<view>
		<view class="bg-white">
			<view class="cu-form-group solid-bottom">
				<input placeholder="输入金额" value="100" name="input" class="text-bold" style="font-size: 55rpx; height: 60px; line-height: 60px;"></input>

				<text class='text-blue'>修改金额</text>
			</view>
			<view class="padding-sm text-sm text-grey">
				当前应还100元，最低还款10元
			</view>
		</view>
		<view class="bg-white margin-top">
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group">
					<view class="title">分3期X每期3.41</view>
					<radio :class="radio=='A'?'checked':''" :checked="radio=='A'?true:false" value="A"></radio>
				</view>
				<view class="padding-left-xl text-sm text-grey" v-if="radio=='A'">
					<view>3期总手续费率2.5% :</view>
					<view class="margin-top-xs">第1期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第2期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第3期11月10日还 3.41(含手续费0.08)</view>
				</view>
				<view class="cu-form-group">
					<view class="title">分6期X每期1.73</view>
					<radio :class="radio=='B'?'checked':''" :checked="radio=='B'?true:false" value="B"></radio>
				</view>
				<view class="padding-left-xl text-sm text-grey" v-if="radio=='B'">
					<view>6期总手续费率2.5% :</view>
					<view class="margin-top-xs">第1期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第2期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第3期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第4期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第5期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第6期11月10日还 3.41(含手续费0.08)</view>
				</view>
				<view class="cu-form-group">
					<view class="title">分9期X每期1.18</view>
					<radio :class="radio=='C'?'checked':''" :checked="radio=='C'?true:false" value="C"></radio>
				</view>
				<view class="padding-left-xl text-sm text-grey" v-if="radio=='C'">
					<view>9期总手续费率2.5% :</view>
					<view class="margin-top-xs">第1期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第2期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第3期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第4期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第5期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第6期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第7期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第8期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第9期11月10日还 3.41(含手续费0.08)</view>
				</view>
				<view class="cu-form-group">
					<view class="title">分12期X每期0.90</view>
					<radio :class="radio=='D'?'checked':''" :checked="radio=='D'?true:false" value="D"></radio>
				</view>
				<view class="padding-left-xl text-sm text-grey" v-if="radio=='D'">
					<view>12期总手续费率2.5% :</view>
					<view class="margin-top-xs">第1期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第2期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第3期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第4期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第5期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第6期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第7期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第8期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第9期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第10期9月10日还 3.42(含手续费0.08)</view>
					<view class="margin-top-xs">第11期11月10日还 3.41(含手续费0.08)</view>
					<view class="margin-top-xs">第12期11月10日还 3.41(含手续费0.08)</view>
				</view>
			</radio-group>
		</view>
		<view class="text-blue padding text-sm">
			手续费率说明
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-red margin-tb-sm lg" @tap="showModal" data-target="bottomModal">确认分期</button>
		</view>
		
		<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''" style="z-index: 998;">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-blue" @tap="hideModal" style="margin-left: 0;">
						<text class="cuIcon-close"></text>
					</view>
					<view>确认分期</view>
					<view class="action text-blue">
						<text class="cuIcon-question"></text>
					</view>
				</view>
				<view class="padding-tb bg-white">
					<view class="cu-form-group">
						<view class="title">分期金额</view>
						<view>100</view>
					</view>
					<view class="cu-form-group">
						<view class="title">分期期数</view>
						<view>3期</view>
					</view>
					<view class="cu-form-group">
						<view class="title">每期应还</view>
						<view>
							<view class="text-right">33.33</view>
							<view class="text-sm text-grey">含手续费0.08</view>
						</view>
					</view>
					<view class="cu-form-group">
						<view class="title">首期还款</view>
						<view>9月10日</view>
					</view>
					<view class="cu-form-group">
						<view class="title">分期详情</view>
						<view>3.333*3</view>
					</view>
					
					<view class="padding flex flex-direction">
						<navigator url="../repment-result/repment-result" hover-class="none" class="cu-btn bg-red margin-tb-sm lg radius">立即付款</navigator>
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
				radio: 'A',
				index: -1,
				modalName: null,
			}
		},
		methods: {
			RadioChange(e) {
				this.radio = e.detail.value
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style>

</style>
