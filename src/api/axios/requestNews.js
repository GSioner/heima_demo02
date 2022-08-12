import theAxios from 'axios'
import { getToken } from '@/utils/Token.js'

const newsAxios = theAxios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 2000
})

// 添加请求拦截器
newsAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers = {
      Authorization: `Bearer ${getToken('heima_Token')}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
newsAxios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export const requestNews = ({
  url,
  method = 'GET',
  data = {},
  headers = {}
}) => {
  return newsAxios({
    url,
    method,
    data: method === 'POST' ? data : {},
    param: method === 'GET' ? data : {},
    headers
  })
}
