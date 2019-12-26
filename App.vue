<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		// #ifdef APP-PLUS
		// 锁定屏幕方向
		plus.screen.lockOrientation('portrait-primary'); //锁定

		var domModule = weex.requireModule('dom');
		domModule.addRule('fontFace', {
			fontFamily: 'uniicons',
			src: "url('./static/uni.ttf')"
		});
		// #endif
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style>
@import "colorui/main.css";
@import "colorui/icon.css";

/*自定义图标 */
@import './common/iconfont.css';
/*自定义我css */
@import './common/app.css';


</style>
