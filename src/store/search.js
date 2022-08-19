import { getSuggestionWordAPI, getSearchResultAPI } from '@/api'
import { getToken, removeToken, setToken } from '@/utils/Token.js'
export default {
  namespaced: true,
  state: {
    suggestionWord: [],
    historyList: getToken('history') || [],
    searchList: []
  },
  mutations: {
    GET_SUGGESTION_WORD_MUTATION(state, data) {
      state.suggestionWord = data
    },
    GET_HISTORY_INFO(state, data) {
      if (state.historyList.indexOf(data) > -1) {
        const i = state.historyList.indexOf(data)
        state.historyList.splice(i, 1)
      }
      state.historyList.unshift(data)
      setToken('history', state.historyList)
    },
    DELETE_HISTORY_INFO(state, data) {
      if (data === 'delete') {
        state.historyList = []
        return removeToken('history')
      }
      const i = state.historyList.indexOf(data)
      state.historyList.splice(i, 1)
      setToken('history', state.historyList)
    },
    GET_SEARCH_RESULT_MUTATION(state, data) {
      state.searchList = data
    }
  },
  actions: {
    async GET_SUGGESTION_WORD_ACTION(action, data) {
      const res = await getSuggestionWordAPI(data)
      action.commit('GET_SUGGESTION_WORD_MUTATION', res.data.data.options)
    },
    async GET_SEARCH_RESULT_ACTION(action, data) {
      const res = await getSearchResultAPI(data)
      action.commit('GET_SEARCH_RESULT_MUTATION', res.data.data)
    }
  },
  getters: {},
  modules: {}
}
