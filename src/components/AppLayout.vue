<template>
  <el-config-provider :locale="getElementLocale()" :size="size" :z-index="zIndex">
    <router-view v-if="isAuthentication" />
    <no-auth v-else />
  </el-config-provider>
</template>

<script setup>
import NoAuth from 'components/NoAuth.vue'
import useSystemStore from 'stores/system'
import useSecurityStore from 'stores/security'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
const systemStore = useSystemStore()
const securityStore = useSecurityStore()
const { user } = toRefs(securityStore)
const route = useRoute()
const router = useRouter()
const size = ref('small')
const zIndex = ref(1000)

function getElementLocale() {
  return systemStore.getElementLocale
}
const isAuthentication = computed(() => {
  return !!user.value
})
await router.isReady()
const query = route.query || {}
try {
  await securityStore.resetToken(query.token)
} catch (error) {
  ElMessage({
    message: systemStore.lang('app.error.invalid-token'),
    type: 'error',
  })
}
</script>

<style scoped></style>
