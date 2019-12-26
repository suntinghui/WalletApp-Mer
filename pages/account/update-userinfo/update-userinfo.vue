<!-- 更换手机号 -->

<template>
	<view class="uni-padding-wrap uni-common-pb">
		
		<view class="cu-list menu sm-border">
			
			<view class="cu-item">
				<view class="title">昵称</view>
				<input  name="input" type="text" v-model="nickName"></input>
			</view>
			
			<view class="cu-item arrow" @tap="selectCertType">
				<view class="title">证件类型</view>
				<view class="picker">{{certTypeName[certSelectIndex]}}</view>
			</view>
			
			<view class="cu-item">
				<view class="title">证件号码</view>
				<input  name="input" type="idcard" v-model="certificateNbr" ></input>
			</view>
			
			<view class="cu-item">
				<view class="title">手机号</view>
				<input  name="input" type="number" v-model="mobileNbr"></input>
			</view>
			
		</view>
		
		<view class="padding flex flex-direction">
			<button url="../change-mobile2/change-mobile2" @tap="updateAction" hover-class="none" class="cu-btn bg-blue lg radius">确 定</button>
		</view>
		
	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	
	var _this;
	
	import {
		mapMutations, mapGetters
	} from 'vuex';
	
	export default {
		data() {
			return {
				certTypeName:['居民身份证或临时身份证', '军人或武警身份证件','港澳台往来内地身份通行证','外国公民护照','其他类个人身份有效证件'],
				certTypeValue: ['11', '12', '13', '14', '19'],
				
				certificateType: 11,
				certSelectIndex: 0,
				
				nickName: '',
				mobileNbr: '',
				certificateNbr: '',
			}
		},
		
		onLoad() {
			_this = this;
		},
		
		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		
		methods: {
			...mapMutations(['updateToken']),
			
			selectCertType: function(e) {
				uni.showActionSheet({
				    itemList: _this.certTypeName,
				    success: function (res) {
				        _this.certSelectIndex = res.tapIndex;
						_this.certificateType = _this.certTypeValue[res.tapIndex];
				    },
				    fail: function (res) {
				    }
				});
			},
			
			updateAction:function(e) {
				uni.showLoading({
				    title: '加载中'
				});
				
				uni.request({
				    url: this.BASE_URL+'/login/modify/userInfo',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
						nickName: _this.nickName,
				        certificateType: _this.certificateType,
						certificateNbr: _this.certificateNbr,
						mobileNbr: this.mobileNbr
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							_this.$api.msg('修改成功')
							
							
						} else {
							_this.$api.alert(res.data.errorMsg);
						}
				    },
					fail: (res) => {
						console.log("fail:"+res.data);
					},
					complete: (res) => {
						uni.hideLoading();
					}
				});
			},
			
		}
		
	}
</script>

<style>

</style>
