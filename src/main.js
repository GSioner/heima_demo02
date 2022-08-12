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

Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$notify = notify

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
