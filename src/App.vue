<template>
  <suspense>
    <app-layout />
    <template #fallback><div></div></template>
  </suspense>
</template>
<script setup>
import useBus from 'composables/bus'
import useWindowSize from 'composables/window-size'
import AppLayout from 'components/AppLayout.vue'
import useSecurityStore from 'stores/security'
import useSystemStore from 'stores/system'
import useBusStore from 'stores/bus.js'
import { bindTokenGetter } from 'apis/http.js'
import { ElMessage } from 'element-plus'
import { isHttpError, isNetworkError } from 'apis/http.js'

const securityStore = useSecurityStore()
const systemStore = useSystemStore()
const busStore = useBusStore()
const bus = useBus()
useWindowSize()

bus.subscribe(bus.keys.setLastMessage, (lastMessage) => {
  ElMessage(lastMessage)
})
bindTokenGetter(() => securityStore.token)
window.addEventListener('unhandledrejection', (event) => {
  const { reason } = event
  let message = systemStore.lang('app.error.unknown')
  if (isHttpError(reason)) {
    if (isNetworkError(reason)) {
      message = systemStore.lang('app.error.network-error')
    } else {
      message = reason.response.data.message
    }
  }
  busStore.setLastMessage({ type: 'error', message })
  event.preventDefault()
})
systemStore.$subscribe(() => systemStore.persist())
</script>
