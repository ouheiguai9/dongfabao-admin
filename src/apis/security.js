import { defaultClient, paramsSerializer } from 'apis/http.js'

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

export const apiChangePassword = (oPass, nPass) => defaultClient.post('/users/change/password', paramsSerializer({ oPass, nPass }))

export const apiChangeUserInfo = (user) => defaultClient.patch('/users/me', user)

export const apiLogout = () => defaultClient.post('logout')

export const apiGetAuthentication = () => defaultClient.get('/authorizations/me')

export const apiGetUserInfo = () => defaultClient.get('/users/me')
