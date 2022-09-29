<template>
  <div class="web-copyright">{{ copyright }}</div>
</template>

<script setup>
const copyright = import.meta.env.VITE_COPYRIGHT_INFO
</script>
<style scoped>
.web-copyright {
  font-size: var(--el-font-size-extra-small);
  color: var(--el-text-color-disabled);
}
</style>
