export const setToken = (data) => {
  localStorage.setItem('heima_Token', data)
}

export const getToken = () => {
  localStorage.getToken('heima_Token')
}

export const removeToken = () => {
  localStorage.removeItem('heima_Token')
}
