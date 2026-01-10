<template>
  <Modal v-model="modalVisible" :title="formTitle" size="xl">
    <form @submit.prevent="validateAndSubmit" class="space-y-8" @click.stop>
      <!-- Thông tin cơ bản -->
      <div class="space-y-6">
        <div class="border-b border-gray-200 pb-4">
          <h3 class="text-lg font-semibold text-gray-900">Thông tin dự án</h3>
          <p class="text-sm text-gray-600 mt-1">Điền thông tin cơ bản về dự án</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Tên dự án <span class="text-red-500">*</span></label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500 ring-2 ring-red-200': validationErrors.name || apiErrorsSafe.name }"
              placeholder="Nhập tên dự án"
            />
            <p v-if="validationErrors.name" class="mt-2 text-sm text-red-600">{{ validationErrors.name }}</p>
            <p v-else-if="apiErrorsSafe.name" class="mt-2 text-sm text-red-600">{{ apiErrorsSafe.name }}</p>
          </div>

          <div>
            <label for="slug" class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input
              id="slug"
              v-model="formData.slug"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tự động tạo từ tên nếu để trống"
            />
            <p class="text-xs text-gray-500 mt-1">Để trống để tự động tạo từ tên</p>
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              id="status"
              v-model="formData.status"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Chọn trạng thái --</option>
              <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
            <input
              id="location"
              v-model="formData.location"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ví dụ: Hà Nội"
            />
          </div>

          <div>
            <label for="area" class="block text-sm font-medium text-gray-700 mb-2">Diện tích (m²)</label>
            <input
              id="area"
              v-model.number="formData.area"
              type="number"
              step="0.01"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label for="client_name" class="block text-sm font-medium text-gray-700 mb-2">Tên khách hàng</label>
            <input
              id="client_name"
              v-model="formData.client_name"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tên khách hàng"
            />
          </div>

          <div>
            <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">Ngân sách (VNĐ)</label>
            <input
              id="budget"
              v-model.number="formData.budget"
              type="number"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label for="start_date" class="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu</label>
            <input
              id="start_date"
              v-model="formData.start_date"
              type="date"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label for="end_date" class="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc</label>
            <input
              id="end_date"
              v-model="formData.end_date"
              type="date"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Mô tả ngắn</label>
          <textarea
            v-model="formData.short_description"
            rows="3"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Mô tả ngắn về dự án..."
          ></textarea>
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Mô tả chi tiết</label>
          <CKEditor
            v-model="formData.description"
            :height="'300px'"
            :placeholder="'Nhập mô tả chi tiết về dự án...'"
            :upload-url="'/api/upload/image'"
            :max-file-size="5242880"
            :allowed-image-types="['image/jpeg', 'image/png', 'image/gif', 'image/webp']"
            :toolbar="['heading', '|', 'bold', 'italic', 'underline', '|', 'bulletedList', 'numberedList', '|', 'link', '|', 'imageUpload', '|', 'undo', 'redo']"
            class="w-full"
          />
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Ảnh bìa</label>
          <ImageUploader
            v-model="formData.cover_image"
            :default-url="coverImageUrl"
            @remove="formData.cover_image = null"
          />
          <p class="text-xs text-gray-500 mt-2">Định dạng: jpg, png, webp. Kích thước khuyến nghị 1200x630.</p>
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Hình ảnh dự án <span class="text-red-500">*</span></label>
          <Upload
            v-model="formData.images"
            :accept="'image/*'"
            :multiple="true"
            :max-size="10 * 1024 * 1024"
            drag-text="Kéo thả ảnh vào đây hoặc click để chọn"
            hint-text="Chọn nhiều ảnh (JPG, PNG, WebP - tối đa 10MB/ảnh)"
          />
          <p v-if="validationErrors.images" class="mt-1 text-sm text-red-600">{{ validationErrors.images }}</p>
          <p v-else-if="apiErrorsSafe.images" class="mt-1 text-sm text-red-600">{{ apiErrorsSafe.images }}</p>
          <p class="text-xs text-gray-500 mt-1">Có thể chọn nhiều ảnh cùng lúc</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div class="flex items-center">
              <input
                v-model="formData.featured"
                type="checkbox"
                id="featured"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label for="featured" class="ml-2 text-sm font-medium text-gray-700">Dự án nổi bật</label>
            </div>
            <p class="text-xs text-gray-500 mt-1">Hiển thị ưu tiên trên trang chủ</p>
          </div>

          <div>
            <label for="sort_order" class="block text-sm font-medium text-gray-700 mb-2">Thứ tự sắp xếp</label>
            <input
              id="sort_order"
              v-model.number="formData.sort_order"
              type="number"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <!-- SEO -->
      <div class="space-y-6 mt-8">
        <div class="border-b border-gray-200 pb-4">
          <h3 class="text-lg font-semibold text-gray-900">SEO</h3>
          <p class="text-sm text-gray-600 mt-1">Tối ưu hiển thị trên công cụ tìm kiếm</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="meta_title" class="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
            <input
              id="meta_title"
              v-model="formData.meta_title"
              type="text"
              placeholder="Tiêu đề SEO"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label for="canonical_url" class="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
            <input
              id="canonical_url"
              v-model="formData.canonical_url"
              type="url"
              placeholder="https://example.com/page"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
          <textarea
            v-model="formData.meta_description"
            rows="3"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Mô tả SEO"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">OG Image</label>
          <ImageUploader
            v-model="formData.og_image"
            :default-url="ogImageUrl"
            @remove="formData.og_image = null"
          />
          <p class="text-xs text-gray-500 mt-1">Hình ảnh hiển thị khi chia sẻ (khuyến nghị 1200x630px)</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          @click="onClose"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          Hủy
        </button>
        <button
          type="submit"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Đang xử lý...' : (project ? 'Cập nhật' : 'Thêm mới') }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup>
import { ref, computed, reactive, watch, nextTick } from 'vue'
import Modal from '@/components/Core/Modal/Modal.vue'
import ImageUploader from '@/components/Core/Image/ImageUploader.vue'
import CKEditor from '@/components/Core/Content/CKEditor.vue'
import Upload from '@/components/Core/Upload/Upload.vue'
import { useFormValidation } from '@/composables/utils/useFormValidation'
import { getProjectStatusArray } from '@/shared/enums'

const props = defineProps({
  show: Boolean,
  project: Object,
  statusEnums: {
    type: Array,
    default: () => []
  },
  apiErrors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'cancel'])

const apiErrorsSafe = computed(() => props.apiErrors || {})

const statusOptions = computed(() => {
  const statusArray = props.statusEnums && props.statusEnums.length > 0 
    ? props.statusEnums 
    : getProjectStatusArray()
  return statusArray.map(opt => ({
    value: opt.value,
    label: opt.label || opt.name || opt.value
  }))
})

const formTitle = computed(() => props.project ? 'Chỉnh sửa dự án' : 'Thêm dự án mới')

const modalVisible = computed({
  get: () => props.show,
  set: () => onClose()
})

const coverImageUrl = computed(() => {
  if (props.project?.cover_image) {
    return props.project.cover_image
  }
  return null
})

const ogImageUrl = computed(() => {
  if (props.project?.og_image) {
    return props.project.og_image
  }
  return null
})

const formData = reactive({
  name: '',
  slug: '',
  description: '',
  short_description: '',
  cover_image: null,
  location: '',
  area: null,
  start_date: '',
  end_date: '',
  status: 'planning',
  client_name: '',
  budget: null,
  images: [],
  featured: false,
  sort_order: 0,
  meta_title: '',
  meta_description: '',
  canonical_url: '',
  og_image: null
})

const isSubmitting = ref(false)

const validationRules = computed(() => ({
  name: [
    { required: 'Tên dự án là bắt buộc' },
    { max: [255, 'Tên dự án không được vượt quá 255 ký tự'] }
  ],
  images: [
    { required: 'Hình ảnh dự án là bắt buộc' }
  ]
}))

const { validationErrors, clearErrors, validateForm } = useFormValidation(ref(formData), validationRules)

watch(() => props.project, async (newVal) => {
  if (newVal) {
    formData.name = newVal.name || ''
    formData.slug = newVal.slug || ''
    formData.description = newVal.description || ''
    formData.short_description = newVal.short_description || ''
    formData.cover_image = (newVal.cover_image && !newVal.cover_image.includes('via.placeholder')) ? newVal.cover_image : null
    formData.location = newVal.location || ''
    formData.area = newVal.area || null
    formData.start_date = newVal.start_date ? formatDateForInput(newVal.start_date) : ''
    formData.end_date = newVal.end_date ? formatDateForInput(newVal.end_date) : ''
    formData.status = newVal.status || 'planning'
    formData.client_name = newVal.client_name || ''
    formData.budget = newVal.budget || null
    formData.images = Array.isArray(newVal.images) ? newVal.images : []
    formData.featured = newVal.featured || false
    formData.sort_order = newVal.sort_order || 0
    formData.meta_title = newVal.meta_title || ''
    formData.meta_description = newVal.meta_description || ''
    formData.canonical_url = newVal.canonical_url || ''
    formData.og_image = (newVal.og_image && !newVal.og_image.includes('via.placeholder')) ? newVal.og_image : null
    await nextTick()
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  formData.name = ''
  formData.slug = ''
  formData.description = ''
  formData.short_description = ''
  formData.cover_image = null
  formData.location = ''
  formData.area = null
  formData.start_date = ''
  formData.end_date = ''
  formData.status = 'planning'
  formData.client_name = ''
  formData.budget = null
  formData.images = []
  formData.featured = false
  formData.sort_order = 0
  formData.meta_title = ''
  formData.meta_description = ''
  formData.canonical_url = ''
  formData.og_image = null
  clearErrors()
}

function formatDateForInput(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function validateAndSubmit() {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    const submitData = {
      name: formData.name.trim(),
      slug: formData.slug?.trim() || null,
      description: formData.description?.trim() || null,
      short_description: formData.short_description?.trim() || null,
      cover_image: formData.cover_image || null,
      location: formData.location?.trim() || null,
      area: formData.area ? Number(formData.area) : null,
      start_date: formData.start_date || null,
      end_date: formData.end_date || null,
      status: formData.status || 'planning',
      client_name: formData.client_name?.trim() || null,
      budget: formData.budget ? Number(formData.budget) : null,
      images: Array.isArray(formData.images) ? formData.images : [],
      featured: Boolean(formData.featured),
      sort_order: formData.sort_order ? Number(formData.sort_order) : 0,
      meta_title: formData.meta_title?.trim() || null,
      meta_description: formData.meta_description?.trim() || null,
      canonical_url: formData.canonical_url?.trim() || null,
      og_image: formData.og_image || null
    }

    emit('submit', submitData)
  } finally {
    isSubmitting.value = false
  }
}

function onClose() {
  emit('cancel')
}
</script>

