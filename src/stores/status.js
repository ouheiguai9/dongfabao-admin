import { defineStore } from 'pinia'

const id = 'status'

export default defineStore(id, {
  state() {
    return {
      route: null,
    }
  },
  getters: {
    routeName(state) {
      return state.route === null ? 'Home' : state.route.name
    },
  },
})
