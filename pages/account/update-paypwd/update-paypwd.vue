<!-- 更换手机号 -->

<template>
	<view class="uni-padding-wrap uni-common-pb">
		<form @submit="checkInput">
		<view class="cu-list menu sm-border m-t-10">
			<view class="cu-item" v-if="hasPayPwd">
				<view class="title">原密码</view>
				<input placeholder="请输入原密码" name="oldPassword" password type="text" @input="oldPassword" :value="info.oldPwd"></input>
			</view>
			
			<view class="cu-item">
				<view class="title">新密码</view>
				<input placeholder="请输入新密码" name="newPassword" password type="text" @input="newPassword" :value="info.newPwd"></input>
			</view>
			
			<view class="cu-item">
				<view class="title">确认新密码</view>
				<input placeholder="请确认新密码" name="confirmPassword" password type="text" @input="confirmPassword" :value="info.confirmPwd"></input>
			</view>
			
		</view>
		
		<view class="padding flex flex-direction">
			<button type="primary" formType="submit" style="width: 95%;">确认修改</button>
		</view>
		</form>
		
	</view>
</template>

<script>
	var _this;
	
	//来自 graceUI 的表单验证， 使用说明见手册 http://grace.hcoder.net/doc/info/73-3.html
	var  graceChecker = require("../../../common/graceChecker.js");
	
	import {
	    mapGetters
	} from 'vuex'; 
	
	export default {
		data() {
			return {
				info: {
					oldPwd: "",
					newPwd: "",
					confirmPwd: "",
				},
				hasPayPwd: false
			}
		},
		onLoad:function(){
			console.log(JSON.stringify(this.userInfo))
			this.hasPayPwd = this.userInfo.hasTransferPwd;
		},
		mounted() {
			_this= this;
		},
		computed: {
			...mapGetters(["token", "userInfo"]),
		},
		methods: {
			oldPassword: function(e) {
				this.info.oldPwd = e.detail.value;  
			},
			
			newPassword: function(e) {
				this.info.newPwd = e.detail.value;
			},
			
			confirmPassword: function(e) {
				this.info.confirmPwd = e.detail.value;
			},
			
			checkInput: function(e) {
				//定义表单规则
				var rule = [];
				if (this.hasPayPwd) {
					rule.push({name:"oldPassword", checkType : "notnull", checkRule:"",  errorMsg:"请输入原密码"})
				}
				rule.push({name:"newPassword", checkType : "notnull", checkRule:"",  errorMsg:"请输入新密码"});
				rule.push({name:"confirmPassword", checkType : "same", checkRule:this.info.newPwd,  errorMsg:"两次新密码输入不一致"});
				
				console.log(JSON.stringify(rule))
				
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					this.updatePwdAction();
					
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none", position: "bottom" });
				}
			},
			
			updatePwdAction: function(e) {
				uni.showLoading({
				    title: '加载中'
				});
				console.log(_this.token)
				uni.request({
				    url: this.BASE_URL+'/login/modify/passwd',
					method: 'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
				    data: {
				        oldTransferPassword: _this.info.oldPwd,
						transferPassword: _this.info.newPwd
				    },
				    success: (res) => {
						console.log("==="+JSON.stringify(res));
						if (res.data.code == "B0000") {
							_this.$token.updateToken(res.header.token);
							
							uni.showModal({
							    title: '提示',
							    content: '密码修改成功',
								showCancel: false,
							    success: function (res) {
							        if (res.confirm) {
							            uni.navigateBack({
							                delta: 1
							            });
							        } 
							    }
							});
							
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
			}
		}
	}
</script>

<style>

</style>
