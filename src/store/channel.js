import { userChannleAPI, getAllChannelAPI } from '@/api'
export default {
  namespaced: true,
  state: {
    userChannel: [],
    allChannel: []
  },
  mutations: {
    GET_USER_CHANNEL_MUTATION(state, data) {
      state.userChannel = data
    },
    GET_ALL_CHANNEL_MUTAION(state, data) {
      state.allChannel = data.filter(
        (item) =>
          state.userChannel.findIndex((res) => res.id === item.id) === -1
      )
    },
    DELETE_CHANNEL(state, data) {
      const i = state.userChannel.findIndex((item) => item.id === data)
      state.userChannel.splice(i, 1)
    },
    ADD_NEW_USER_CHANNEL(state, data) {
      const i = state.allChannel.findIndex((item) => item.id === data)
      state.userChannel.push(state.allChannel[i])
    }
  },
  actions: {
    async GET_USER_CHANNEL_ACTION(action) {
      const res = await userChannleAPI()
      action.commit('GET_USER_CHANNEL_MUTATION', res.data.data.channels)
    },
    async GET_ALL_CHANNEL_ACTION(action) {
      const res = await getAllChannelAPI()
      action.commit('GET_ALL_CHANNEL_MUTAION', res.data.data.channels)
    }
  },
  getters: {},
  modules: {}
}
