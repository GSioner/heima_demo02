import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/index.less'
import '@/assets/font_3578437_m23fbebohko/iconfont.css'
import '@/style/reset.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
