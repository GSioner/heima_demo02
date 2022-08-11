import theAxios from 'axios'

theAxios.defaults.baseURL = 'http://geek.itheima.net'
theAxios.defaults.timeout = 2000

const axios = ({ url, method = 'GET', data = {}, headers = {} }) => {
  return theAxios({
    url,
    method,
    data: method === 'POST' ? data : {},
    param: method === 'GET' ? data : {},
    headers
  })
}

export default axios
