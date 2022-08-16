import {
  getArticleStructureAPI,
  getFollowingAPI,
  DelFollowingAPI,
  getLikeAPI,
  DelLikeAPI
} from '@/api'
export default {
  namespaced: true,
  state: {
    articleInfomation: []
  },
  mutations: {
    GET_ARTICLE_INFO_MUTATION(state, data) {
      state.articleInfomation = data
    }
  },
  actions: {
    async GET_ARTICLE_INFO_ACTION(action, data) {
      const res = await getArticleStructureAPI(data)
      action.commit('GET_ARTICLE_INFO_MUTATION', res.data.data)
    },
    async GET_FOLLOWING(action, data) {
      await getFollowingAPI(data)
    },
    async DELETE_FOLLOWING(action, data) {
      await DelFollowingAPI(data)
    },
    async GET_LIKE(action, data) {
      await getLikeAPI(data)
    },
    async DELETE_LIKE(action, data) {
      await DelLikeAPI(data)
    }
  },
  getters: {},
  modules: {}
}
