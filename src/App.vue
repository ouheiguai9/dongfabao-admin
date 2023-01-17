<template>
  <suspense>
    <app-layout />
    <template #fallback>
      <div></div>
    </template>
  </suspense>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, provide } from 'vue'
import useBus from 'composables/bus'
import useWindowSize from 'composables/window-size'
import useFeedback from 'composables/feedback.js'
import AppLayout from 'components/AppLayout.vue'
import useSecurityStore from 'stores/security'
import useSystemStore from 'stores/system'
import useBusStore from 'stores/bus.js'
import { bindTokenGetter, isHttpError, isNetworkError } from 'apis/http.js'

const securityStore = useSecurityStore()
const systemStore = useSystemStore()
const busStore = useBusStore()
const bus = useBus()
const feedback = useFeedback()
useWindowSize()

bus.subscribe(bus.keys.setLastMessage, feedback.message)
bindTokenGetter(() => securityStore.token)

const rejectionHandler = (event) => {
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
}

onBeforeMount(() => {
  window.addEventListener('unhandledrejection', rejectionHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('unhandledrejection', rejectionHandler)
})

provide('successfulCallback', () => {
  busStore.setLastMessage({ type: 'success', message: systemStore.lang('app.notice.operate-success') })
})

systemStore.$subscribe(() => systemStore.persist())
</script>
