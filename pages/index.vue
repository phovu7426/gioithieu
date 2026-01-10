<template>
  <div class="homepage">
    <!-- Hero Section / Banner từ API -->
    <section class="hero-section">
      <BannerSlider
        location-code="home_slider"
        :autoplay="true"
        :interval="5000"
        :show-arrows="true"
        :show-indicators="true"
        height-class="h-[500px] md:h-[600px]"
        container-class="rounded-none"
      />
    </section>

    <!-- About Section -->
    <section v-if="aboutSections.length > 0" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Về Chúng Tôi</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Với nhiều năm kinh nghiệm, chúng tôi tự hào là đối tác tin cậy trong lĩnh vực xây dựng
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="section in aboutSections.slice(0, 3)"
            :key="section.id"
            class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div v-if="section.image" class="mb-4">
              <img :src="section.image" :alt="section.title" class="w-full h-48 object-cover rounded-lg" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ section.title }}</h3>
            <div class="text-gray-600 line-clamp-3" v-html="section.content"></div>
            <NuxtLink
              v-if="section.slug"
              :to="`/home/about`"
              class="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
            >
              Đọc thêm →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section v-if="featuredProjects.length > 0" class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Dự Án Nổi Bật</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá những dự án thành công của chúng tôi
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            @click="goToProject(project.slug || project.id)"
          >
            <div class="relative h-64 overflow-hidden bg-gray-100">
              <img
                v-if="project.image || project.cover_image"
                :src="project.image || project.cover_image || '/default.svg'"
                :alt="project.title || project.name"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <div v-if="project.status" class="absolute top-4 right-4">
                <span
                  :class="getStatusClass(project.status)"
                  class="px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {{ getStatusLabel(project.status) }}
                </span>
              </div>
              <div v-if="project.featured" class="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Nổi bật
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ project.title || project.name }}</h3>
              <p v-if="project.short_description || project.description" class="text-gray-600 mb-4 line-clamp-2">
                {{ project.short_description || project.description }}
              </p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span v-if="project.location">
                  <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  {{ project.location }}
                </span>
                <span v-if="project.area">{{ formatArea(project.area) }} m²</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <NuxtLink
            to="/home/projects"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Xem Tất Cả Dự Án
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Dịch Vụ Của Chúng Tôi</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Cung cấp giải pháp xây dựng toàn diện
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="service in services"
            :key="service.id"
            class="text-center p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div class="text-5xl mb-4">{{ service.icon }}</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ service.name }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section v-if="featuredTestimonials.length > 0" class="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Khách Hàng Nói Gì</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Những phản hồi từ khách hàng đã tin tưởng chúng tôi
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="testimonial in featuredTestimonials"
            :key="testimonial.id"
            class="bg-white rounded-lg p-6 shadow-md"
          >
            <div class="flex items-center mb-4">
              <div v-for="i in 5" :key="i" class="text-yellow-400">
                <svg v-if="i <= (testimonial.rating || 5)" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"></path>
                </svg>
              </div>
            </div>
            <p class="text-gray-700 mb-4 line-clamp-4">{{ testimonial.content }}</p>
            <div class="flex items-center">
              <img
                v-if="testimonial.client_avatar"
                :src="testimonial.client_avatar"
                :alt="testimonial.client_name"
                class="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <p class="font-semibold text-gray-900">{{ testimonial.client_name }}</p>
                <p class="text-sm text-gray-600">{{ testimonial.client_position }}{{ testimonial.client_company ? ` - ${testimonial.client_company}` : '' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section v-if="partners.length > 0" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Đối Tác Của Chúng Tôi</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Được tin tưởng bởi nhiều đối tác uy tín
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          <div
            v-for="partner in partners"
            :key="partner.id"
            class="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <img
              v-if="partner.logo"
              :src="partner.logo"
              :alt="partner.name"
              class="max-h-16 max-w-full object-contain"
            />
            <span v-else class="text-gray-600 font-medium">{{ partner.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Certificates Section -->
    <section v-if="certificates.length > 0" class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Chứng Nhận & Giấy Phép</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Cam kết chất lượng và tuân thủ các tiêu chuẩn quốc tế
          </p>
        </div>
        <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="cert in certificates"
            :key="cert.id"
            class="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            @click="openCertificateModal(cert)"
          >
            <img
              :src="cert.image"
              :alt="cert.name"
              class="w-full h-48 object-contain mb-4"
            />
            <h3 class="font-semibold text-gray-900 mb-1">{{ cert.name }}</h3>
            <p class="text-sm text-gray-600">{{ cert.issued_by }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs Section -->
    <section v-if="popularFaqs.length > 0" class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Câu Hỏi Thường Gặp</h2>
          <p class="text-lg text-gray-600">
            Giải đáp những thắc mắc phổ biến
          </p>
        </div>
        <div class="space-y-4">
          <div
            v-for="faq in popularFaqs"
            :key="faq.id"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-900">{{ faq.question }}</span>
              <svg
                class="w-5 h-5 text-gray-500 transition-transform"
                :class="{ 'rotate-180': expandedFaqs.includes(faq.id) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div
              v-show="expandedFaqs.includes(faq.id)"
              class="px-6 py-4 bg-gray-50 text-gray-700"
              v-html="faq.answer"
            ></div>
          </div>
        </div>
        <div class="text-center mt-8">
          <NuxtLink
            to="/home/faqs"
            class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Xem Tất Cả Câu Hỏi
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">Sẵn Sàng Bắt Đầu Dự Án Của Bạn?</h2>
        <p class="text-xl mb-8 text-blue-100">
          Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí
        </p>
        <NuxtLink
          to="/home/contact"
          class="inline-flex items-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
        >
          Liên Hệ Ngay
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalApiClient } from '@/composables/api'
import { publicEndpoints } from '@/api/endpoints'
import { useSeo } from '@/composables/seo'
import { useGlobalSystemConfig } from '~/composables/system-config'
import { getProjectStatusLabel, getProjectStatusColor } from '@/shared/enums'
import BannerSlider from '@/components/Public/Banners/BannerSlider.vue'

definePageMeta({
  layout: 'home'
})

const router = useRouter()
const { apiClient } = useGlobalApiClient()
const { systemInfo } = useGlobalSystemConfig()

// SEO
useSeo({
  title: systemInfo.value?.name || 'Công Ty Xây Dựng',
  description: 'Chuyên nghiệp - Chất lượng - Uy tín. Dịch vụ xây dựng toàn diện với nhiều năm kinh nghiệm.',
  type: 'website',
  url: '/'
})

// State
const featuredProjects = ref<any[]>([])
const aboutSections = ref<any[]>([])
const featuredTestimonials = ref<any[]>([])
const partners = ref<any[]>([])
const certificates = ref<any[]>([])
const popularFaqs = ref<any[]>([])
const expandedFaqs = ref<(string | number)[]>([])
const loading = ref(true)

// Services data (hardcoded - có thể chuyển sang API sau)
const services = ref([
  { id: 1, name: 'Xây Dựng Dân Dụng', icon: '🏗️', description: 'Nhà ở, biệt thự, chung cư' },
  { id: 2, name: 'Xây Dựng Công Nghiệp', icon: '🏭', description: 'Nhà xưởng, kho bãi, khu công nghiệp' },
  { id: 3, name: 'Thiết Kế Kiến Trúc', icon: '📐', description: 'Thiết kế chuyên nghiệp, hiện đại' },
  { id: 4, name: 'Nội Thất & Hoàn Thiện', icon: '🪑', description: 'Thi công nội thất, hoàn thiện công trình' }
])

// Load data
onMounted(async () => {
  await Promise.all([
    loadFeaturedProjects(),
    loadAboutSections(),
    loadFeaturedTestimonials(),
    loadPartners(),
    loadCertificates(),
    loadPopularFaqs()
  ])
  loading.value = false
})

async function loadFeaturedProjects() {
  try {
    const response = await apiClient.get(publicEndpoints.projects.featured, { params: { limit: 6 } })
    if (response.data?.success && response.data?.data) {
      featuredProjects.value = Array.isArray(response.data.data) ? response.data.data : []
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      featuredProjects.value = response.data.data
    } else if (Array.isArray(response.data)) {
      featuredProjects.value = response.data
    }
  } catch (error) {
    console.error('Failed to load featured projects:', error)
    featuredProjects.value = []
  }
}

async function loadAboutSections() {
  try {
    const response = await apiClient.get(publicEndpoints.aboutSections.list, { params: { limit: 3, status: 'active' } })
    if (response.data?.success && response.data?.data) {
      aboutSections.value = Array.isArray(response.data.data) ? response.data.data : []
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      aboutSections.value = response.data.data
    } else if (Array.isArray(response.data)) {
      aboutSections.value = response.data
    }
  } catch (error) {
    console.error('Failed to load about sections:', error)
    aboutSections.value = []
  }
}

async function loadFeaturedTestimonials() {
  try {
    const response = await apiClient.get(publicEndpoints.testimonials.featured, { params: { limit: 6 } })
    if (response.data?.success && response.data?.data) {
      featuredTestimonials.value = Array.isArray(response.data.data) ? response.data.data : []
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      featuredTestimonials.value = response.data.data
    } else if (Array.isArray(response.data)) {
      featuredTestimonials.value = response.data
    }
  } catch (error) {
    console.error('Failed to load featured testimonials:', error)
    featuredTestimonials.value = []
  }
}

async function loadPartners() {
  try {
    const response = await apiClient.get(publicEndpoints.partners.list, { params: { limit: 12, status: 'active' } })
    if (response.data?.success && response.data?.data) {
      partners.value = Array.isArray(response.data.data) ? response.data.data : []
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      partners.value = response.data.data
    } else if (Array.isArray(response.data)) {
      partners.value = response.data
    }
  } catch (error) {
    console.error('Failed to load partners:', error)
    partners.value = []
  }
}

async function loadCertificates() {
  try {
    const response = await apiClient.get(publicEndpoints.certificates.list, { params: { limit: 8, status: 'active' } })
    if (response.data?.success && response.data?.data) {
      certificates.value = Array.isArray(response.data.data) ? response.data.data : []
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      certificates.value = response.data.data
    } else if (Array.isArray(response.data)) {
      certificates.value = response.data
    }
  } catch (error) {
    console.error('Failed to load certificates:', error)
    certificates.value = []
  }
}

async function loadPopularFaqs() {
  try {
    const response = await apiClient.get(publicEndpoints.faqs.popular, { params: { limit: 5 } })
    if (response.data?.success && response.data?.data) {
      popularFaqs.value = Array.isArray(response.data.data) ? response.data.data : []
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      popularFaqs.value = response.data.data
    } else if (Array.isArray(response.data)) {
      popularFaqs.value = response.data
    }
  } catch (error) {
    console.error('Failed to load popular FAQs:', error)
    popularFaqs.value = []
  }
}

function goToProject(slugOrId: string | number) {
  if (!slugOrId) return
  router.push(`/home/projects/${slugOrId}`)
}

function toggleFaq(id: string | number) {
  const index = expandedFaqs.value.indexOf(id)
  if (index >= 0) {
    expandedFaqs.value.splice(index, 1)
  } else {
    expandedFaqs.value.push(id)
  }
}

function openCertificateModal(cert: any) {
  // TODO: Implement certificate modal
  console.log('Open certificate:', cert)
}

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
  return new Intl.NumberFormat('vi-VN').format(area)
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

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
