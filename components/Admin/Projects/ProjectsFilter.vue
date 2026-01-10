<template>
  <AdminFilter
    :initial-filters="initialFilters"
    :sort-options="sortOptions"
    sort-field="sort"
    search-field="search"
    search-placeholder="Tìm theo tên dự án..."
    :has-advanced-filters="true"
    @update:filters="handleUpdateFilters"
    @filter-change="handleFilterChange"
  >
    <!-- Bộ lọc nâng cao -->
    <template #advanced-filters="{ filters, onChange }">
      <!-- Bao gồm đã xóa -->
      <div>
        <SelectFilter
          v-model="filters['filters[include_deleted]']"
          :options="includeDeletedOptions"
          placeholder="Bao gồm đã xóa"
          @update:model-value="onChange"
        />
      </div>
    </template>

    <!-- Các bộ lọc chính -->
    <template #main-filters="{ filters, onChange }">
      <!-- Trạng thái -->
      <div class="min-w-[150px]">
        <SelectFilter
          v-model="filters['filters[status]']"
          :options="statusOptions"
          placeholder="Chọn trạng thái"
          @update:model-value="onChange"
        />
      </div>

      <!-- Nổi bật -->
      <div class="min-w-[150px]">
        <SelectFilter
          v-model="filters['filters[featured]']"
          :options="featuredOptions"
          placeholder="Nổi bật"
          @update:model-value="onChange"
        />
      </div>
    </template>
  </AdminFilter>
</template>

<script setup>
import { ref, computed } from 'vue'
import SelectFilter from '@/components/Core/Filter/SelectFilter.vue'
import AdminFilter from '@/components/Admin/Filter/AdminFilter.vue'
import { getProjectStatusArray } from '@/shared/enums'

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({})
  },
  statusEnums: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:filters'])

// Options for select filters
const statusOptions = computed(() => {
  const options = [{ value: '', label: 'Tất cả' }]
  const statusArray = props.statusEnums && props.statusEnums.length > 0 
    ? props.statusEnums 
    : getProjectStatusArray()
  statusArray.forEach(item => {
    options.push({
      value: item.value,
      label: item.label || item.name
    })
  })
  return options
})

const featuredOptions = [
  { value: '', label: 'Tất cả' },
  { value: 'true', label: 'Nổi bật' },
  { value: 'false', label: 'Không nổi bật' }
]

const includeDeletedOptions = [
  { value: '', label: 'Mặc định' },
  { value: 'true', label: 'Bao gồm đã xóa' },
  { value: 'false', label: 'Chỉ chưa xóa' }
]

const sortOptions = [
  { value: 'name:asc', label: 'Tên (A-Z)' },
  { value: 'name:desc', label: 'Tên (Z-A)' },
  { value: 'created_at:asc', label: 'Ngày tạo (cũ nhất)' },
  { value: 'created_at:desc', label: 'Ngày tạo (mới nhất)' },
  { value: 'sort_order:asc', label: 'Thứ tự (tăng dần)' },
  { value: 'sort_order:desc', label: 'Thứ tự (giảm dần)' }
]

// Handle filter changes
function handleFilterChange() {
  // Debounce could be added here if needed
}

// Handle update filters
function handleUpdateFilters(filters) {
  emit('update:filters', filters)
}
</script>

