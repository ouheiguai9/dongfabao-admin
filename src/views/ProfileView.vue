<template>
  <el-card shadow="never">
    <el-tabs v-model="tabName" :stretch="true" tab-position="left">
      <el-tab-pane label="基本信息" name="base">
        <div style="height: 300px"></div>
      </el-tab-pane>
      <el-tab-pane label="安全设置" name="secure">
        <el-row>
          <el-col :span="10">
            <el-form ref="refSecureForm" :model="secureForm" label-width="auto" status-icon>
              <el-form-item label="原密码" prop="oPass">
                <el-input v-model="secureForm.oPass" autocomplete="off" type="password" />
              </el-form-item>
              <el-form-item label="新密码" prop="nPass">
                <el-input v-model="secureForm.nPass" autocomplete="off" type="password" />
              </el-form-item>
              <el-form-item label="密码确认" prop="cPass">
                <el-input v-model="secureForm.cPass" autocomplete="off" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="changePass">确定</el-button>
                <el-button @click="resetForm(refSecureForm)">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script setup>
import { inject, reactive, ref } from 'vue'
import { changePassword } from 'apis/security.js'

const refSecureForm = ref()
const tabName = ref('base')
const feedback = inject('feedback')
const secureForm = reactive({
  oPass: '',
  nPass: '',
  cPass: '',
})

function changePass() {
  changePassword(secureForm.oPass, secureForm.nPass).then(() => feedback.showSuccessMessage())
}

function resetForm(refForm) {
  if (!refForm) return
  refForm.resetFields()
}
</script>
