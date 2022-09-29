import { defineStore } from 'pinia'
import i18n from './i18n'
const id = 'system'
const defaultLanguage = 'zhCn'

export default defineStore(id, {
  state() {
    return Object.assign(
      {
        //当前使用的语言，默认zhCn
        language: defaultLanguage,
        openRegistration: false,
      },
      JSON.parse(localStorage.getItem(import.meta.env.VITE_STORAGE_KEY_PREFIX + id))
    )
  },
  getters: {
    getLanguageContext(state) {
      return i18n[state.language] || i18n[defaultLanguage]
    },
    getLanguageOptions() {
      return Object.keys(i18n).map((key) => {
        return { text: i18n[key].desc, value: key }
      })
    },
    getElementLocale() {
      return this.getLanguageContext.element
    },
  },
  actions: {
    lang(key, context) {
      if (!key || typeof key !== 'string') return ''
      const template = key.split('.').reduce((obj, attr) => {
        if (obj) return obj[attr]
      }, this.getLanguageContext)
      if (!template) return key
      return template.replace(/{(\w+)}/g, (match, attr) => context[attr])
    },
    persist() {
      localStorage.setItem(import.meta.env.VITE_STORAGE_KEY_PREFIX + id, JSON.stringify(this.$state))
    },
  },
})
