<template>
  <el-card shadow="never">
    <el-table :data="tableData" :row-class-name="rowClassName" border stripe>
      <el-table-column fixed label="订单编号" width="120">
        <template #default="scope">
          <el-link type="primary" @click="goToOrder(scope.row)">
            {{ scope.row.orderId }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed header-align="center" label="客户" prop="customer" width="120" />
      <el-table-column fixed label="律师" prop="lawyer" width="120" />
      <el-table-column align="center" header-align="center" label="评分" width="160">
        <template #default="scope">
          <el-rate v-model="scope.row.value" disabled size="small" />
        </template>
      </el-table-column>
      <el-table-column label="标签" width="470">
        <template #default="scope">
          <el-tag v-for="item in tags" v-show="!scope.row[item.value]" :key="item.value" class="comment-tag" effect="light" round size="small">
            {{ item.text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="内容" prop="content" show-overflow-tooltip width="600" />
      <el-table-column align="center" header-align="center" label="时间" prop="createTime" width="180" />
      <el-table-column align="center" fixed="right" header-align="center" label="操作" width="90">
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleVisible(scope.row)">
            {{ scope.row.visible ? '隐藏' : '显示' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pure-pagination :page="pager.page" :size="pager.size" :total-elements="pager.totalElements" @change="onPaginationChange"></pure-pagination>
  </el-card>
</template>

<script setup>
import { apiGetCommentList, apiUpdateCommentVisible } from 'apis/business.js'
import { inject, onMounted, reactive, ref } from 'vue'
import PurePagination from 'components/pure/PurePagination.vue'
import { useRouter } from 'vue-router'

const feedback = inject('feedback')
const router = useRouter()
const tags = [
  { value: 'label1', text: '律师专业' },
  { value: 'label2', text: '服务态度好' },
  { value: 'label3', text: '挽回了损失' },
  { value: 'label4', text: '分析透彻' },
  { value: 'label5', text: '很有帮助' },
  { value: 'label6', text: '很有耐心' },
]
const pager = reactive({
  page: 0,
  size: 20,
  totalElements: 0,
})
const tableData = ref([])
function search(params) {
  feedback.showAppLoading()
  apiGetCommentList(params)
    .then(({ data }) => {
      pager.totalElements = data.totalElements || 0
      tableData.value = data.content || []
    })
    .finally(() => feedback.closeAppLoading())
}

function handleVisible(comment) {
  feedback.showAppLoading()
  apiUpdateCommentVisible(comment.id, !comment.visible)
    .then(({ data }) => {
      comment.visible = data.visible
    })
    .finally(() => feedback.closeAppLoading())
}

function onPaginationChange(pageParams) {
  search(pageParams)
}

function rowClassName({ row }) {
  if (!row.visible) {
    return 'hide-row'
  }
  return ''
}

function goToOrder({ orderId }) {
  router.push({ name: 'Order', query: { orderId } })
}

onMounted(() => {
  search()
})
</script>
<style scoped>
::v-deep(.hide-row) {
  text-decoration: line-through;
}

.comment-tag {
  margin-right: 4px;
}
</style>
