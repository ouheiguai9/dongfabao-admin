import { defaultClient } from 'apis/http.js'

const businessPrefix = import.meta.env.VITE_BUSINESS_API_BASE_URL
export const apiGetCustomerList = (params) => defaultClient.get(`${businessPrefix}/customers`, { params })

export const apiGetLawyerList = (params) => defaultClient.get(`${businessPrefix}/lawyers`, { params })

export const apiGetLawyerStateList = () => defaultClient.get(`${businessPrefix}/lawyers/states`)
export const apiGetCommentList = (params) => defaultClient.get(`${businessPrefix}/orders/comments`, { params })

export const apiUpdateCommentVisible = (id, visible) => defaultClient.post(`${businessPrefix}/orders/comments/visible/${id}/${visible}`)

export const apiAddFakeComment = (comment) => defaultClient.post(`${businessPrefix}/orders/comments`, comment)
