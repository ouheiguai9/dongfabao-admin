<template>
  <div>OrderView{{ orderId }}</div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const orderId = computed(() => {
  console.warn(router)
  return router
})
</script>
