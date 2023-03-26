<template>
  <section v-if="lawyer !== null"></section>
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
    <el-table :data="tableData" border stripe>
      <el-table-column fixed header-align="center" label="律师电话" width="120">
        <template #default="scope">
          <el-link type="primary" @click="lawyer = scope.row">
            {{ scope.row.phone }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed header-align="center" label="律师姓名" prop="name" width="120" />
      <el-table-column align="center" fixed header-align="center" label="律师状态" width="120">
        <template #default="scope">
          <el-tag size="small" :type="'CREATED|NOT_APPROVED'.indexOf(scope.row.state) > -1 ? 'danger' : 'success'">{{ scope.row.stateText }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="内容" header-align="center" prop="content" show-overflow-tooltip width="600" />
      <el-table-column align="center" header-align="center" label="时间" prop="createTime" width="180" />
    </el-table>
    <pure-pagination :page="pager.page" :size="pager.size" :total-elements="pager.totalElements" @change="search()"></pure-pagination>
  </section>
</template>

<script setup>
import { inject, onBeforeMount, reactive, ref, toRaw } from 'vue'
import { apiGetLawyerList, apiGetLawyerStateList } from 'apis/business.js'

const feedback = inject('feedback')
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

onBeforeMount(() => {
  apiGetLawyerStateList().then(({ data }) => (stateList.value = data))
  search()
})
</script>

<style scoped></style>
