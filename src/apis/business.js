import { defaultClient } from 'apis/http.js'

const businessPrefix = import.meta.env.VITE_BUSINESS_API_BASE_URL
export const apiGetCommentList = (params) => defaultClient.get(`${businessPrefix}/orders/comments`, { params })

export const apiUpdateCommentVisible = (id, visible) => defaultClient.post(`${businessPrefix}/orders/comments/visible/${id}/${visible}`)

export const apiAddFakeComment = (comment) => defaultClient.post(`${businessPrefix}/orders/comments`, comment)
