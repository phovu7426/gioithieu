<template>
  <div class="min-h-screen bg-gray-50">
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Dịch vụ của chúng tôi
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp các dịch vụ xây dựng toàn diện với chất lượng cao và uy tín
          </p>
        </div>

        <!-- Services Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            v-for="service in services"
            :key="service.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
            @click="contactService(service)"
          >
            <div class="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">{{ service.icon }}</span>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">
              {{ service.name }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {{ service.description }}
            </p>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Bạn cần tư vấn về dịch vụ?</h2>
          <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
            Đội ngũ chuyên nghiệp của chúng tôi sẵn sàng hỗ trợ bạn với các giải pháp phù hợp nhất
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/home/contact"
              class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Liên hệ ngay
            </NuxtLink>
            <NuxtLink
              to="/home"
              class="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Về trang chủ
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSeo } from '@/composables/seo'

definePageMeta({
  layout: 'home'
})

const router = useRouter()

// SEO configuration
useSeo({
  title: 'Dịch vụ',
  description: 'Chúng tôi cung cấp các dịch vụ xây dựng toàn diện với chất lượng cao và uy tín',
  type: 'website',
  url: '/home/services'
})

// Services data (có thể lấy từ API sau)
const services = ref([
  {
    id: 1,
    name: 'Xây Dựng Dân Dụng',
    icon: '🏗️',
    description: 'Thi công các công trình nhà ở, biệt thự, chung cư với chất lượng cao và đảm bảo tiến độ.'
  },
  {
    id: 2,
    name: 'Xây Dựng Công Nghiệp',
    icon: '🏭',
    description: 'Thi công nhà xưởng, kho bãi, khu công nghiệp với quy mô lớn, đảm bảo chất lượng và an toàn.'
  },
  {
    id: 3,
    name: 'Thiết Kế Kiến Trúc',
    icon: '📐',
    description: 'Dịch vụ thiết kế kiến trúc chuyên nghiệp, hiện đại với nhiều phong cách khác nhau.'
  },
  {
    id: 4,
    name: 'Nội Thất & Hoàn Thiện',
    icon: '🪑',
    description: 'Thi công nội thất, hoàn thiện công trình với các vật liệu cao cấp và chuyên nghiệp.'
  },
  {
    id: 5,
    name: 'Cải Tạo & Sửa Chữa',
    icon: '🔧',
    description: 'Dịch vụ cải tạo và sửa chữa nhà ở, công trình với giá cả hợp lý và chất lượng tốt.'
  },
  {
    id: 6,
    name: 'Tư Vấn Thiết Kế',
    icon: '💡',
    description: 'Tư vấn thiết kế, lựa chọn vật liệu và giải pháp xây dựng phù hợp với ngân sách.'
  },
  {
    id: 7,
    name: 'Quản Lý Dự Án',
    icon: '📊',
    description: 'Dịch vụ quản lý dự án xây dựng chuyên nghiệp, đảm bảo tiến độ và chất lượng.'
  },
  {
    id: 8,
    name: 'Bảo Hành & Bảo Trì',
    icon: '🛠️',
    description: 'Dịch vụ bảo hành và bảo trì công trình sau khi hoàn thành với cam kết hỗ trợ lâu dài.'
  }
])

function contactService(service) {
  router.push({
    path: '/home/contact',
    query: { service: service.name }
  })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
