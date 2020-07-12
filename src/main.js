import Vue from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import './style/common.less'
import './style/iconfont.less'
import router from './routers'
import hmHeader from './components/Hm-Header.vue'
import hmLogo from './components/Hm-Logo.vue'
import hmPost from './components/Hm-Post.vue'
import hmComment from './components/hm-comment.vue'
import hmFloor from './components/hm-floor.vue'
import {
  Button,
  Field,
  Form,
  Toast,
  Dialog,
  Uploader,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  List,
  Tab,
  Tabs,
  PullRefresh
} from 'vant'
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
Vue.use(Dialog)
Vue.use(Uploader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)

Vue.component('hm-header', hmHeader)
Vue.component('hm-logo', hmLogo)
Vue.component('hm-navbar', HmNavbar)
Vue.component('hm-post', hmPost)
Vue.component('hm-comment', hmComment)
Vue.component('hm-floor', hmFloor)

moment.locale('zh-CN')
Vue.filter('time', function(input, str = 'YYYY-MM-DD') {
  return moment(input).format(str)
})

Vue.filter('fromnow', function(input) {
  return moment(input).fromNow()
})

// 处理图片路径问题
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}

const pages = [
  '/user',
  '/userEdit',
  '/userFollows',
  '/userComments',
  '/userStar'
]
// 前置路由导航守卫是为了判断是否有token
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
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
  // console.log(response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    Toast.fail(message)
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
