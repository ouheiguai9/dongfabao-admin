import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'

export default function useFeedback() {
  return {
    loading: ElLoading.service,
    message: ElMessage,
    confirm: ElMessageBox.confirm,
  }
}
