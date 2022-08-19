import { getUserMessageAPI } from '@/api'
import { setToken } from '@/utils/Token'
export default {
  namespaced: true,
  state: {},
  mutations: {
    GET_USER_INFOMATION_MUTATION(state, data) {
      setToken('userInfo', data)
    }
  },
  actions: {
    async GET_USER_INFOMATION_ACTION(action, data) {
      const res = await getUserMessageAPI(data)
      action.commit('GET_USER_INFOMATION_MUTATION', res.data.data)
    }
  },
  getters: {},
  modules: {}
}
