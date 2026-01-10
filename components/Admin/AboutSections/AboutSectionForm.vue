<template>
  <Modal v-model="modalVisible" :title="formTitle" size="xl">
    <form @submit.prevent="validateAndSubmit" class="space-y-8" @click.stop>
      <div class="space-y-6">
        <div class="border-b border-gray-200 pb-4">
          <h3 class="text-lg font-semibold text-gray-900">Thông tin section</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Tiêu đề <span class="text-red-500">*</span></label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500 ring-2 ring-red-200': validationErrors.title || apiErrorsSafe.title }"
              placeholder="Nhập tiêu đề"
            />
            <p v-if="validationErrors.title" class="mt-2 text-sm text-red-600">{{ validationErrors.title }}</p>
          </div>

          <div>
            <label for="section_type" class="block text-sm font-medium text-gray-700 mb-2">Loại section</label>
            <select
              id="section_type"
              v-model="formData.section_type"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option v-for="opt in sectionTypeOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              id="status"
              v-model="formData.status"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
            </select>
          </div>

          <div>
            <label for="sort_order" class="block text-sm font-medium text-gray-700 mb-2">Thứ tự</label>
            <input
              id="sort_order"
              v-model.number="formData.sort_order"
              type="number"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Nội dung <span class="text-red-500">*</span></label>
          <CKEditor
            v-model="formData.content"
            :height="'400px'"
            :placeholder="'Nhập nội dung...'"
            :upload-url="'/api/upload/image'"
            class="w-full"
          />
          <p v-if="validationErrors.content" class="mt-1 text-sm text-red-600">{{ validationErrors.content }}</p>
        </div>

        <div class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Hình ảnh</label>
          <ImageUploader
            v-model="formData.image"
            :default-url="imageUrl"
            @remove="formData.image = null"
          />
        </div>

        <div>
          <label for="video_url" class="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
          <input
            id="video_url"
            v-model="formData.video_url"
            type="url"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://..."
          />
        </div>
      </div>

      <div class="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          @click="onClose"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Đang xử lý...' : (section ? 'Cập nhật' : 'Thêm mới') }}
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
import { useFormValidation } from '@/composables/utils/useFormValidation'
import { getAboutSectionTypeArray, getBasicStatusArray } from '@/shared/enums'

const props = defineProps({
  show: Boolean,
  section: Object,
  apiErrors: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['submit', 'cancel'])

const apiErrorsSafe = computed(() => props.apiErrors || {})

const sectionTypeOptions = computed(() => getAboutSectionTypeArray().map(opt => ({
  value: opt.value,
  label: opt.label
})))

const statusOptions = computed(() => getBasicStatusArray().map(opt => ({
  value: opt.value,
  label: opt.label
})))

const formTitle = computed(() => props.section ? 'Chỉnh sửa section' : 'Thêm section mới')

const modalVisible = computed({
  get: () => props.show,
  set: () => onClose()
})

const imageUrl = computed(() => props.section?.image || null)

const formData = reactive({
  title: '',
  slug: '',
  content: '',
  image: null,
  video_url: '',
  section_type: 'history',
  status: 'active',
  sort_order: 0
})

const isSubmitting = ref(false)

const validationRules = computed(() => ({
  title: [{ required: 'Tiêu đề là bắt buộc' }],
  content: [{ required: 'Nội dung là bắt buộc' }]
}))

const { validationErrors, clearErrors, validateForm } = useFormValidation(ref(formData), validationRules)

watch(() => props.section, async (newVal) => {
  if (newVal) {
    formData.title = newVal.title || ''
    formData.slug = newVal.slug || ''
    formData.content = newVal.content || ''
    formData.image = newVal.image || null
    formData.video_url = newVal.video_url || ''
    formData.section_type = newVal.section_type || 'history'
    formData.status = newVal.status || 'active'
    formData.sort_order = newVal.sort_order || 0
    await nextTick()
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  formData.title = ''
  formData.slug = ''
  formData.content = ''
  formData.image = null
  formData.video_url = ''
  formData.section_type = 'history'
  formData.status = 'active'
  formData.sort_order = 0
  clearErrors()
}

function validateAndSubmit() {
  if (!validateForm()) return

  isSubmitting.value = true
  try {
    const submitData = {
      title: formData.title.trim(),
      slug: formData.slug?.trim() || null,
      content: formData.content.trim(),
      image: formData.image || null,
      video_url: formData.video_url?.trim() || null,
      section_type: formData.section_type,
      status: formData.status,
      sort_order: Number(formData.sort_order) || 0
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

