<template>
  <div class="min-h-screen bg-gray-50">
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dự án của chúng tôi
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Khám phá các dự án nổi bật mà chúng tôi đã thực hiện với chất lượng và uy tín cao
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 6" :key="i" class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div class="h-64 bg-gray-200"></div>
            <div class="p-6">
              <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>

        <!-- Projects Grid -->
        <div v-else-if="projects.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="project in projects"
            :key="project.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
            @click="goToProject(project.slug || project.id)"
          >
            <div class="relative h-56 overflow-hidden bg-gray-100">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="project.title || project.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div v-if="project.featured" class="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Nổi bật
              </div>
              <div v-if="project.status" class="absolute top-3 left-3">
                <span
                  class="px-2 py-1 rounded text-xs font-semibold"
                  :class="getStatusClass(project.status)"
                >
                  {{ getStatusLabel(project.status) }}
                </span>
              </div>
            </div>
            <div class="p-5">
              <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {{ project.title || project.name }}
              </h3>
              <p v-if="project.description || project.short_description" class="text-gray-600 text-sm mb-3 line-clamp-2">
                {{ project.description || project.short_description }}
              </p>
              <div v-if="project.location" class="flex items-center text-sm text-gray-500 mb-2">
                <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="truncate">{{ project.location }}</span>
              </div>
              <div v-if="project.area" class="flex items-center text-sm text-gray-500 mb-3">
                <svg class="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                </svg>
                {{ formatArea(project.area) }} m²
              </div>
              <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                <span class="text-xs text-gray-500">
                  {{ formatDate(project.created_at || project.start_date) }}
                </span>
                <NuxtLink
                  :to="`/home/projects/${project.slug || project.id}`"
                  class="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  @click.stop
                >
                  Xem thêm
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Chưa có dự án nào</h3>
          <p class="text-gray-600">Các dự án sẽ được cập nhật sớm nhất có thể.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalApiClient } from '@/composables/api'
import { publicEndpoints } from '@/api/endpoints'
import { useSeo } from '@/composables/seo'
import { getProjectStatusLabel, getProjectStatusColor } from '@/shared/enums'

definePageMeta({
  layout: 'home'
})

const router = useRouter()
const { apiClient } = useGlobalApiClient()

// SEO configuration
useSeo({
  title: 'Dự án',
  description: 'Khám phá các dự án nổi bật mà chúng tôi đã thực hiện với chất lượng và uy tín cao',
  type: 'website',
  url: '/home/projects'
})

// State
const projects = ref([])
const loading = ref(true)

// Load projects
onMounted(async () => {
  await loadProjects()
})

async function loadProjects() {
  loading.value = true
  try {
    const response = await apiClient.get(publicEndpoints.projects.list, {
      params: {
        status: 'active',
        limit: 100
      }
    })
    
    if (response.data?.success) {
      projects.value = Array.isArray(response.data.data) 
        ? response.data.data 
        : (response.data.data?.data || [])
    }
  } catch (error) {
    console.error('Failed to load projects:', error)
    projects.value = []
  } finally {
    loading.value = false
  }
}

function goToProject(slugOrId) {
  router.push(`/home/projects/${slugOrId}`)
}

function getStatusLabel(status) {
  if (!status) return ''
  try {
    return getProjectStatusLabel(status) || status
  } catch {
    return status
  }
}

function getStatusClass(status) {
  if (!status) return 'bg-gray-100 text-gray-800'
  try {
    const color = getProjectStatusColor(status)
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
      gray: 'bg-gray-100 text-gray-800'
    }
    return colorMap[color] || 'bg-gray-100 text-gray-800'
  } catch {
    return 'bg-gray-100 text-gray-800'
  }
}

function formatArea(area) {
  if (!area) return ''
  return new Intl.NumberFormat('vi-VN').format(area)
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
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
</style>

