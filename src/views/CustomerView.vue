<template>
  <el-card shadow="never">
    <el-form :model="queryForm" class="condition-form">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="手机号">
            <el-input v-model="queryForm.phone" clearable placeholder="客户手机号码" />
          </el-form-item>
        </el-col>
        <el-col :offset="12" :span="6">
          <el-form-item class="button-group">
            <el-button type="primary" @click="doQuery">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border stripe>
      <el-table-column align="center" header-align="center" label="手机号" prop="phone" />
      <el-table-column align="center" header-align="center" label="注册日期" prop="createTime" />
      <el-table-column label="最后订单号" header-align="center">
        <template #default="scope">
          <el-link type="primary" @click="goToOrder(scope.row)">
            {{ scope.row.lastOrderId }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column align="right" header-align="center" label="最后订单金额" prop="lastOrderFee" />
      <el-table-column align="center" header-align="center" label="最后订单时间" prop="lastOrderTime" />
      <el-table-column label="最后订单状态" header-align="center" prop="lastOrderState" />
    </el-table>
    <pure-pagination :page="pager.page" :size="pager.size" :total-elements="pager.totalElements" @change="search()"></pure-pagination>
  </el-card>
</template>
<script setup>
import { inject, onBeforeMount, reactive, ref, toRaw } from 'vue'
import { apiGetCustomerList } from 'apis/business.js'
import PurePagination from 'components/pure/PurePagination.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const feedback = inject('feedback')
const queryForm = reactive({
  phone: null,
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
  Object.assign(copyQueryParam, toRaw(queryForm))
  search()
}

function search() {
  const params = Object.assign({ page: pager.page, size: pager.size }, copyQueryParam)
  feedback.showAppLoading()
  apiGetCustomerList(params)
    .then(({ data }) => {
      pager.totalElements = data.totalElements || 0
      tableData.value = data.content || []
    })
    .finally(() => feedback.closeAppLoading())
}

function goToOrder({ lastOrderId }) {
  router.push({ name: 'Order', query: { orderId: lastOrderId } })
}

onBeforeMount(() => {
  search()
})
</script>
