import App from './App'
import store from './store/index.js'
import uView from './uni_modules/vk-uview-ui';
import { createSSRApp } from 'vue'
import { isEmptyString, checkNullObj } from './utils/common/common'


// #ifndef VUE3
// 创建vue实例的vue2写法
// import Vue from 'vue'
// Vue.config.productionTip = false
// App.mpType = 'app'
// const app = new Vue({
//     ...App,
// 		store
// })
// app.$mount()
// #endif

// #ifdef VUE3
// 创建vue实例的vue3写法
const app = createSSRApp(App)
app.use(store)
app.use(uView)
app.config.globalProperties.$isEmptyString = isEmptyString // vue3添加prototype
app.config.globalProperties.$checkNullObj = checkNullObj
export function createApp() {
  return {
    app
  }
}
// #endif
