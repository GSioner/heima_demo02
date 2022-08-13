import { userChannleAPI } from '@/api'
export default {
  namespaced: true,
  state: {
    userChannel: []
  },
  mutations: {
    GET_USER_CHANNEL_MUTATION(state, data) {
      state.userChannel = data
    }
  },
  actions: {
    async GET_USER_CHANNEL_ACTION(action) {
      const res = await userChannleAPI()
      action.commit('GET_USER_CHANNEL_MUTATION', res.data.data.channels)
    }
  },
  getters: {},
  modules: {}
}
