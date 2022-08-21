import { getUserMessageAPI, updateUserImgAPI, updateUserInfoAPI } from '@/api'
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
    },
    async UPDATE_USER_IMG(action, data) {
      const res = await updateUserImgAPI(data)
      return res
    },
    async UPDATE_USER_INFO(action, data) {
      await updateUserInfoAPI(data)
    }
  },
  getters: {},
  modules: {}
}
