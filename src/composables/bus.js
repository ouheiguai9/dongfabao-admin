import { default as useBusStore, actions } from 'stores/bus'
export default function useBus() {
  const busStore = useBusStore()
  const broadcast = new Map()
  function subscribe(key, callback = console.warn) {
    if (!key || !actions[key]) return
    if (!callback || typeof callback !== 'function') return
    broadcast.set(key, callback)
  }
  busStore.$onAction(
    ({
      name, // action 的名字
      args, // 调用这个 action 的参数
    }) => {
      const callback = broadcast.get(name)
      if (callback) {
        callback.apply(null, args)
      }
    }
  )
  return { subscribe, keys: actions }
}
