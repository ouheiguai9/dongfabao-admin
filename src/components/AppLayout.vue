<template>
  <el-config-provider :locale="systemStore.getElementLocale" :size="systemStore.size" :z-index="systemStore.zIndex">
    <component :is="layout" v-if="isAuthentication">
      <template #main>
        <router-view />
      </template>
    </component>
    <no-auth v-else />
  </el-config-provider>
</template>

<script setup>
import NoAuth from 'components/NoAuth.vue'
import LayoutLeft from 'components/LayoutLeft.vue'
import useFeedback from 'composables/feedback.js'
import useSystemStore from 'stores/system'
import useSecurityStore from 'stores/security'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const layoutMap = {
  LayoutLeft,
}
const feedback = useFeedback()
const systemStore = useSystemStore()
const securityStore = useSecurityStore()
const route = useRoute()
const router = useRouter()

const isAuthentication = computed(() => {
  return !!securityStore.user
})

const layout = computed(() => {
  return layoutMap[systemStore.layout] || LayoutLeft
})
await router.isReady()
const query = route.query || {}
try {
  await securityStore.resetToken(query.token)
} catch (error) {
  feedback.message({
    message: systemStore.lang('app.error.invalid-token'),
    type: 'error',
  })
}
</script>
