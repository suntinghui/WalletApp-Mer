import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'
import uLink from '@/components/uLink.vue'
import store from './store'

Vue.prototype.BASE_URL = "http://118.190.205.233/qbhbcustomerapi";
// Vue.prototype.BASE_URL = "http://192.168.1.168/qbhbcustomerapi";
// Vue.prototype.BASE_URL = "http://qianbao.xiaomiqiu.com/qbhbcustomerapi";
Vue.config.productionTip = false

const msg = (title, duration=1500, mask=false, icon='none', position='bottom')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon,
		position
	});
}

const alert = (content)=>{
	uni.showModal({
		title: "提示",
		content: content,
		showCancel: false
	});
}

const loading = (content="加载中...")=>{
	uni.showLoading({
		title: content
	});
}

const updateToken  = (token) => {
	store.commit("updateToken", token);
}


Vue.prototype.$store = store
Vue.prototype.$api = {msg, alert, loading};
Vue.prototype.$token = {updateToken};


Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)
Vue.component('uLink', uLink)

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
