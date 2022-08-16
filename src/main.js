import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/index.less'
import '@/assets/font_3578437_hfi1c416j2f/iconfont.css'
import '@/style/reset.css'
import notify from '@/utils/notify.js'
import dayjs from '@/utils/dayjs.js'

Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$notify = notify
// ^ --- 封装dayjs距今时间
Vue.prototype.$dayFrom = data => {
  return dayjs().from(dayjs(data))
}
// ^ --- 封装打印函数，用于快速确认组件是否有效
Vue.prototype.LOG = (item) => {
  return console.log(item)
}
Vue.prototype.LOGE = (e) => {
  return console.log(e)
}

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
