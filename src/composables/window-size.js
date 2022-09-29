import utils from 'utils'
import { onMounted, onUnmounted, reactive } from 'vue'
import useBusStore from 'stores/bus'
export default function useWindowSize() {
  const busStore = useBusStore()
  const size = reactive({ width: 0, height: 0 })
  const onWindowResize = utils.debounce(() => {
    size.width = document.documentElement.clientWidth
    size.height = document.documentElement.clientHeight
    busStore.setWindowSize({ ...size })
  }, 100)

  onMounted(() => {
    onWindowResize()
    window.addEventListener('resize', onWindowResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize)
  })
  return size
}
