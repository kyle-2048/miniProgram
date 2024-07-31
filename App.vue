<script>
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: (res) => {
					this.$store.commit("setSystemInfo", res);
					this.$store.commit("setInPhoneX", res);
				},
			});
		},
		onShow: function() {
			console.log('App Show')
      this.$store.dispatch("getGlobalSetting", 'nice')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		background-color: #f9f9f9;
	}
</style>
<style lang="scss">
/* 解决小程序和app滚动条的问题 */
/* #ifdef MP-WEIXIN || APP-PLUS */
/* 去掉滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background-color: transparent;
}
</style>

<style lang="scss">
  @import "./uni_modules/vk-uview-ui/index.scss";
</style>
