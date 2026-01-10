<template>
  <div class="admin-about-sections">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Quản lý giới thiệu</h1>
      <button @click="openCreateModal" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Thêm section mới
      </button>
    </div>

    <AboutSectionsFilter
      :initial-filters="filters"
      @update:filters="handleFilterUpdate"
    />

    <div class="bg-white shadow-md rounded-lg overflow-hidden mt-4">
      <SkeletonLoader v-if="loading" type="table" :rows="5" :columns="6" />
      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in items" :key="item.id">
            <td class="px-6 py-4 text-sm text-gray-500">{{ getSerialNumber(index) }}</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ item.title }}</td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ getSectionTypeLabel(item.section_type) }}</td>
            <td class="px-6 py-4 text-sm">
              <span :class="item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                    class="px-2 py-1 text-xs font-semibold rounded-full">
                {{ item.status === 'active' ? 'Hoạt động' : 'Không hoạt động' }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm font-medium">
              <Actions :item="item" @edit="openEditModal" :show-view="false" :show-delete="false"
                :additional-actions="[{ label: 'Xóa', action: () => confirmDelete(item), icon: 'trash' }]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination
      v-if="hasData"
      :current-page="pagination.page"
      :total-pages="pagination.totalPages"
      :total-items="pagination.totalItems"
      @page-change="handlePageChange"
    />

    <CreateAboutSection
      v-if="modals.create"
      :show="modals.create"
      :api-errors="apiErrors"
      @close="closeCreateModal"
      @created="handleCreated"
    />

    <EditAboutSection
      v-if="modals.edit"
      :show="modals.edit"
      :section="selectedItem"
      :api-errors="apiErrors"
      @close="closeEditModal"
      @updated="handleUpdated"
    />

    <ConfirmModal
      v-if="modals.delete"
      :show="modals.delete"
      title="Xác nhận xóa"
      :message="`Bạn có chắc chắn muốn xóa ${selectedItem?.title || ''}?`"
      @close="closeDeleteModal"
      @confirm="deleteItem"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminListPage } from '@/composables/admin/useAdminListPage'
import { adminEndpoints } from '@/api/endpoints'
import { getAboutSectionTypeLabel } from '@/shared/enums'
import SkeletonLoader from '@/components/Core/Loading/SkeletonLoader.vue'
import ConfirmModal from '@/components/Core/Modal/ConfirmModal.vue'
import Actions from '@/components/Core/Actions/Actions.vue'
import Pagination from '@/components/Core/Navigation/Pagination.vue'
import AboutSectionsFilter from './AboutSectionsFilter.vue'
import CreateAboutSection from './CreateAboutSection.vue'
import EditAboutSection from './EditAboutSection.vue'

const {
  items, loading, pagination, filters, apiErrors, hasData, modals, selectedItem,
  openCreateModal, closeCreateModal, openEditModal, closeEditModal, confirmDelete, closeDeleteModal,
  updateFilters, changePage, handleCreate, handleUpdate, handleDelete, getSerialNumber
} = useAdminListPage({
  endpoints: {
    list: adminEndpoints.aboutSections.list,
    create: adminEndpoints.aboutSections.create,
    update: (id) => adminEndpoints.aboutSections.update(id),
    delete: (id) => adminEndpoints.aboutSections.delete(id),
    show: (id) => adminEndpoints.aboutSections.show(id)
  },
  messages: {
    createSuccess: 'Đã tạo thành công',
    updateSuccess: 'Đã cập nhật thành công',
    deleteSuccess: 'Đã xóa thành công'
  },
  fetchDetailBeforeEdit: true
})

function handleFilterUpdate(newFilters) {
  updateFilters(newFilters)
}

function handleCreated(data) {
  handleCreate(data)
}

function handleUpdated(data) {
  if (!selectedItem.value) return
  handleUpdate(selectedItem.value.id, data)
}

function deleteItem() {
  if (!selectedItem.value) return
  handleDelete(selectedItem.value.id)
}

function handlePageChange(page) {
  changePage(page)
}
</script>

