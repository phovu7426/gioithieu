<template>
  <div class="admin-projects">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <button 
        @click="openCreateModal" 
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
      >
        {{ createButtonText }}
      </button>
    </div>

    <!-- Filter -->
    <slot
      name="filter"
      :filters="filters"
      :status-enums="statusEnums"
      :on-update="handleFilterUpdate"
    >
      <ProjectsFilter
        :initial-filters="filters"
        :status-enums="statusEnums"
        @update:filters="handleFilterUpdate"
      />
    </slot>

    <!-- Table -->
    <slot
      name="table"
      :items="items"
      :loading="loading"
      :get-serial-number="getSerialNumber"
      :get-status-label="getStatusLabel"
      :get-status-class="getStatusClass"
      :format-date="formatDate"
      :on-edit="openEditModal"
      :on-delete="confirmDelete"
      :on-toggle-featured="toggleFeatured"
      :on-update-status="updateStatus"
    >
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <SkeletonLoader v-if="loading" type="table" :rows="5" :columns="8" />
        <table v-else class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên dự án</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa điểm</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nổi bật</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(project, index) in items" :key="project.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ getSerialNumber(index) }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ project.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ project.location || '—' }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getStatusClass(project.status)"
                >
                  {{ getStatusLabel(project.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span v-if="project.featured" class="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Nổi bật
                </span>
                <span v-else class="text-gray-400">—</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(project.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Actions
                  :item="project"
                  :show-view="false"
                  :show-delete="false"
                  @edit="openEditModal"
                  :additional-actions="[
                    {
                      label: project.featured ? 'Bỏ nổi bật' : 'Đánh dấu nổi bật',
                      action: () => toggleFeatured(project),
                      icon: 'star'
                    },
                    {
                      label: 'Xóa',
                      action: () => confirmDelete(project),
                      icon: 'trash'
                    }
                  ]"
                />
              </td>
            </tr>
            <tr v-if="!items || items.length === 0">
              <td colspan="7" class="px-6 py-4 text-center text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </slot>

    <!-- Pagination -->
    <Pagination
      v-if="hasData"
      :current-page="pagination.page"
      :total-pages="pagination.totalPages"
      :total-items="pagination.totalItems"
      :loading="loading"
      @page-change="handlePageChange"
    />

    <!-- Create Modal -->
    <slot
      name="create-modal"
      :modals="modals"
      :status-enums="statusEnums"
      :api-errors="apiErrors"
      :on-close="closeCreateModal"
      :on-created="handleProjectCreated"
    >
      <CreateProject
        v-if="modals.create"
        :show="modals.create"
        :status-enums="statusEnums"
        :api-errors="apiErrors"
        @close="closeCreateModal"
        @created="handleProjectCreated"
      />
    </slot>

    <!-- Edit Modal -->
    <slot
      name="edit-modal"
      :modals="modals"
      :project="selectedItem"
      :status-enums="statusEnums"
      :api-errors="apiErrors"
      :on-close="closeEditModal"
      :on-updated="handleProjectUpdated"
    >
      <EditProject
        v-if="modals.edit"
        :show="modals.edit"
        :project="selectedItem"
        :status-enums="statusEnums"
        :api-errors="apiErrors"
        @close="closeEditModal"
        @updated="handleProjectUpdated"
      />
    </slot>

    <!-- Delete Modal -->
    <slot
      name="delete-modal"
      :modals="modals"
      :project="selectedItem"
      :on-close="closeDeleteModal"
      :on-confirm="deleteProject"
    >
      <ConfirmModal
        v-if="modals.delete"
        :show="modals.delete"
        title="Xác nhận xóa"
        :message="`Bạn có chắc chắn muốn xóa dự án ${selectedItem?.name || ''}?`"
        :on-close="closeDeleteModal"
        @confirm="deleteProject"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useToast } from '@/composables/ui/useToast'
import { useGlobalApiClient } from '@/composables/api'
import { useAdminListPage } from '@/composables/admin/useAdminListPage'
import { adminEndpoints } from '@/api/endpoints'
import { getProjectStatusArray, getProjectStatusLabel, getProjectStatusColor } from '@/shared/enums'
import SkeletonLoader from '@/components/Core/Loading/SkeletonLoader.vue'
import ConfirmModal from '@/components/Core/Modal/ConfirmModal.vue'
import Actions from '@/components/Core/Actions/Actions.vue'
import Pagination from '@/components/Core/Navigation/Pagination.vue'
import ProjectsFilter from './ProjectsFilter.vue'

const CreateProject = defineAsyncComponent(() => import('./CreateProject.vue'))
const EditProject = defineAsyncComponent(() => import('./EditProject.vue'))

interface Props {
  title?: string
  createButtonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Quản lý dự án',
  createButtonText: 'Thêm dự án mới'
})

const emit = defineEmits<{
  created: [project: any]
  updated: [project: any]
  deleted: [id: string | number]
}>()

const {
  items,
  loading,
  pagination,
  filters,
  apiErrors,
  hasData,
  modals,
  selectedItem,
  openCreateModal,
  closeCreateModal,
  openEditModal,
  closeEditModal,
  openDeleteModal: confirmDelete,
  closeDeleteModal,
  updateFilters,
  changePage,
  refresh,
  clearApiErrors,
  handleCreate,
  handleUpdate,
  handleDelete,
  getSerialNumber,
  showSuccess,
  showError
} = useAdminListPage({
  endpoints: {
    list: adminEndpoints.projects.list,
    create: adminEndpoints.projects.create,
    update: (id) => adminEndpoints.projects.update(id),
    delete: (id) => adminEndpoints.projects.delete(id),
    show: (id) => adminEndpoints.projects.show(id)
  },
  defaults: {
    title: props.title,
    createButtonText: props.createButtonText
  },
  messages: {
    createSuccess: 'Dự án đã được tạo thành công',
    createError: 'Không thể tạo dự án',
    updateSuccess: 'Dự án đã được cập nhật thành công',
    updateError: 'Không thể cập nhật dự án',
    deleteSuccess: 'Dự án đã được xóa thành công',
    deleteError: 'Không thể xóa dự án'
  },
  fetchDetailBeforeEdit: true,
  onCreated: (item) => emit('created', item),
  onUpdated: (item) => emit('updated', item),
  onDeleted: (id) => emit('deleted', id)
})

const { apiClient } = useGlobalApiClient()

const statusEnums = ref(getProjectStatusArray())

async function handleFilterUpdate(newFilters: any) {
  await updateFilters(newFilters)
}

async function handleProjectCreated(projectData: any) {
  await handleCreate(projectData)
}

async function handleProjectUpdated(projectData: any) {
  if (!selectedItem.value) return
  await handleUpdate(selectedItem.value.id, projectData)
}

async function deleteProject() {
  if (!selectedItem.value) return
  await handleDelete(selectedItem.value.id)
}

async function toggleFeatured(project: any) {
  try {
    const response = await apiClient.patch(adminEndpoints.projects.toggleFeatured(project.id), {
      featured: !project.featured
    })
    if (response.data?.success || response.data) {
      showSuccess(project.featured ? 'Đã bỏ đánh dấu nổi bật' : 'Đã đánh dấu nổi bật')
      refresh()
    }
  } catch (error: any) {
    showError('Không thể cập nhật trạng thái nổi bật')
  }
}

async function updateStatus(project: any, newStatus: string) {
  try {
    const response = await apiClient.patch(adminEndpoints.projects.updateStatus(project.id), {
      status: newStatus
    })
    if (response.data?.success || response.data) {
      showSuccess('Đã cập nhật trạng thái')
      refresh()
    }
  } catch (error: any) {
    showError('Không thể cập nhật trạng thái')
  }
}

function formatDate(dateString: string) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getStatusLabel(status: string) {
  return getProjectStatusLabel(status as any) || status || 'Không xác định'
}

function getStatusClass(status: string) {
  const color = getProjectStatusColor(status as any)
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800'
  }
  return colorMap[color] || 'bg-gray-100 text-gray-800'
}

async function handlePageChange(page: number) {
  await changePage(page)
}
</script>

<style scoped>
.table-responsive {
  overflow-x: auto;
}
</style>

