<template>
  <div class="no-auth-container">
    <el-card v-if="showLoginCard" class="login-card">
      <template #header>
        <div class="login-card-title">
          {{ lang('app.login.title') }}
          <switch-language />
        </div>
      </template>
      <el-form ref="loginFormRef" :model="form.login" :rules="loginFormRules" size="large">
        <el-form-item prop="username">
          <el-input v-model="form.login.username" :placeholder="lang('app.login.user')" :prefix-icon="User" clearable />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.login.password" :placeholder="lang('app.login.password')" :prefix-icon="Lock" clearable show-password />
        </el-form-item>
        <div class="btn-box">
          <el-button type="primary" @click="onLogin">{{ lang('app.login.ok') }}</el-button>
          <el-button @click="goToRegister">{{ lang('app.login.register') }}</el-button>
        </div>
      </el-form>
    </el-card>
    <el-card v-else>
      <el-button type="primary" @click="goToLogin">{{ lang('app.login.ok') }}</el-button>
    </el-card>
    <web-copyright class="no-auth-web-copyright" />
  </div>
</template>

<script setup>
import { computed, reactive, ref, inject } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import SwitchLanguage from 'components/SwitchLanguage.vue'
import useSystemStore from 'stores/system/index.js'
import useSecurityStore from 'stores/security.js'
import WebCopyright from 'components/WebCopyright.vue'

const feedback = inject('feedback')
const systemStore = useSystemStore()
const securityStore = useSecurityStore()
const loginFormRef = ref(null)
const showLoginCard = ref(true)
const lang = systemStore.lang
const form = reactive({
  login: {
    username: '',
    password: '',
  },
})
const loginFormRules = computed(() => {
  return {
    username: [
      {
        required: true,
        message: lang('app.login.message.empty-username'),
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: lang('app.login.message.empty-password'),
        trigger: 'blur',
      },
    ],
  }
})

function goToRegister() {
  if (systemStore.openRegistration) {
    showLoginCard.value = false
  } else {
    feedback.showWarnMessage('app.login.message.disable-register')
  }
}

function goToLogin() {
  showLoginCard.value = true
}

function onLogin() {
  loginFormRef.value.validate((isValid) => {
    if (isValid) {
      securityStore.login('M' + form.login.username, form.login.password)
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
