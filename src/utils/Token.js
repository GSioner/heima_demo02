export const setToken = (token, data) => {
  if (typeof data === 'object') data = JSON.stringify(data)
  return localStorage.setItem(token, data)
}

export const getToken = (token) => {
  try {
    const data = localStorage.getItem(token)
    return JSON.parse(data)
  } catch (err) {
    return localStorage.getItem(token)
  }
}

export const removeToken = (token) => {
  return localStorage.removeItem(token)
}
