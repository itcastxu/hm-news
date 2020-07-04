import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import './style/common.less'
import './style/iconfont.less'
import router from './routers'
import hmHeader from './components/Hm-Header.vue'
import hmLogo from './components/Hm-Logo.vue'
import { Button, Field, Form, Toast } from 'vant'
import axios from 'axios'
import moment from 'moment'
import HmNavbar from './components/HmNavbar.vue'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$axios = axios

Vue.use(Button)
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast)

Vue.component('hm-header', hmHeader)
Vue.component('hm-logo', hmLogo)
Vue.component('hm-navbar', HmNavbar)

Vue.filter('time', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

// 前置路由导航守卫是为了判断是否有token
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  if (to.path === '/user') {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
// 请求拦截器 发送请求之前给所有的请求设置请求头
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  // config包含所有请求头的信息
  // console.log(config)
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 响应拦截器 在返回数据之前判断token是否失效
// 此时浏览器会跳一下，因为发送请求了，请求user页面的数据时，被响应拦截器拦截了，所以又跳回到login页面
axios.interceptors.response.use(function(response) {
  console.log(response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    router.push('/login')
  }
  return response
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
