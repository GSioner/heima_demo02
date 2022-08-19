import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './userInfo.js'
import channel from './channel.js'
import article from './article.js'
import search from './search.js'
import articleInfo from './articleInfo.js'
import comment from './comment.js'
import editMessage from './editMessage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    userInfo,
    channel,
    article,
    search,
    articleInfo,
    comment,
    editMessage
  }
})
