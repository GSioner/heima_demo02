import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import { getToken } from '@/utils/Token.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})
// ^ --- 添加路由守卫，验证当是从login个人中心跳转的路由切拥有Token时禁止回退功能
router.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log('------------')
  // console.log(from)
// ^ --- 使用from的数据替换to即可常规调取到的路由数据，完善回退功能
  to.query.backpage = from.path
  if ((to.name === 'login' || from.name === 'login') && !!getToken('heima_Token')) {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  }
  next()
})

export default router
