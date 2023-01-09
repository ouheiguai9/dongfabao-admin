import { defaultClient, headerTokenKey } from 'apis/http.js'

export const login = (username, password) => {
  return defaultClient.post('/api/login', null, {
    headers: {
      _auth_type_key_: 'standard',
      userType: 'phone',
      tenantId: import.meta.env.VITE_TENANT_ID,
      user: username,
      pass: password,
    },
  })
}

export const logout = () => {
  return defaultClient.post('logout')
}

export const getAuthentication = (token) => {
  const conf = {
    headers: {},
  }
  conf.headers[headerTokenKey] = token
  return defaultClient.get('/authorizations/me', conf)
}
