<template>
  <el-dropdown @command="onCommand">
    <span class="user-info">
      <el-avatar :icon="UserFilled" />
      <span :title="securityStore.getLoginUserName" class="txt-username"> &nbsp;{{ securityStore.getLoginUserName }} </span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="User" command="profile">个人中心</el-dropdown-item>
        <el-dropdown-item :icon="Tools" command="config">系统设置</el-dropdown-item>
        <el-dropdown-item :icon="SwitchButton" command="logout" divided style="color: var(--el-color-danger)">安全退出 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { SwitchButton, Tools, User, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import useSecurityStore from 'stores/security.js'
import { inject } from 'vue'

const router = useRouter()
const securityStore = useSecurityStore()
const feedback = inject('feedback')

function onCommand(command) {
  if (command === 'logout') {
    feedback
      .showConfirm('确定退出系统')
      .then(() => {
        feedback.showAppLoading()
        securityStore
          .logout()
          .then(() => {
            router.push({ name: 'Home' })
          })
          .finally(() => {
            feedback.closeAppLoading()
          })
      })
      .catch(() => {})
  } else if (command === 'profile') {
    router.push({ name: 'Profile' })
  } else {
    feedback.showTodoMessage()
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.el-avatar--circle {
  --el-avatar-size: var(--layout-icon-size);
}

.txt-username {
  max-width: 70px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
