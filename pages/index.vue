<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero-section relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            {{ heroData.title || 'Xây Dựng Tương Lai Bền Vững' }}
          </h1>
          <p class="text-xl sm:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            {{ heroData.subtitle || 'Chuyên nghiệp - Chất lượng - Uy tín' }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/projects"
              class="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Xem Dự Án
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Liên Hệ Ngay
            </NuxtLink>
          </div>
        </div>
      </div>
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
              :to="`/about/${section.slug}`"
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
            @click="goToProject(project.slug)"
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :src="project.cover_image || '/default.svg'"
                :alt="project.name"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div v-if="project.status" class="absolute top-4 right-4">
                <span
                  :class="getStatusClass(project.status)"
                  class="px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {{ getStatusLabel(project.status) }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ project.name }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ project.short_description }}</p>
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
            to="/projects"
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
            to="/faqs"
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
          to="/contact"
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
const heroData = ref({ title: '', subtitle: '' })
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
    if (response.data?.data) {
      featuredProjects.value = Array.isArray(response.data.data) ? response.data.data : response.data.data.data || []
    }
  } catch (error) {
    console.error('Failed to load featured projects:', error)
  }
}

async function loadAboutSections() {
  try {
    const response = await apiClient.get(publicEndpoints.aboutSections.list, { params: { limit: 3, status: 'active' } })
    if (response.data?.data) {
      aboutSections.value = Array.isArray(response.data.data) ? response.data.data : response.data.data.data || []
    }
  } catch (error) {
    console.error('Failed to load about sections:', error)
  }
}

async function loadFeaturedTestimonials() {
  try {
    const response = await apiClient.get(publicEndpoints.testimonials.featured, { params: { limit: 6 } })
    if (response.data?.data) {
      featuredTestimonials.value = Array.isArray(response.data.data) ? response.data.data : response.data.data.data || []
    }
  } catch (error) {
    console.error('Failed to load featured testimonials:', error)
  }
}

async function loadPartners() {
  try {
    const response = await apiClient.get(publicEndpoints.partners.list, { params: { limit: 12, status: 'active' } })
    if (response.data?.data) {
      partners.value = Array.isArray(response.data.data) ? response.data.data : response.data.data.data || []
    }
  } catch (error) {
    console.error('Failed to load partners:', error)
  }
}

async function loadCertificates() {
  try {
    const response = await apiClient.get(publicEndpoints.certificates.list, { params: { limit: 8, status: 'active' } })
    if (response.data?.data) {
      certificates.value = Array.isArray(response.data.data) ? response.data.data : response.data.data.data || []
    }
  } catch (error) {
    console.error('Failed to load certificates:', error)
  }
}

async function loadPopularFaqs() {
  try {
    const response = await apiClient.get(publicEndpoints.faqs.popular, { params: { limit: 5 } })
    if (response.data?.data) {
      popularFaqs.value = Array.isArray(response.data.data) ? response.data.data : response.data.data.data || []
    }
  } catch (error) {
    console.error('Failed to load popular FAQs:', error)
  }
}

function goToProject(slug: string) {
  router.push(`/projects/${slug}`)
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
