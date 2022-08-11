import axios from './axios.js'

export const userLogin = ({ data }) => {
  return axios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}
