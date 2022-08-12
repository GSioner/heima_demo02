import { getUserInfoAPI } from '@/api'
export default {
  namespaced: true,
  state: {
    userMessage: []
  },
  mutations: {
    GET_USER_INOFMATION_MUTATION(state, data) {
      state.userMessage = data
    }
  },
  actions: {
    async GET_USER_INOFMATION_ACTION(action) {
      const res = await getUserInfoAPI()
      action.commit('GET_USER_INOFMATION_MUTATION', res.data.data)
    }
  },
  getters: {},
  modules: {}
}
