<template>
  <div class="no-auth-container">
    <el-card v-if="showLoginCard" class="login-card">
      <template #header>
        <div class="login-card-title">{{ appTitle }}</div>
      </template>
      <el-form ref="refLoginForm" :model="form.login" :rules="loginFormRules" size="large">
        <el-form-item prop="username">
          <el-input v-model="form.login.username" :prefix-icon="User" clearable placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.login.password" :prefix-icon="Lock" clearable placeholder="请输入密码" show-password />
        </el-form-item>
        <div class="btn-box">
          <el-button :loading="loginPending" type="primary" @click="onLogin">登录</el-button>
          <el-button @click="goToRegister">注册</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card v-else>
      <el-button type="primary" @click="goToLogin">注册</el-button>
    </el-card>
    <web-copyright class="no-auth-web-copyright" />
  </div>
</template>

<script setup>
import { inject, reactive, ref } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import useSystemStore from 'stores/system.js'
import useSecurityStore from 'stores/security.js'
import WebCopyright from 'components/WebCopyright.vue'

const appTitle = import.meta.env.VITE_APP_TITLE
const feedback = inject('feedback')
const systemStore = useSystemStore()
const securityStore = useSecurityStore()
const refLoginForm = ref()
const showLoginCard = ref(true)
const loginPending = ref(false)
const form = ref({
  login: {
    username: '',
    password: '',
  },
})
const loginFormRules = reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
})

function goToRegister() {
  if (systemStore.openRegistration) {
    showLoginCard.value = false
  } else {
    feedback.showWarnMessage('系统暂不对外开放注册')
  }
}

function goToLogin() {
  showLoginCard.value = true
}

function onLogin() {
  refLoginForm.value.validate((isValid) => {
    if (isValid) {
      loginPending.value = true
      securityStore.login('M' + form.value.login.username, form.value.login.password).finally(() => (loginPending.value = false))
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
.no-auth-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  &:before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 235px;
    height: 88px;
    margin-top: -400px;
    background-image: url('assets/logo.svg');
    background-size: contain;
  }

  .login-card {
    width: 400px;
    font-size: var(--el-font-size-extra-large);
    flex: none;

    .login-card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--el-color-primary);
    }

    .btn-box {
      width: 100%;
      text-align: center;
    }
  }

  .no-auth-web-copyright {
    position: fixed;
    bottom: 50px;
  }
}
</style>
