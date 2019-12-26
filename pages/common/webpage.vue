<template>
    <view>
		<!-- 注意：此处的url不能加this. -->
        <web-view :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				url: "",
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
		
		onLoad(options) {
			this.url = decodeURIComponent(options.url);
			console.log("要加载的地址："+this.url);
		}
    }
</script>

<style>

</style>