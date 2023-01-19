<template>
  <el-card shadow="never">
    <el-row>
      <el-col :span="12">
        <el-tabs v-model="tabName" tab-position="left">
          <el-tab-pane label="基本信息" name="base">
            <el-form ref="refBaseForm" :model="baseForm" :rules="baseFormRule" label-width="80px" status-icon>
              <el-form-item label="姓名" prop="nickname">
                <el-input v-model="baseForm.nickname" clearable />
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="baseForm.phone" disabled />
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input v-model="baseForm.address" clearable />
              </el-form-item>
              <el-form-item label="创建时间" prop="createdDate">
                <el-input v-model="baseForm.createdDate" disabled />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="changeUserInfo">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="安全设置" name="secure">
            <el-form ref="refSecureForm" :model="secureForm" :rules="secureFormRule" label-width="80px" status-icon>
              <el-form-item label="原密码" prop="oPass">
                <el-input v-model="secureForm.oPass" autocomplete="off" clearable type="password" />
              </el-form-item>
              <el-form-item label="新密码" prop="nPass">
                <el-input v-model="secureForm.nPass" autocomplete="off" clearable type="password" />
              </el-form-item>
              <el-form-item label="密码确认" prop="cPass">
                <el-input v-model="secureForm.cPass" autocomplete="off" clearable type="password" />
              </el-form-item>
              <el-form-item>
                <el-button :loading="changePassPending" type="primary" @click="changePass">确定</el-button>
                <el-button @click="resetForm(refSecureForm)">清空</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-card>
</template>
<script setup>
import { inject, onBeforeMount, reactive, ref } from 'vue'
import { apiChangePassword, apiChangeUserInfo, apiGetUserInfo } from 'apis/security.js'
import useSecurityStore from 'stores/security.js'

const securityStore = useSecurityStore()
const changePassPending = ref(false)
const refBaseForm = ref()
const refSecureForm = ref()
const tabName = ref('base')
const feedback = inject('feedback')
const baseForm = ref({
  nickname: '',
  phone: '',
  address: '',
  createdDate: '',
})
const secureForm = reactive({
  oPass: '',
  nPass: '',
  cPass: '',
})

const baseFormRule = reactive({
  nickname: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
})

const secureFormRule = reactive({
  oPass: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  nPass: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  cPass: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: validCheckPass, trigger: 'blur' },
  ],
})

function validCheckPass(rule, value, callback) {
  if (value !== secureForm.nPass) {
    callback(new Error('两次输入的新密码不一致'))
  } else if (value === secureForm.oPass) {
    callback(new Error('新密码不能等于原密码'))
  } else {
    callback()
  }
}

function changeUserInfo() {
  refBaseForm.value.validate((valid) => {
    if (valid) {
      feedback.showAppLoading()
      apiChangeUserInfo(baseForm.value)
        .then(() => {
          securityStore.refreshUserInfo()
          feedback.showSuccessMessage()
        })
        .finally(feedback.closeAppLoading)
    } else {
      return false
    }
  })
}

function changePass() {
  refSecureForm.value.validate((valid) => {
    if (valid) {
      changePassPending.value = true
      apiChangePassword(secureForm.oPass, secureForm.nPass)
        .then(() => feedback.showSuccessMessage())
        .finally(() => (changePassPending.value = false))
    } else {
      return false
    }
  })
}

function resetForm(refForm) {
  if (!refForm) return
  refForm.resetFields()
}

onBeforeMount(() => {
  apiGetUserInfo().then(({ data }) => {
    data.phone = data.phone.substring(1)
    baseForm.value = data
  })
})
</script>
