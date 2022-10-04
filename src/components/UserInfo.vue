<template>
  <el-dropdown @command="onCommand">
    <span class="user-info">
      <el-avatar :icon="UserFilled" :src="avatarUrl" />
      <span :title="username" class="txt-username">&nbsp;{{ username }}</span>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useFeedback from 'composables/feedback.js'
import useSystemStore from 'stores/system'
import useSecurityStore from 'stores/security.js'

const router = useRouter()
const systemStore = useSystemStore()
const securityStore = useSecurityStore()
const feedback = useFeedback()
const username = ref('测试用户111111')
const avatarUrl = ref('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng1.png')
const lang = systemStore.lang

function onCommand(command) {
  if (command === 'logout') {
    feedback
      .confirm(`${lang('app.notice.confirm-logout')}?`, lang('app.notice.operate-confirm'), {
        type: 'warning',
      })
      .then(() => {
        const loading = feedback.loading({
          lock: true,
        })
        securityStore
          .logout()
          .then(() => {
            router.push({ name: 'Home' })
          })
          .finally(() => {
            loading.close()
          })
      })
      .catch(() => {})
  } else {
    feedback.message({
      message: lang('app.notice.under-development'),
      type: 'warning',
    })
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
