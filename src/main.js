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
import HmNavbar from './components/HmNavbar.vue'
import moment from 'moment'

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
// 全局的前置路由导航守卫，不让地址栏直接跳转
const pages = ['/user', '/userEdit']
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // console.log(to)
  if (pages.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

// 请求拦截器，让所有的请求在发送请求之前携带token
axios.interceptors.request.use(function(config) {
  // console.log(config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器，判断失效的token
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    Toast.fail(message)
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  return res
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
