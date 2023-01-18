import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import useSystemStore from 'stores/system/index.js'

export default function useFeedback() {
  const systemStore = useSystemStore()
  return {
    loading: ElLoading.service,
    message: ElMessage,
    confirm: ElMessageBox.confirm,
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
