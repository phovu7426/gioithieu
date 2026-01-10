<template>
  <div class="min-h-screen bg-gray-50">
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Đội Ngũ Của Chúng Tôi
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Đội ngũ chuyên nghiệp, giàu kinh nghiệm và tâm huyết với sứ mệnh mang lại giá trị tốt nhất cho khách hàng
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 8" :key="i" class="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div class="w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div class="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
          </div>
        </div>

        <!-- Staff Grid -->
        <div v-else-if="staff.length > 0" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="member in staff"
            :key="member.id"
            class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 text-center"
          >
            <!-- Avatar -->
            <div class="mb-4">
              <img
                v-if="member.avatar"
                :src="member.avatar"
                :alt="member.name"
                class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100 shadow-md"
              />
              <div v-else class="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center border-4 border-blue-100 shadow-md">
                <span class="text-3xl font-bold text-white">{{ getInitial(member.name) }}</span>
              </div>
            </div>

            <!-- Name -->
            <h3 class="text-lg font-bold text-gray-900 mb-1">{{ member.name }}</h3>

            <!-- Position -->
            <p class="text-blue-600 font-medium text-sm mb-1">{{ member.position }}</p>

            <!-- Department -->
            <p v-if="member.department" class="text-gray-500 text-xs mb-3">{{ member.department }}</p>

            <!-- Experience -->
            <div v-if="member.experience" class="flex items-center justify-center text-xs text-gray-600 mb-3">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ member.experience }} năm kinh nghiệm
            </div>

            <!-- Expertise -->
            <p v-if="member.expertise" class="text-gray-600 text-xs mb-4 line-clamp-2">{{ member.expertise }}</p>

            <!-- Bio -->
            <p v-if="member.bio" class="text-gray-600 text-xs mb-4 line-clamp-3">{{ member.bio }}</p>

            <!-- Social Links -->
            <div v-if="member.social_links && Object.keys(member.social_links).length > 0" class="flex justify-center gap-3 mt-4 pt-4 border-t border-gray-100">
              <a
                v-if="member.social_links.facebook"
                :href="member.social_links.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-700 transition-colors"
                title="Facebook"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
              </a>
              <a
                v-if="member.social_links.linkedin"
                :href="member.social_links.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-700 transition-colors"
                title="LinkedIn"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
              <a
                v-if="member.social_links.twitter"
                :href="member.social_links.twitter"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-400 hover:text-blue-500 transition-colors"
                title="Twitter"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Chưa có thông tin đội ngũ</h3>
          <p class="text-gray-600">Thông tin đội ngũ sẽ được cập nhật sớm nhất có thể.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGlobalApiClient } from '@/composables/api'
import { publicEndpoints } from '@/api/endpoints'
import { useSeo } from '@/composables/seo'

definePageMeta({
  layout: 'home'
})

const { apiClient } = useGlobalApiClient()

// SEO configuration
useSeo({
  title: 'Đội Ngũ',
  description: 'Đội ngũ chuyên nghiệp, giàu kinh nghiệm và tâm huyết với sứ mệnh mang lại giá trị tốt nhất cho khách hàng',
  type: 'website',
  url: '/home/staff'
})

// State
const staff = ref<any[]>([])
const loading = ref(true)

// Load staff
onMounted(async () => {
  await loadStaff()
})

async function loadStaff() {
  loading.value = true
  try {
    const response = await apiClient.get(publicEndpoints.staff.list, {
      params: {
        status: 'active',
        limit: 100,
        sort: 'sort_order:ASC'
      }
    })

    if (response.data?.success && response.data?.data) {
      let staffData = Array.isArray(response.data.data) ? response.data.data : []
      
      // Parse social_links if needed
      staffData = staffData.map((member: any) => {
        let socialLinks = member.social_links || {}
        if (typeof socialLinks === 'string') {
          try {
            socialLinks = JSON.parse(socialLinks)
          } catch (e) {
            console.warn('Failed to parse social_links:', e)
            socialLinks = {}
          }
        }
        return {
          ...member,
          social_links: typeof socialLinks === 'object' && socialLinks !== null ? socialLinks : {}
        }
      })

      staff.value = staffData
    } else if (Array.isArray(response.data)) {
      staff.value = response.data
    }
  } catch (error) {
    console.error('Failed to load staff:', error)
    staff.value = []
  } finally {
    loading.value = false
  }
}

function getInitial(name: string) {
  if (!name) return '?'
  return name.charAt(0).toUpperCase()
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

