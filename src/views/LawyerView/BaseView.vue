<template>
  <section v-if="lawyer !== null">
    <el-form ref="refEditForm" :model="lawyer" :rules="editFormRules" label-width="120px">
      <el-row>
        <el-col :offset="3" :span="8">
          <el-form-item label="律师电话">
            <el-input v-model="lawyer.phone" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="3" :span="8">
          <el-form-item label="律师姓名" prop="name">
            <el-input v-model="lawyer.name" placeholder="律师姓名" />
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="8">
          <el-form-item label="身份证号" prop="certificate">
            <el-input v-model="lawyer.certificate" placeholder="身份证号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="3" :span="8">
          <el-form-item label="执业证号" prop="lawId">
            <el-input v-model="lawyer.lawId" placeholder="执业证号" />
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="8">
          <el-form-item label="执业律所" prop="lawFirm">
            <el-input v-model="lawyer.lawFirm" placeholder="执业律所" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-form-item label="擅长领域">
            <el-checkbox v-for="item in skillItemList" :key="item.value" v-model="lawyer[item.value]" :label="item.text" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="3" :span="8">
          <el-form-item label="银行卡号">
            <el-input v-model="lawyer.bankId" placeholder="银行卡号" />
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="8">
          <el-form-item label="开户银行">
            <el-input v-model="lawyer.bank" placeholder="开户银行" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="3" :span="8">
          <el-form-item label="律师状态">
            <el-input v-model="lawyer.stateText" disabled />
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="8">
          <el-form-item label="注册时间">
            <el-input v-model="lawyer.createTime" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="3" :span="8">
          <el-form-item label="是否兜底">
            <el-switch v-model="lawyer.backup" active-text="是" inactive-text="否" disabled />
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="8">
          <el-form-item label="是否禁用">
            <el-switch v-model="lawyer.locked" active-text="是" inactive-text="否" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="3" :span="18" class="center-content">
          <el-button type="primary" @click="saveLawyer">保存</el-button>
          <el-button @click="lawyer = null">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </section>
  <section v-else>
    <el-form :model="queryForm" class="condition-form">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="律师电话">
            <el-input v-model="queryForm.name" clearable placeholder="律师电话" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="律师姓名">
            <el-input v-model="queryForm.phone" clearable placeholder="律师姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="律师状态">
            <el-select v-model="queryForm.state" clearable collapse-tags multiple placeholder="律师状态">
              <el-option v-for="item in stateList" :key="item.key" :label="item.value" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="擅长领域">
            <el-select v-model="queryForm.key" clearable collapse-tags multiple placeholder="擅长领域">
              <el-option :label="item.text" :value="item.value" :key="item.value" v-for="item in skillItemList" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="queryForm.createTime"
              :unlink-panels="true"
              end-placeholder="结束时间"
              range-separator="至"
              start-placeholder="开始时间"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :offset="6" :span="6">
          <el-form-item class="button-group">
            <el-button type="primary" @click="doQuery">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" :row-class-name="rowClassName" border stripe>
      <el-table-column fixed header-align="center" label="律师电话" width="120">
        <template #default="scope">
          <el-link type="primary" @click=";(row = scope.row), (lawyer = Object.assign({}, row))">
            {{ scope.row.phone }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed header-align="center" label="律师姓名" prop="name" width="120" />
      <el-table-column align="center" fixed header-align="center" label="律师状态" width="120">
        <template #default="scope">
          <el-tag size="small" :type="isApproved(scope.row.state) ? 'success' : 'danger'">
            {{ scope.row.stateText }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="时间" prop="createTime" width="180" />
      <el-table-column align="center" header-align="center" label="身份证号" prop="certificate" width="200" />
      <el-table-column align="center" header-align="center" label="执业证号" prop="lawId" width="200" />
      <el-table-column header-align="center" label="执业律所" prop="lawFirm" show-overflow-tooltip width="200" />
      <el-table-column header-align="center" label="开户银行" prop="bank" show-overflow-tooltip width="200" />
      <el-table-column header-align="center" label="银行卡号" prop="bankId" width="200" />
      <el-table-column label="擅长领域" header-align="center" width="640">
        <template #default="scope">
          <el-tag v-for="item in skillItemList" v-show="scope.row[item.value]" :key="item.value" effect="light" class="skill-tag" round size="small">
            {{ item.text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="180">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleLocked(scope.row)" v-if="isApproved(scope.row.state) && !scope.row.backup">
            {{ scope.row.locked ? '启用' : '禁用' }}
          </el-button>
          <el-button size="small" type="danger" @click="handleBackup(scope.row)" v-if="isApproved(scope.row.state) && !scope.row.locked">
            {{ scope.row.backup ? '取消兜底' : '设为兜底' }}
          </el-button>
          <el-button size="small" type="danger" @click="handleApprove(scope.row, 'APPROVED')" v-if="'NOT_APPROVED' === scope.row.state"
            >通过
          </el-button>
          <el-button size="small" type="danger" @click="handleApprove(scope.row, 'REJECTED')" v-if="'NOT_APPROVED' === scope.row.state"
            >拒绝
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pure-pagination :page="pager.page" :size="pager.size" :total-elements="pager.totalElements" @change="search()"></pure-pagination>
  </section>
</template>

<script setup>
import { inject, onBeforeMount, reactive, ref, toRaw } from 'vue'
import {
  apiApproveLawyer,
  apiGetLawyerList,
  apiGetLawyerStateList,
  apiUpdateLawyerBackup,
  apiUpdateLawyerLocked,
  apiUpdateLawyer,
} from 'apis/business.js'
import PurePagination from 'components/pure/PurePagination.vue'

const feedback = inject('feedback')
const refEditForm = ref(null)
const row = ref(null)
const lawyer = ref(null)
const stateList = ref([])
const skillItemList = [
  {
    text: '婚姻财产',
    value: 'key1',
  },
  {
    text: '经济纠纷',
    value: 'key2',
  },
  {
    text: '交通事故',
    value: 'key3',
  },
  {
    text: '房产土地',
    value: 'key4',
  },
  {
    text: '合同纠纷',
    value: 'key5',
  },
  {
    text: '劳动就业',
    value: 'key6',
  },
  {
    text: '刑事案件',
    value: 'key7',
  },
  {
    text: '公司股权',
    value: 'key8',
  },
  {
    text: '其他咨询',
    value: 'key9',
  },
]
const queryForm = reactive({
  name: null,
  phone: null,
  state: [],
  key: [],
  createTime: [],
})
const editFormRules = reactive({
  name: [{ required: true, message: '请输入律师姓名', trigger: 'blur' }],
  certificate: [{ required: true, message: '请输入律师身份证号', trigger: 'blur' }],
  lawId: [{ required: true, message: '请输入执业证号', trigger: 'blur' }],
  lawFirm: [{ required: true, message: '请输入执业律所', trigger: 'blur' }],
})
const pager = reactive({
  page: 0,
  size: 20,
  totalElements: 0,
})
const tableData = ref([])
const copyQueryParam = {}

function doQuery() {
  pager.page = 0
  Object.assign(copyQueryParam, JSON.parse(JSON.stringify(toRaw(queryForm))))
  search()
}

function search() {
  const params = Object.assign({ page: pager.page, size: pager.size }, copyQueryParam)
  feedback.showAppLoading()
  apiGetLawyerList(params)
    .then(({ data }) => {
      pager.totalElements = data.totalElements || 0
      tableData.value = data.content || []
    })
    .finally(() => feedback.closeAppLoading())
}

function handleLocked(lawyer) {
  feedback.showAppLoading()
  apiUpdateLawyerLocked(lawyer.id, !lawyer.locked)
    .then(({ data }) => {
      lawyer.locked = !lawyer.locked
    })
    .finally(() => feedback.closeAppLoading())
}

function handleBackup(lawyer) {
  feedback.showAppLoading()
  apiUpdateLawyerBackup(lawyer.id, !lawyer.backup)
    .then(({ data }) => {
      lawyer.backup = !lawyer.backup
    })
    .finally(() => feedback.closeAppLoading())
}

function handleApprove(lawyer, action) {
  feedback.showAppLoading()
  apiApproveLawyer(lawyer.id, action)
    .then(({ data }) => {
      lawyer.state = data.state
      lawyer.stateText = data.stateText
    })
    .finally(() => feedback.closeAppLoading())
}

function rowClassName({ row }) {
  if (row.locked) {
    return 'locked-row'
  }
  return ''
}

function isApproved(state) {
  return 'CREATED|NOT_APPROVED'.indexOf(state) === -1
}

function saveLawyer() {
  refEditForm.value.validate((valid) => {
    if (valid) {
      feedback.showAppLoading()
      apiUpdateLawyer(lawyer.value)
        .then(({ data }) => {
          Object.assign(row.value, data)
          feedback.showSuccessMessage()
        })
        .finally(() => feedback.closeAppLoading())
    } else {
      return false
    }
  })
}

onBeforeMount(() => {
  apiGetLawyerStateList().then(({ data }) => (stateList.value = data))
  search()
})
</script>

<style scoped>
::v-deep(.locked-row) {
  text-decoration: line-through;
}

.skill-tag {
  margin-right: 4px;
}
</style>
