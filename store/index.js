import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "",
		openid: null,
		token: null,
		userInfo: null,
		accountList: null,
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false;
			state.openid = null;
			state.token = null;
			
			uni.setStorage({//缓存用户登陆状态
			    key: 'token',  
			    data: null  
			}) 
			
			console.log("已清空token.");
			
		},
		setOpenid(state, openid) {
			state.openid = openid
		},
		updateToken(state, token) {
			state.token = token;
			
			uni.setStorage({//缓存用户登陆状态
			    key: 'token',  
			    data: token  
			}) 
			
			//console.log("已更新token:"+token);
		},
		setUserInfo(state, info) {
			state.userInfo = info;
		},
		saveAccountList(state, list) {
			state.accountList = list;
		}
	},
	
	getters:{
		token(state) {
			state.token = uni.getStorageSync('token');
			return state.token;
		},
		userInfo(state) {
			return state.userInfo;
		},
		accountList(state) {
			return state.accountList;
		}
	},
	
	actions: {
		
	}
})

export default store
