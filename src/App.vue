<template>
  <div id="app-root-element" v-loading.fullscreen.lock="statusStore.showLoading">
    <suspense>
      <app-layout />
      <template #fallback>
        <div></div>
      </template>
    </suspense>
  </div>
</template>
<script setup>
import { onBeforeMount, onMounted, onBeforeUnmount, provide } from 'vue'
import useFeedback from 'composables/feedback.js'
import AppLayout from 'components/AppLayout.vue'
import useSecurityStore from 'stores/security.js'
import useSystemStore from 'stores/system/index.js'
import useStatusStore from 'stores/status.js'
import { bindTokenGetter, isHttpError, isNetworkError } from 'apis/http.js'
import utils from 'utils/index.js'

const securityStore = useSecurityStore()
const systemStore = useSystemStore()
const statusStore = useStatusStore()
const feedback = useFeedback()

bindTokenGetter(() => securityStore.token)

const onWindowResize = utils.debounce(() => {
  statusStore.resetWindowSize(document.documentElement.clientWidth, document.documentElement.clientHeight)
}, 100)

const rejectionHandler = (event) => {
  const { reason } = event
  let message = ''
  if (isHttpError(reason)) {
    if (isNetworkError(reason)) {
      message = 'app.error.network-error'
    } else {
      message = reason.response.data.message
    }
  }
  feedback.showErrorMessage(message)
  event.preventDefault()
}

onBeforeMount(() => {
  window.addEventListener('resize', onWindowResize)
  window.addEventListener('unhandledrejection', rejectionHandler)
})

onMounted(() => {
  onWindowResize()
})

onBeforeUnmount(() => {
  window.removeEventListener('unhandledrejection', rejectionHandler)
  window.removeEventListener('resize', onWindowResize)
})

provide('feedback', feedback)
systemStore.$subscribe(() => systemStore.persist())
</script>
