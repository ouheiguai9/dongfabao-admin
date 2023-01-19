import { defaultClient } from 'apis/http.js'

export const apiLogin = (username, password) => {
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

export const apiChangePassword = (oPass, nPass) => {
  const params = new URLSearchParams()
  params.append('oPass', oPass)
  params.append('nPass', nPass)
  return defaultClient.post('/users/change/password', params)
}

export const apiChangeUserInfo = (user) => defaultClient.patch('/users/me', user)

export const apiLogout = () => defaultClient.post('logout')

export const apiGetAuthentication = () => defaultClient.get('/authorizations/me')

export const apiGetUserInfo = () => defaultClient.get('/users/me')
