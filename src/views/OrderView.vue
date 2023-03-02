<template>
  <div>OrderView{{ orderId }}</div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const orderId = ref(router.currentRoute.value.query.orderId)
</script>
