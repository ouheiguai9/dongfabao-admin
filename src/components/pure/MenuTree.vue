<template>
  <template v-for="node in menuList">
    <el-menu-item v-if="node.component" :key="node.name" :index="prefix + node.name">
      <el-icon v-if="!prefix"><span class="icon-font" v-html="node.icon"></span></el-icon>
      <span>{{ node.title }}</span>
    </el-menu-item>
    <el-sub-menu v-else :key="node.name" :index="prefix + node.name">
      <template #title>
        <el-icon v-if="!prefix"><span class="icon-font" v-html="node.icon"></span></el-icon>
        <span>{{ node.title }}</span>
      </template>
      <menu-tree :node-list="node.children" :prefix="prefix + node.name + '-'"></menu-tree>
    </el-sub-menu>
  </template>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  nodeList: {
    type: Array,
    default: () => [],
  },
  prefix: {
    type: String,
    default: '',
  },
})
const menuList = computed(() => props.nodeList.filter((x) => !x.notMenu))
</script>
