import { defineStore } from 'pinia'
import { login, getAuthentication } from 'apis/security.js'

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
  actions: {
    async resetToken(token) {
      const newToken = token || this.token
      if (!newToken) return
      try {
        const response = await getAuthentication(newToken)
        this.token = newToken
        this.user = response.data
        localStorage.setItem(tokenKey, newToken)
        console.warn('token update to ', this.token)
      } catch (e) {
        this.token = null
        this.user = null
        throw e
      }
    },
    login(username, password) {
      login(username, password).then(({ headers, data }) => {
        this.token = headers['x-auth-token']
        this.user = data
        localStorage.setItem(tokenKey, this.token)
      })
    },
  },
})
