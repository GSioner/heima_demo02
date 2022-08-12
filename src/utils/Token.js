export const setToken = (token, data) => {
  return localStorage.setItem(token, data)
}

export const getToken = (token) => {
  return localStorage.getItem(token)
}

export const removeToken = (token) => {
  return localStorage.removeItem(token)
}
