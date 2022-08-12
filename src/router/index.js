import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import { getToken } from '@/utils/Token.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
// ^ --- 添加路由守卫，验证当是从login个人中心跳转的路由禁止回退功能
router.beforeEach((to, from, next) => {
  // console.log(to.name)
  // console.log(from.name)
  // console.log(!!getToken('heima_Token'))
  if (to.name === 'login' || !!getToken('heima_Token')) {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  }
  next()
})

export default router
