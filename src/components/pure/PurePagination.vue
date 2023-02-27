<template>
  <div v-if="totalElements > 0" class="pure-pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="currentSize"
      :background="true"
      :page-sizes="pageSizes"
      :total="totalElements"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['change'])
const props = defineProps({
  pageSizes: {
    type: Array,
    default: () => [20, 50, 100],
  },
  totalElements: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: 20,
  },
})
const currentPage = ref(props.page)
const currentSize = ref(props.size)
watch(
  () => {
    return {
      size: currentSize.value,
      page: currentPage.value,
    }
  },
  (newVal) => {
    emit('change', newVal)
  }
)
</script>
<style scoped>
.pure-pagination {
  display: flex;
  justify-content: right;
  margin-top: var(--layout-main-padding);
}
</style>
