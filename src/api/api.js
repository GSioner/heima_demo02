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

export const userChannle = () => {
  return requestNews({
    url: '/v1_0/user/channels'
  })
}

export const getAritcle = (data) => {
  return requestNews({
    url: '/v1_0/articles',
    data
  })
}

export const feedBack = (data) => {
  return requestNews({
    url: '/v1_0/article/dislikes',
    method: 'POST',
    data
  })
}

export const reportArticle = (data) => {
  return requestNews({
    url: '/v1_0/article/reports',
    method: 'POST',
    data
  })
}

export const getAllChannel = (data) => {
  return requestNews({
    url: '/v1_0/channels'
  })
}
