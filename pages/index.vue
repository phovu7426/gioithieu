<template>
  <div class="homepage">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p class="text-gray-600">Đang tải dữ liệu trang chủ...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div class="max-w-md w-full text-center bg-white rounded-lg shadow-lg p-6">
        <div class="text-red-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">Không thể tải dữ liệu</h2>
        <p class="text-gray-600 mb-6">{{ error }}</p>
        <button
          @click="loadHomepageData"
          class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <template v-else>
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
    <section v-if="featuredProjects.length > 0" class="relative py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Title Section -->
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dự Án Trọng Điểm
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Khám phá những dự án thành công và nổi bật của chúng tôi
          </p>
        </div>

        <!-- Projects Grid - Chỉ hiển thị 3 dự án đầu tiên -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          <div
            v-for="project in featuredProjects.slice(0, 3)"
            :key="project.id"
            class="group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
            @click="goToProject(project.slug || project.id)"
          >
            <!-- Image Container -->
            <div class="relative h-80 overflow-hidden">
              <img
                v-if="project.cover_image"
                :src="project.cover_image"
                :alt="project.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
                <svg class="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <!-- Status Badge -->
              <div v-if="project.status" class="absolute top-4 right-4 z-10">
                <span
                  :class="getStatusClass(project.status)"
                  class="px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm shadow-lg"
                >
                  {{ getStatusLabel(project.status) }}
                </span>
              </div>
              
              <!-- Featured Badge -->
              <div v-if="project.featured" class="absolute top-4 left-4 z-10 bg-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                ⭐ Nổi Bật
              </div>
            </div>

            <!-- Content Section -->
            <div class="relative bg-white p-6">
              <!-- Project Name with Arrow -->
              <div class="flex items-center justify-between group-hover:gap-3 transition-all duration-300">
                <h3 class="text-xl font-bold text-gray-900 flex-1 group-hover:text-blue-600 transition-colors duration-300">
                  {{ project.name }}
                </h3>
                <div class="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>

              <!-- Short Description -->
              <p v-if="project.short_description || project.description" class="text-gray-600 text-sm mt-3 line-clamp-2">
                {{ project.short_description || project.description }}
              </p>

              <!-- Project Info -->
              <div class="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <div v-if="project.location" class="flex items-center text-xs text-gray-500">
                  <svg class="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="truncate max-w-[120px]">{{ project.location }}</span>
                </div>
                <div v-if="project.area" class="flex items-center text-xs text-gray-500">
                  <svg class="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                  </svg>
                  <span>{{ formatArea(parseFloat(project.area || 0)) }} m²</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- View All Button -->
        <div class="text-center">
          <NuxtLink
            to="/home/projects"
            class="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
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

    <!-- Partners Section -->
    <section v-if="partners.length > 0" class="py-16 bg-gray-50">
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
            class="flex items-center justify-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors shadow-sm hover:shadow-md"
          >
            <img
              v-if="partner.logo"
              :src="partner.logo"
              :alt="partner.name"
              class="max-h-16 max-w-full object-contain"
            />
            <span v-else class="text-gray-600 font-medium text-center">{{ partner.name }}</span>
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
        <div class="text-center mt-12">
          <NuxtLink
            to="/home/certificates"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Xem Tất Cả Chứng Chỉ
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Staff Section -->
    <section v-if="staff.length > 0" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Đội Ngũ Của Chúng Tôi</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Đội ngũ chuyên nghiệp, giàu kinh nghiệm và tâm huyết
          </p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="member in staff.slice(0, 8)"
            :key="member.id"
            class="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-shadow"
          >
            <div class="mb-4">
              <img
                v-if="member.avatar"
                :src="member.avatar"
                :alt="member.name"
                class="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100"
              />
              <div v-else class="w-24 h-24 rounded-full mx-auto bg-gray-200 flex items-center justify-center">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ member.name }}</h3>
            <p class="text-blue-600 font-medium text-sm mb-1">{{ member.position }}</p>
            <p v-if="member.department" class="text-gray-500 text-xs mb-2">{{ member.department }}</p>
            <p v-if="member.expertise" class="text-gray-600 text-xs line-clamp-2">{{ member.expertise }}</p>
            <div v-if="member.social_links && Object.keys(member.social_links).length > 0" class="flex justify-center gap-2 mt-4">
              <a
                v-if="member.social_links.facebook"
                :href="member.social_links.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 hover:text-blue-700"
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
                class="text-blue-600 hover:text-blue-700"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <NuxtLink
            to="/home/staff"
            class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Xem Tất Cả Đội Ngũ
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </NuxtLink>
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
    </template>
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
const staff = ref<any[]>([])
const partners = ref<any[]>([])
const certificates = ref<any[]>([])
const popularFaqs = ref<any[]>([])
const expandedFaqs = ref<(string | number)[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Services data (hardcoded - có thể chuyển sang API sau)
const services = ref([
  { id: 1, name: 'Xây Dựng Dân Dụng', icon: '🏗️', description: 'Nhà ở, biệt thự, chung cư' },
  { id: 2, name: 'Xây Dựng Công Nghiệp', icon: '🏭', description: 'Nhà xưởng, kho bãi, khu công nghiệp' },
  { id: 3, name: 'Thiết Kế Kiến Trúc', icon: '📐', description: 'Thiết kế chuyên nghiệp, hiện đại' },
  { id: 4, name: 'Nội Thất & Hoàn Thiện', icon: '🪑', description: 'Thi công nội thất, hoàn thiện công trình' }
])

// Load tất cả dữ liệu từ một API duy nhất
onMounted(async () => {
  await loadHomepageData()
})

async function loadHomepageData() {
  loading.value = true
  error.value = null
  
  try {
    const response = await apiClient.get(publicEndpoints.homepage)
    
    if (response.data?.success && response.data?.data) {
      const data = response.data.data
      
      // Parse dữ liệu từ API homepage
      featuredProjects.value = Array.isArray(data.featured_projects) ? data.featured_projects : []
      aboutSections.value = Array.isArray(data.about_sections) ? data.about_sections : []
      staff.value = Array.isArray(data.staff) ? data.staff : []
      partners.value = Array.isArray(data.partners) ? data.partners : []
      certificates.value = Array.isArray(data.certificates) ? data.certificates : []
      popularFaqs.value = Array.isArray(data.popular_faqs) ? data.popular_faqs : []
      
      // Parse JSON fields nếu cần (xử lý cả trường hợp đã parse và chưa parse)
      featuredProjects.value = featuredProjects.value.map(project => {
        let images = project.images || []
        if (typeof images === 'string') {
          try {
            images = JSON.parse(images)
          } catch (e) {
            console.warn('Failed to parse project images:', e)
            images = []
          }
        }
        return {
          ...project,
          images: Array.isArray(images) ? images : []
        }
      })
      
      staff.value = staff.value.map(member => {
        let socialLinks = member.social_links || {}
        if (typeof socialLinks === 'string') {
          try {
            socialLinks = JSON.parse(socialLinks)
          } catch (e) {
            console.warn('Failed to parse staff social_links:', e)
            socialLinks = {}
          }
        }
        return {
          ...member,
          social_links: typeof socialLinks === 'object' && socialLinks !== null ? socialLinks : {}
        }
      })
      
    } else {
      error.value = 'Không thể tải dữ liệu trang chủ'
      console.error('Invalid response format:', response.data)
    }
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Có lỗi xảy ra khi tải dữ liệu'
    console.error('Failed to load homepage data:', err)
    
    // Fallback: giữ mảng rỗng cho tất cả sections
    featuredProjects.value = []
    aboutSections.value = []
    staff.value = []
    partners.value = []
    certificates.value = []
    popularFaqs.value = []
  } finally {
    loading.value = false
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

function formatArea(area: number | string) {
  const num = typeof area === 'string' ? parseFloat(area) : area
  if (isNaN(num)) return '0'
  return new Intl.NumberFormat('vi-VN').format(num)
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

