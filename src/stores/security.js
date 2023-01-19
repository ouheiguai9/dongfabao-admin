import { defineStore } from 'pinia'
import { apiGetAuthentication, apiLogin, apiLogout } from 'apis/security.js'

const id = 'security'
const tokenKey = `${import.meta.env.VITE_STORAGE_KEY_PREFIX}${id}_token`
export default defineStore(id, {
  state() {
    const token = localStorage.getItem(tokenKey)
    return {
      token,
      user: null,
    }
  },
  getters: {
    getLoginUserName() {
      const user = this.user || {}
      return user.name || ''
    },
  },
  actions: {
    async resetToken(token) {
      let updated = false
      if (token && token !== this.token) {
        this.token = token
        updated = true
      }
      if (!this.token) return
      try {
        const response = await apiGetAuthentication()
        this.user = response.data
        if (updated) {
          localStorage.setItem(tokenKey, this.token)
          console.warn('token update to ', this.token)
        }
      } catch (e) {
        this.token = null
        this.user = null
        throw e
      }
    },
    refreshUserInfo() {
      if (!this.token) return
      apiGetAuthentication().then(({ data }) => (this.user = data))
    },
    login(username, password) {
      return apiLogin(username, password).then(({ headers, data }) => {
        this.token = headers['x-auth-token']
        this.user = data
        localStorage.setItem(tokenKey, this.token)
      })
    },
    logout() {
      return apiLogout().then((res) => {
        this.token = null
        this.user = null
        localStorage.removeItem(tokenKey)
        return res
      })
    },
  },
})
