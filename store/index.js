import Vue from "vue";
import Vuex from "vuex";
// import { getUserInfo, setUserInfo } from "@/utils/auth";
// import punchin  from './punchin'

Vue.use(Vuex); //把Vuex注入到每一个子组件中

export default new Vuex.Store({
  state: {
		user: 'kyle'
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
    // setUserInfo(state, userInfo) {
    //   state.user.username = userInfo.userName;
    //   state.user.chineseName = userInfo.chineseName;
    //   // state.user.userCode = userInfo.userCode;
    //   state.user.token = userInfo.token;
    //   state.user.roleCode = userInfo.roleCode;
    //   state.user.password = userInfo.password;
    //   state.user.miniappWorkshopInfo = userInfo.miniappWorkshopInfo;
    //   setUserInfo(userInfo);
    // }
  },
  modules: {
    // punchin
  }
});
