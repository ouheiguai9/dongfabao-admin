import { ElMessage, ElMessageBox } from 'element-plus'
import useStatusStore from 'stores/status.js'

export default function useFeedback() {
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
    showConfirm(message, title) {
      if (!title) {
        title = '操作确认'
      }
      return ElMessageBox.confirm(message, title, { type: 'warning' })
    },
    showSuccessMessage(message) {
      if (!message) {
        message = '操作成功'
      }
      ElMessage({ type: 'success', message })
    },
    showErrorMessage(message) {
      if (!message) {
        message = '未知错误'
      }
      ElMessage({ type: 'error', message })
    },
    showWarnMessage(message) {
      ElMessage({ type: 'warning', message })
    },
    showTodoMessage() {
      ElMessage({ type: 'warning', message: '敬请期待' })
    },
  }
}
