import { requestNews } from './axios/requestNews.js'

export const userLogin = ({ data }) => {
  return requestNews({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

export const getUserInfo = () => {
  return requestNews({
    url: '/v1_0/user'
  })
}
