import { defaultClient } from 'apis/http.js'

export const login = (username, password) => {
  return defaultClient.post('/api/login', { username, password })
}

export const logout = () => {
  return defaultClient.post('logout')
}

export const getAuthentication = () => {
  return defaultClient.get('/security/authentication')
}
