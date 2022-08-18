import { getCommentLikeAPI, getCommentDislikeAPI, addCommentAPI } from '@/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async GET_COMMENT_LIKE(action, data) {
      const res = await getCommentLikeAPI(data)
      console.log('res: ', res)
    },
    async GET_COMMENT_DISLIKE(action, data) {
      const res = await getCommentDislikeAPI(data)
      console.log('res: ', res)
    },
    async ADD_COMMENT(action, data) {
      const res = await addCommentAPI(data)
      console.log('res: ', res)
    }
  },
  getters: {},
  modules: {}
}
