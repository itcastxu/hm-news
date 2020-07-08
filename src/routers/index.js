import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import register from '../views/register.vue'
import user from '../views/user.vue'
import userEdit from '../views/userEdit.vue'
import userFollows from '../views/user_follows.vue'
import userComments from '../views/userComments.vue'
import userStar from '../views/userStar.vue'
import Home from '../views/index.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/register', component: register },
    { path: '/user', component: user },
    { path: '/userEdit', component: userEdit },
    { path: '/userFollows', component: userFollows },
    { path: '/userComments', component: userComments },
    { path: '/userStar', component: userStar },
    { path: '/', component: Home }
  ]
})

export default router
