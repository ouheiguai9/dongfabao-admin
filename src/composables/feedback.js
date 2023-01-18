import { ElMessage, ElMessageBox } from 'element-plus'
import useSystemStore from 'stores/system/index.js'
import useStatusStore from 'stores/status.js'

export default function useFeedback() {
  const systemStore = useSystemStore()
  const statusStore = useStatusStore()
  return {
    showAppLoading() {
      statusStore.loadingCounter++
    },
    closeAppLoading() {
      if (statusStore.loadingCounter > 0) {
        statusStore.loadingCounter--
      }
    },
    showConfirm(title, message) {
      return ElMessageBox.confirm(systemStore.lang(title), systemStore.lang(message), { type: 'warning' })
    },
    showSuccessMessage(message) {
      if (!message) {
        message = 'app.notice.operate-success'
      }
      ElMessage({ type: 'success', message: systemStore.lang(message) })
    },
    showErrorMessage(message) {
      if (!message) {
        message = 'app.error.unknown'
      }
      ElMessage({ type: 'error', message: systemStore.lang(message) })
    },
    showWarnMessage(message) {
      ElMessage({ type: 'warning', message: systemStore.lang(message) })
    },
  }
}
