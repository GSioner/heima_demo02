import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './userInfo.js'
import channel from './channel.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userInfo,
    channel
  }
})
