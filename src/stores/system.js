import { defineStore } from 'pinia'

const id = 'system'

export default defineStore(id, {
  state() {
    return Object.assign(
      {
        //布局
        layout: 'LayoutLeft',
        //开放注册
        openRegistration: false,
        size: 'small',
        zIndex: 1000,
      },
      JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_KEY_PREFIX + id))
    )
  },
  actions: {
    persist() {
      localStorage.setItem(import.meta.env.VITE_STORAGE_KEY_PREFIX + id, JSON.stringify(this.$state))
    },
  },
})
