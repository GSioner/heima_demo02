import theAxios from 'axios'
import { getToken, setToken } from '@/utils/Token.js'
import router from '@/router'
// import JSONbig from 'json-bigint'

const newsAxios = theAxios.create({
  baseURL: 'http://geek.itheima.net',
  timeout: 60000
  // transformResponse: [
  //   function (data) {
  //     try {
  //       return JSONbig.parse(data)
  //     } catch (err) {
  //       return JSON.parse(data)
  //     }
  //   }
  // ]
})

// 添加请求拦截器
newsAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = `Bearer ${getToken('heima_Token')}`
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
  async function (error) {
    if (error.response.status === 401) {
      try {
        const res = await theAxios({
          url: 'http://geek.itheima.net/v1_0/authorizations',
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${getToken('heima_reToken')}`
          }
        })
        setToken('heima_Token', res.data.data.token)
        return newsAxios(error.config)
      } catch (err) {
        router.push('/login')
      }
    } else {
      return Promise.reject(error)
    }
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
    data: method === 'GET' ? {} : data,
    params: method === 'GET' ? data : {},
    headers
  })
}
