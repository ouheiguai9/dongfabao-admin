import { defaultClient } from 'apis/http.js'

const businessPrefix = import.meta.env.VITE_BUSINESS_API_BASE_URL
export const apiGetCommentList = ({ page = 0, size = 20, ...params } = {}) => {
  return defaultClient.get(`${businessPrefix}/orders/comments`, {
    params: Object.assign({ page, size }, params),
  })
}

export const apiUpdateCommentVisible = (id, visible) => {
  return defaultClient.post(`${businessPrefix}/orders/comments/visible/${id}/${visible}`)
}
