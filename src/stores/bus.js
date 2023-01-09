import { defineStore } from 'pinia'
const id = 'bus'
const _actions = {
  setWindowSize({ width, height }) {
    this.windowSize = { width, height }
  },
  setLastMessage({ type, message }) {
    this.lastMessage = { type, message }
  },
}

export default defineStore(id, {
  state() {
    return {
      windowSize: {
        width: 0,
        height: 0,
      },
      lastMessage: {},
    }
  },
  actions: _actions,
})

export const actions = Object.keys(_actions).reduce((obj, action) => {
  obj[action] = action
  return obj
}, {})
