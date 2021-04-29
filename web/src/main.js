import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.config.productionTip = false

import axios from "axios";
// 配置请求的根路径 这是默认的 代理处理见配置文件 如果后端处理跨域 直接请求默认值路径
// axios.defaults.baseURL='http://192.168.14.168:3000/api/v1'
Vue.prototype.$http = axios

// 全局过滤器的使用 replace()替换 字符串替换字符串
// 用于处理图片的尺寸
  // Vue.filter('setWH',(url,arg)=>{
  //   return url.replace(/w\.h/,arg)
  // })


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
