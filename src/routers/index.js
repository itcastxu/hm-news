import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import register from '../views/register.vue'
import user from '../views/user.vue'
import userEdit from '../views/userEdit.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', component: register },
    { path: '/user', component: user },
    { path: '/userEdit', component: userEdit }
  ]
})

export default router
