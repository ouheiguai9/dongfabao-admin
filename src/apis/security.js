import { defaultClient, headerTokenKey } from 'apis/http.js'

export const login = (username, password) => {
  return defaultClient.post('/api/login', { username, password })
}

export const getAuthentication = (token) => {
  const conf = {
    headers: {},
  }
  conf.headers[headerTokenKey] = token
  return defaultClient.get('/security/authentication', conf)
}
