<template>
  <el-card shadow="never">
    <el-tabs type="border-card" v-model="tabValue">
      <el-tab-pane label="基本信息" name="base">
        <base-view />
      </el-tab-pane>
      <el-tab-pane label="统计信息" name="stat">
        <stat-view />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script setup>
import BaseView from 'views/LawyerView/BaseView.vue'
import StatView from 'views/LawyerView/StatView.vue'
import { ref } from 'vue'
const tabValue = ref('base')
</script>
