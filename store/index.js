import { createStore } from 'vuex';

export default createStore({
  state: {
		user: 'kyle',
    isWXCorp: false, // 是否运行在企业微信
    isIPhoneX: false,
    systemInfo: {},
    globalSetting: ''
    // user: {
    //   username: getUserInfo().userName || "",
    //   password: getUserInfo().password || "",
    //   roleCode: getUserInfo().roleCode || [],
    //   token: getUserInfo().token || "",
    //   miniappWorkshopInfo: getUserInfo().miniappWorkshopInfo || [],
    //   chineseName: getUserInfo().chineseName || "", // dsr显示
    //   avatarUrl: "../../../static/image/visit/avatar-photos.png"
    // },
    // defaultAvatarUrl: "../../../static/image/visit/avatar-photos.png",
    // isIPhoneX: false,
    // systemInfo: {}
  },
  mutations: {
    setInPhoneX(state, data) {
      if (data.safeArea.top > 20) {
        state.isIPhoneX = true
      }
    },
    setSystemInfo(state, systemInfo){
      state.systemInfo = systemInfo
      // 在企业微信运行时，会额外返回一个environment字段并赋值为 “wxwork”，在微信里面运行时则不返回该字段。
      state.isWXCorp = !!systemInfo.environment
    }
  },
  actions: {
    // 处理异步代码，如需调用接口在这里处理
    getGlobalSetting({commit, state}, item) {
      state.globalSetting = item
    }
  }
  // modules: {
    // punchin
  // }
});
