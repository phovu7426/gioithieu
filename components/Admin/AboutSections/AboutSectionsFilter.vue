<template>
  <AdminFilter
    :initial-filters="initialFilters"
    :sort-options="sortOptions"
    sort-field="sort"
    search-field="search"
    search-placeholder="Tìm theo tiêu đề..."
    :has-advanced-filters="true"
    @update:filters="handleUpdateFilters"
  >
    <template #main-filters="{ filters, onChange }">
      <div class="min-w-[150px]">
        <SelectFilter
          v-model="filters['filters[section_type]']"
          :options="sectionTypeOptions"
          placeholder="Loại section"
          @update:model-value="onChange"
        />
      </div>
      <div class="min-w-[150px]">
        <SelectFilter
          v-model="filters['filters[status]']"
          :options="statusOptions"
          placeholder="Trạng thái"
          @update:model-value="onChange"
        />
      </div>
    </template>
  </AdminFilter>
</template>

<script setup>
import { computed } from 'vue'
import SelectFilter from '@/components/Core/Filter/SelectFilter.vue'
import AdminFilter from '@/components/Admin/Filter/AdminFilter.vue'
import { getAboutSectionTypeArray } from '@/shared/enums'
import { getBasicStatusArray } from '@/shared/enums'

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:filters'])

const sectionTypeOptions = computed(() => {
  const options = [{ value: '', label: 'Tất cả' }]
  getAboutSectionTypeArray().forEach(item => {
    options.push({ value: item.value, label: item.label })
  })
  return options
})

const statusOptions = computed(() => {
  const options = [{ value: '', label: 'Tất cả' }]
  getBasicStatusArray().forEach(item => {
    options.push({ value: item.value, label: item.label })
  })
  return options
})

const sortOptions = [
  { value: 'title:asc', label: 'Tiêu đề (A-Z)' },
  { value: 'title:desc', label: 'Tiêu đề (Z-A)' },
  { value: 'created_at:desc', label: 'Ngày tạo (mới nhất)' },
  { value: 'sort_order:asc', label: 'Thứ tự (tăng dần)' }
]

function handleUpdateFilters(filters) {
  emit('update:filters', filters)
}
</script>

