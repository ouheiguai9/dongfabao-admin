<template>
  <div>
    <el-button @click="onClick">测试</el-button>
  </div>
</template>
<script setup>
import useSystemStore from 'stores/system.js'

const systemStore = useSystemStore()

function onClick() {
  systemStore.$patch({
    size: 'large',
    zIndex: 2000,
  })
}
</script>
