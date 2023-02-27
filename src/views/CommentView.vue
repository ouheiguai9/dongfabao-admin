<template>
  <el-card shadow="never">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column label="订单编号" prop="orderId" />
      <el-table-column align="center" header-align="center" label="客户信息" prop="customer" />
      <el-table-column label="律师信息" prop="lawyer" />
      <el-table-column align="center" header-align="center" label="评分" prop="value" width="80" />
      <el-table-column label="内容" min-width="200" prop="content" show-overflow-tooltip />
      <el-table-column align="center" header-align="center" label="评论时间" prop="createTime" width="180" />
      <el-table-column align="center" header-align="center" label="操作" width="90">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleVisible(scope.$index, scope.row)">
            {{ scope.row.visible ? '隐藏' : '显示' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pure-pagination :page="pager.page" :size="pager.size" :total-elements="pager.totalElements" @change="onPaginationChange"></pure-pagination>
  </el-card>
</template>

<script setup>
import { apiGetCommentList } from 'apis/business.js'
import { onMounted, reactive, ref } from 'vue'
import PurePagination from 'components/pure/PurePagination.vue'

const pager = reactive({
  page: 0,
  size: 20,
  totalElements: 0,
})
const tableData = ref([])
function search(params) {
  apiGetCommentList(params).then(({ data }) => {
    pager.totalElements = data.totalElements || 0
    tableData.value = data.content || []
  })
}

function handleVisible(index, row) {
  console.warn(index, row)
}

function onPaginationChange(pageParams) {
  search(pageParams)
}

onMounted(() => {
  search()
})
</script>
