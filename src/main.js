import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import VueUeditorWrap from 'vue-ueditor-wrap'
import {get,post} from './api'

// 将get和post请求暴露在全局,直接可以用$get和$post调用

Vue.prototype.$get = get
Vue.prototype.$post = post

Vue.use(ElementUI,axios)

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.component('vue-ueditor-wrap', VueUeditorWrap)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
