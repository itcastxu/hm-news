import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import register from '../views/register.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', component: register }
  ]
})

export default router
