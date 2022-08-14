import { getAritcleAPI } from '@/api'
export default {
  namespaced: true,
  state: {
    articleList: []
  },
  mutations: {
    GET_ARTICLE_INFOMATION_MUTATION(state, data) {
      state.articleList = data
    }
  },
  actions: {
    async GET_ARTICLE_INFOMATION_ACTION(action, data) {
      const res = await getAritcleAPI(data)
      console.log('res: ', res)
    }
  },
  getters: {},
  modules: {}
}
