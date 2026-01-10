<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-gray-600">Đang tải thông tin dự án...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center px-4">
      <div class="max-w-md w-full text-center bg-white rounded-lg shadow-lg p-6">
        <div class="text-red-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Không thể tải dự án</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <NuxtLink
          to="/home/projects"
          class="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Quay lại danh sách dự án
        </NuxtLink>
      </div>
    </div>

    <!-- Project Detail -->
    <template v-else-if="project">
      <!-- Hero Section -->
      <div class="relative h-[400px] md:h-[500px] overflow-hidden bg-gray-900">
        <img
          v-if="project.cover_image"
          :src="project.cover_image"
          :alt="project.name"
          class="w-full h-full object-cover opacity-80"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-gray-800">
          <svg class="w-32 h-32 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8">
          <div class="max-w-4xl mx-auto">
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-if="project.status"
                :class="getStatusClass(project.status)"
                class="px-3 py-1 rounded-full text-sm font-semibold"
              >
                {{ getStatusLabel(project.status) }}
              </span>
              <span
                v-if="project.featured"
                class="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-white"
              >
                Nổi bật
              </span>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">{{ project.name }}</h1>
            <p v-if="project.short_description || project.description" class="text-xl text-gray-200 line-clamp-2">
              {{ project.short_description || project.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Description -->
            <section class="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-4">Mô tả dự án</h2>
              <div class="prose max-w-none text-gray-700" v-html="project.description || project.short_description || 'Chưa có mô tả chi tiết.'"></div>
            </section>

            <!-- Project Images -->
            <section v-if="projectImages && projectImages.length > 0" class="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Hình ảnh dự án</h2>
              <div class="grid md:grid-cols-2 gap-4">
                <div
                  v-for="(image, index) in projectImages"
                  :key="index"
                  class="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                  @click="openImageModal(image, index)"
                >
                  <img
                    :src="image"
                    :alt="`${project.name} - Hình ${index + 1}`"
                    class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Project Info Card -->
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Thông tin dự án</h3>
              <dl class="space-y-4">
                <div v-if="project.location">
                  <dt class="text-sm font-semibold text-gray-500 mb-1 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Địa điểm
                  </dt>
                  <dd class="text-gray-900 font-medium">{{ project.location }}</dd>
                </div>

                <div v-if="project.area">
                  <dt class="text-sm font-semibold text-gray-500 mb-1 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                    </svg>
                    Diện tích
                  </dt>
                  <dd class="text-gray-900 font-medium">{{ formatArea(parseFloat(project.area || 0)) }} m²</dd>
                </div>

                <div v-if="project.start_date">
                  <dt class="text-sm font-semibold text-gray-500 mb-1 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Ngày bắt đầu
                  </dt>
                  <dd class="text-gray-900 font-medium">{{ formatDate(project.start_date) }}</dd>
                </div>

                <div v-if="project.end_date">
                  <dt class="text-sm font-semibold text-gray-500 mb-1 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Ngày hoàn thành
                  </dt>
                  <dd class="text-gray-900 font-medium">{{ formatDate(project.end_date) }}</dd>
                </div>

                <div v-if="project.client_name">
                  <dt class="text-sm font-semibold text-gray-500 mb-1 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Khách hàng
                  </dt>
                  <dd class="text-gray-900 font-medium">{{ project.client_name }}</dd>
                </div>

                <div v-if="project.budget">
                  <dt class="text-sm font-semibold text-gray-500 mb-1 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Ngân sách
                  </dt>
                  <dd class="text-gray-900 font-medium">{{ formatCurrency(parseFloat(project.budget || 0)) }}</dd>
                </div>

                <div v-if="project.view_count">
                  <dt class="text-sm font-semibold text-gray-500 mb-1 flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Lượt xem
                  </dt>
                  <dd class="text-gray-900 font-medium">{{ formatNumber(parseInt(project.view_count || '0')) }}</dd>
                </div>
              </dl>
            </div>

            <!-- Back Button -->
            <NuxtLink
              to="/home/projects"
              class="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg px-6 py-3 text-center transition-colors"
            >
              ← Quay lại danh sách dự án
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>

    <!-- Image Modal -->
    <div
      v-if="imageModal.show"
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      @click="closeImageModal"
    >
      <button
        @click="closeImageModal"
        class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <button
        v-if="imageModal.currentIndex > 0"
        @click.stop="prevImage"
        class="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        v-if="imageModal.currentIndex < (projectImages.length - 1)"
        @click.stop="nextImage"
        class="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <img
        :src="imageModal.currentImage"
        :alt="`${project?.name} - Hình ${imageModal.currentIndex + 1}`"
        class="max-w-full max-h-full object-contain"
        @click.stop
      />
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {{ imageModal.currentIndex + 1 }} / {{ projectImages.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalApiClient } from '@/composables/api'
import { publicEndpoints } from '@/api/endpoints'
import { useSeo } from '@/composables/seo'
import { getProjectStatusLabel, getProjectStatusColor } from '@/shared/enums'

definePageMeta({
  layout: 'home'
})

const route = useRoute()
const { apiClient } = useGlobalApiClient()

// State
const project = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const imageModal = ref({
  show: false,
  currentImage: '',
  currentIndex: 0
})

// Computed
const projectSlug = computed(() => route.params.slug as string)
const projectImages = computed(() => {
  if (!project.value) return []
  let images = project.value.images || []
  if (typeof images === 'string') {
    try {
      images = JSON.parse(images)
    } catch (e) {
      console.warn('Failed to parse project images:', e)
      images = []
    }
  }
  return Array.isArray(images) ? images : []
})

// Load project
onMounted(async () => {
  await loadProject()
})

async function loadProject() {
  loading.value = true
  error.value = null

  try {
    const slug = projectSlug.value
    if (!slug) {
      error.value = 'Slug không hợp lệ'
      return
    }

    const response = await apiClient.get(publicEndpoints.projects.showBySlug(slug))

    if (!response || !response.data) {
      error.value = 'Không thể tải thông tin dự án'
      return
    }

    const responseData = response.data

    if (responseData.success === false) {
      error.value = responseData.message || 'Dự án không tồn tại'
      return
    }

    let data: any = null
    if (responseData.data) {
      data = responseData.data
    } else if (responseData.id || responseData.slug || responseData.name) {
      data = responseData
    } else {
      error.value = 'Dự án không tồn tại'
      return
    }

    project.value = data

    // Parse images if needed
    if (project.value.images && typeof project.value.images === 'string') {
      try {
        project.value.images = JSON.parse(project.value.images)
      } catch (e) {
        console.warn('Failed to parse images:', e)
        project.value.images = []
      }
    }

  } catch (err: any) {
    console.error('Error loading project:', err)
    error.value = err?.response?.data?.message || err?.message || 'Có lỗi xảy ra khi tải dự án'
  } finally {
    loading.value = false
  }
}

// SEO
watch(() => project.value, (newProject) => {
  if (newProject) {
    useSeo({
      title: newProject.name,
      description: newProject.short_description || newProject.description || `Chi tiết dự án ${newProject.name}`,
      image: newProject.cover_image,
      type: 'article',
      url: `/home/projects/${newProject.slug || newProject.id}`
    })
  }
})

function getStatusLabel(status: string) {
  return getProjectStatusLabel(status as any) || status
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

function formatArea(area: number) {
  if (isNaN(area)) return '0'
  return new Intl.NumberFormat('vi-VN').format(area)
}

function formatCurrency(amount: number) {
  if (isNaN(amount)) return '0'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

function formatNumber(num: number) {
  if (isNaN(num)) return '0'
  return new Intl.NumberFormat('vi-VN').format(num)
}

function formatDate(dateString: string | null) {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

function openImageModal(image: string, index: number) {
  imageModal.value = {
    show: true,
    currentImage: image,
    currentIndex: index
  }
}

function closeImageModal() {
  imageModal.value.show = false
}

function prevImage() {
  if (imageModal.value.currentIndex > 0) {
    imageModal.value.currentIndex--
    imageModal.value.currentImage = projectImages.value[imageModal.value.currentIndex]
  }
}

function nextImage() {
  if (imageModal.value.currentIndex < projectImages.value.length - 1) {
    imageModal.value.currentIndex++
    imageModal.value.currentImage = projectImages.value[imageModal.value.currentIndex]
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.prose {
  @apply text-gray-700;
}

.prose :deep(h1),
.prose :deep(h2),
.prose :deep(h3) {
  @apply font-bold text-gray-900 mt-6 mb-3;
}

.prose :deep(p) {
  @apply mb-4;
}

.prose :deep(ul),
.prose :deep(ol) {
  @apply mb-4 pl-6;
}

.prose :deep(li) {
  @apply mb-2;
}
</style>

