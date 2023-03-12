<template>
  <el-card shadow="never">
    <el-row v-show="add">
      <el-col :offset="6" :span="12">
        <el-form ref="refAddForm" :model="addForm" :rules="addFormRules" label-width="120px">
          <el-form-item label="客户电话" prop="customer">
            <el-input v-model="addForm.customer" placeholder="客户电话号码" />
          </el-form-item>
          <el-form-item label="律师姓名" prop="lawyer">
            <el-input v-model="addForm.lawyer" placeholder="律师姓名" />
          </el-form-item>
          <el-form-item label="评分">
            <el-input-number v-model="addForm.value" :max="5" :min="1" />
          </el-form-item>
          <el-form-item label="标签">
            <el-checkbox v-for="item in tags" :key="item.value" v-model="addForm[item.value]" :label="item.text" />
          </el-form-item>
          <el-form-item label="评价内容" prop="content">
            <el-input v-model="addForm.content" :rows="7" maxlength="250" resize="none" show-word-limit type="textarea" />
          </el-form-item>
          <el-form-item class="jc-center">
            <el-button type="primary" @click="addFakeComment">添加</el-button>
            <el-button @click="add = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div v-show="!add">
      <el-form :model="queryForm" class="condition-form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="客户">
              <el-input v-model="queryForm.customer" clearable placeholder="客户电话号码" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="律师">
              <el-input v-model="queryForm.lawyer" clearable placeholder="律师姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签">
              <el-select v-model="queryForm.label" clearable collapse-tags multiple placeholder="评价标签">
                <el-option v-for="item in tags" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="评分">
              <el-select v-model="queryForm.value" clearable collapse-tags multiple placeholder="评价评分">
                <el-option label="1星" value="1" />
                <el-option label="2星" value="2" />
                <el-option label="3星" value="3" />
                <el-option label="4星" value="4" />
                <el-option label="5星" value="5" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="显示">
              <el-select v-model="queryForm.visible" clearable placeholder="评价是否展示">
                <el-option label="是" value="true" />
                <el-option label="否" value="false" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间">
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
          <el-col :span="6">
            <el-form-item class="button-group">
              <el-button type="primary" @click="doQuery">查询</el-button>
              <el-button @click="add = true">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" :row-class-name="rowClassName" border stripe>
        <el-table-column fixed header-align="center" label="订单编号" width="120">
          <template #default="scope">
            <el-link type="primary" @click="goToOrder(scope.row)">
              {{ scope.row.orderId }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed header-align="center" label="客户" prop="customer" width="120" />
        <el-table-column fixed label="律师" header-align="center" prop="lawyer" width="120" />
        <el-table-column align="center" header-align="center" label="评分" width="160">
          <template #default="scope">
            <el-rate v-model="scope.row.value" disabled size="small" />
          </template>
        </el-table-column>
        <el-table-column label="标签" header-align="center" width="470">
          <template #default="scope">
            <el-tag v-for="item in tags" v-show="scope.row[item.value]" :key="item.value" class="comment-tag" effect="light" round size="small">
              {{ item.text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="内容" header-align="center" prop="content" show-overflow-tooltip width="600" />
        <el-table-column align="center" header-align="center" label="时间" prop="createTime" width="180" />
        <el-table-column align="center" fixed="right" header-align="center" label="操作" width="90">
          <template #default="scope">
            <el-button size="small" type="danger" @click="handleVisible(scope.row)">
              {{ scope.row.visible ? '隐藏' : '显示' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pure-pagination :page="pager.page" :size="pager.size" :total-elements="pager.totalElements" @change="search()"></pure-pagination>
    </div>
  </el-card>
</template>

<script setup>
import { apiAddFakeComment, apiGetCommentList, apiUpdateCommentVisible } from 'apis/business.js'
import { inject, onBeforeMount, reactive, ref, toRaw } from 'vue'
import PurePagination from 'components/pure/PurePagination.vue'
import { useRouter } from 'vue-router'

const feedback = inject('feedback')
const router = useRouter()
const add = ref(false)
const refAddForm = ref()
const addFormRules = reactive({
  customer: [{ required: true, message: '请输入客户电话号码', trigger: 'blur' }],
  lawyer: [{ required: true, message: '请输入律师姓名', trigger: 'blur' }],
  content: [{ required: true, message: '请输入评价内容', trigger: 'blur' }],
})
const queryForm = reactive({
  customer: null,
  lawyer: null,
  label: [],
  value: [],
  visible: null,
  createTime: [],
})
const addForm = reactive({
  customer: null,
  lawyer: null,
  label1: null,
  label2: null,
  label3: null,
  label4: null,
  label5: null,
  label6: null,
  value: 1,
  content: null,
})
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
const copyQueryParam = {}
function doQuery() {
  pager.page = 0
  Object.assign(copyQueryParam, toRaw(queryForm))
  search()
}

function search() {
  const params = Object.assign({ page: pager.page, size: pager.size }, copyQueryParam)
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

function addFakeComment() {
  refAddForm.value.validate((valid) => {
    if (valid) {
      feedback.showAppLoading()
      apiAddFakeComment(toRaw(addForm))
        .then(() => {
          add.value = false
          search()
        })
        .finally(() => feedback.closeAppLoading())
    } else {
      return false
    }
  })
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

onBeforeMount(() => {
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

.jc-center > ::v-deep(.el-form-item__content) {
  justify-content: center;
}
</style>
