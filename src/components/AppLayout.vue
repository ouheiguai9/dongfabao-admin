<template>
  <el-config-provider :locale="zhCn" :size="systemStore.size" :z-index="systemStore.zIndex">
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
import useSystemStore from 'stores/system.js'
import useSecurityStore from 'stores/security.js'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useRoute, useRouter } from 'vue-router'
import { computed, inject } from 'vue'

const layoutMap = {
  LayoutLeft,
}
const feedback = inject('feedback')
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
  feedback.showErrorMessage('凭证已过期,请重新登录')
}
</script>
