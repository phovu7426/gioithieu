<template>
  <div class="min-h-screen bg-gray-50">
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Thư viện hình ảnh
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Khám phá những hình ảnh đẹp về các dự án và hoạt động của chúng tôi
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="i in 12" :key="i" class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div class="aspect-square bg-gray-200"></div>
            <div class="p-3">
              <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>

        <!-- Gallery Grid -->
        <div v-else-if="galleryItems.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          <div
            v-for="item in galleryItems"
            :key="item.id"
            class="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
            @click="openLightbox(item)"
          >
            <div class="relative aspect-square overflow-hidden bg-gray-100">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.title || item.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div v-if="item.featured" class="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Nổi bật
              </div>
            </div>
            <div v-if="item.title || item.name" class="p-3">
              <h3 class="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                {{ item.title || item.name }}
              </h3>
              <p v-if="item.description || item.short_description" class="text-xs text-gray-500 line-clamp-2">
                {{ item.description || item.short_description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Chưa có hình ảnh nào</h3>
          <p class="text-gray-600">Các hình ảnh sẽ được cập nhật sớm nhất có thể.</p>
        </div>

        <!-- Lightbox Modal -->
        <Transition name="fade">
          <div
            v-if="selectedItem"
            class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            @click="closeLightbox"
          >
            <div class="relative max-w-4xl max-h-full" @click.stop>
              <button
                @click="closeLightbox"
                class="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <img
                :src="selectedItem.image"
                :alt="selectedItem.title || selectedItem.name"
                class="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div v-if="selectedItem.title || selectedItem.description" class="mt-4 text-white text-center">
                <h3 v-if="selectedItem.title || selectedItem.name" class="text-xl font-bold mb-2">
                  {{ selectedItem.title || selectedItem.name }}
                </h3>
                <p v-if="selectedItem.description" class="text-gray-300">
                  {{ selectedItem.description }}
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGlobalApiClient } from '@/composables/api'
import { publicEndpoints } from '@/api/endpoints'
import { useSeo } from '@/composables/seo'

definePageMeta({
  layout: 'home'
})

const { apiClient } = useGlobalApiClient()
const config = useRuntimeConfig()

// SEO configuration
useSeo({
  title: 'Thư viện hình ảnh',
  description: 'Khám phá những hình ảnh đẹp về các dự án và hoạt động của chúng tôi',
  type: 'website',
  url: '/home/gallery'
})

// State
const galleryItems = ref([])
const selectedItem = ref(null)
const loading = ref(true)

// Load gallery
onMounted(async () => {
  await loadGallery()
})

async function loadGallery() {
  loading.value = true
  try {
    const response = await apiClient.get(publicEndpoints.gallery.list, {
      params: {
        status: 'active',
        limit: 100
      }
    })
    
    let galleryData = []
    if (response.data?.success && response.data?.data) {
      galleryData = Array.isArray(response.data.data) ? response.data.data : []
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      galleryData = response.data.data
    } else if (Array.isArray(response.data)) {
      galleryData = response.data
    }
    
    // Format image URLs
    galleryItems.value = galleryData.map(item => {
      if (item.image && typeof item.image === 'string') {
        if (!item.image.startsWith('http://') && !item.image.startsWith('https://')) {
          if (item.image.startsWith('/')) {
            item.image = `${config.public.apiBase}${item.image}`
          }
        }
      }
      return item
    })
  } catch (error) {
    console.error('Failed to load gallery:', error)
    galleryItems.value = []
  } finally {
    loading.value = false
  }
}

function openLightbox(item) {
  selectedItem.value = item
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  selectedItem.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

