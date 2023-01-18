import { defineStore } from 'pinia'

const id = 'status'

export default defineStore(id, {
  state() {
    return {
      windowSize: {
        width: 0,
        height: 0,
      },
      loadingCounter: 0,
    }
  },
  getters: {
    showLoading(state) {
      return state.loadingCounter > 0
    },
  },
  actions: {
    resetWindowSize(width, height) {
      this.windowSize = { width, height }
    },
  },
})
