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
import { bindTokenGetter } from 'apis/http.js'

const securityStore = useSecurityStore()
const systemStore = useSystemStore()
useWindowSize()
const bus = useBus()
bus.subscribe(bus.keys.setWindowSize, console.warn)
bindTokenGetter(() => securityStore.token)
window.addEventListener('unhandledrejection', (event) => {
  console.error(event)
  event.preventDefault()
})
systemStore.$subscribe(() => systemStore.persist())
</script>
