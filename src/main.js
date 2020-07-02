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

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$axios = axios

Vue.use(Button)
Vue.use(Field)
Vue.use(Form)
Vue.use(Toast)

Vue.component('hm-header', hmHeader)
Vue.component('hm-logo', hmLogo)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
