import axios from 'axios'
const HEADER_TOKEN_KEY = 'X-Auth-Token'

function HttpFactory(config = {}) {
  this.options = { ...config }
}

HttpFactory.prototype.create = function (config) {
  const instance = axios.create({ ...this.options, ...config })
  instance.interceptors.request.use((conf) => {
    if (!conf.headers[HEADER_TOKEN_KEY]) {
      conf.headers[HEADER_TOKEN_KEY] = this.tokenGetter()
    }
    return conf
  })
  return instance
}

HttpFactory.prototype.tokenGetter = () => ''

export const headerTokenKey = HEADER_TOKEN_KEY

export const isHttpError = axios.isAxiosError

export const isCancelError = axios.isCancel

export const isNetworkError = function (error) {
  return axios.isAxiosError(error) && error.code === 'ERR_NETWORK'
}

export const bindTokenGetter = (getter) => {
  if (getter && typeof getter === 'function') {
    HttpFactory.prototype.tokenGetter = getter
  }
}

export const useHttpFactory = new HttpFactory({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
})

export const defaultClient = useHttpFactory.create()
