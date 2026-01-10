<template>
  <div class="min-h-screen bg-gray-50">
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Chứng Nhận & Giấy Phép
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Cam kết chất lượng và tuân thủ các tiêu chuẩn quốc tế, chúng tôi tự hào về các chứng nhận và giấy phép đã đạt được
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 8" :key="i" class="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div class="w-full h-48 bg-gray-200 rounded mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Certificates Grid -->
        <div v-else-if="certificates.length > 0" class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="cert in certificates"
            :key="cert.id"
            class="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer group"
            @click="openCertificateModal(cert)"
          >
            <!-- Certificate Image -->
            <div class="relative h-48 bg-gray-100 overflow-hidden">
              <img
                v-if="cert.image"
                :src="cert.image"
                :alt="cert.name"
                class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            </div>

            <!-- Certificate Info -->
            <div class="p-4">
              <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{{ cert.name }}</h3>
              <p v-if="cert.issued_by" class="text-sm text-gray-600 mb-2 line-clamp-1">
                <span class="font-medium">Cấp bởi:</span> {{ cert.issued_by }}
              </p>
              <div v-if="cert.issued_date" class="flex items-center text-xs text-gray-500 mb-1">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Ngày cấp: {{ formatDate(cert.issued_date) }}</span>
              </div>
              <div v-if="cert.expiry_date" class="flex items-center text-xs text-gray-500 mb-2">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Hết hạn: {{ formatDate(cert.expiry_date) }}</span>
              </div>
              <div v-if="cert.certificate_number" class="text-xs text-gray-500 mb-2">
                <span class="font-medium">Số chứng chỉ:</span> {{ cert.certificate_number }}
              </div>
              <div v-if="cert.type" class="mb-2">
                <span
                  :class="getTypeClass(cert.type)"
                  class="inline-block px-2 py-1 rounded text-xs font-semibold"
                >
                  {{ getTypeLabel(cert.type) }}
                </span>
              </div>
              <p v-if="cert.description" class="text-xs text-gray-600 line-clamp-2 mt-2">{{ cert.description }}</p>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white rounded-lg shadow-sm">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Chưa có chứng chỉ nào</h3>
          <p class="text-gray-600">Thông tin chứng chỉ sẽ được cập nhật sớm nhất có thể.</p>
        </div>
      </div>
    </div>

    <!-- Certificate Modal -->
    <div
      v-if="modal.show"
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      @click="closeModal"
    >
      <div
        class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">{{ modal.certificate?.name }}</h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-6">
          <div class="mb-6">
            <img
              v-if="modal.certificate?.image"
              :src="modal.certificate.image"
              :alt="modal.certificate.name"
              class="w-full max-w-2xl mx-auto object-contain rounded-lg shadow-lg"
            />
          </div>
          <dl class="grid md:grid-cols-2 gap-4">
            <div v-if="modal.certificate?.issued_by">
              <dt class="text-sm font-semibold text-gray-500 mb-1">Cấp bởi</dt>
              <dd class="text-gray-900 font-medium">{{ modal.certificate.issued_by }}</dd>
            </div>
            <div v-if="modal.certificate?.certificate_number">
              <dt class="text-sm font-semibold text-gray-500 mb-1">Số chứng chỉ</dt>
              <dd class="text-gray-900 font-medium">{{ modal.certificate.certificate_number }}</dd>
            </div>
            <div v-if="modal.certificate?.issued_date">
              <dt class="text-sm font-semibold text-gray-500 mb-1">Ngày cấp</dt>
              <dd class="text-gray-900 font-medium">{{ formatDate(modal.certificate.issued_date) }}</dd>
            </div>
            <div v-if="modal.certificate?.expiry_date">
              <dt class="text-sm font-semibold text-gray-500 mb-1">Ngày hết hạn</dt>
              <dd class="text-gray-900 font-medium">{{ formatDate(modal.certificate.expiry_date) }}</dd>
            </div>
            <div v-if="modal.certificate?.type">
              <dt class="text-sm font-semibold text-gray-500 mb-1">Loại chứng chỉ</dt>
              <dd class="text-gray-900 font-medium">{{ getTypeLabel(modal.certificate.type) }}</dd>
            </div>
          </dl>
          <div v-if="modal.certificate?.description" class="mt-6 pt-6 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-500 mb-2">Mô tả</h4>
            <p class="text-gray-700">{{ modal.certificate.description }}</p>
          </div>
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
  title: 'Chứng Nhận & Giấy Phép',
  description: 'Cam kết chất lượng và tuân thủ các tiêu chuẩn quốc tế, chúng tôi tự hào về các chứng nhận và giấy phép đã đạt được',
  type: 'website',
  url: '/home/certificates'
})

// State
const certificates = ref<any[]>([])
const loading = ref(true)
const modal = ref({
  show: false,
  certificate: null as any
})

// Load certificates
onMounted(async () => {
  await loadCertificates()
})

async function loadCertificates() {
  loading.value = true
  try {
    const response = await apiClient.get(publicEndpoints.certificates.list, {
      params: {
        status: 'active',
        limit: 100,
        sort: 'sort_order:ASC'
      }
    })

    if (response.data?.success && response.data?.data) {
      certificates.value = Array.isArray(response.data.data) ? response.data.data : []
    } else if (Array.isArray(response.data)) {
      certificates.value = response.data
    } else if (Array.isArray(response.data?.data)) {
      certificates.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to load certificates:', error)
    certificates.value = []
  } finally {
    loading.value = false
  }
}

function getTypeLabel(type: string) {
  const typeMap: Record<string, string> = {
    iso: 'ISO',
    award: 'Giải thưởng',
    license: 'Giấy phép',
    certification: 'Chứng nhận',
    other: 'Khác'
  }
  return typeMap[type] || type
}

function getTypeClass(type: string) {
  const classMap: Record<string, string> = {
    iso: 'bg-blue-100 text-blue-800',
    award: 'bg-yellow-100 text-yellow-800',
    license: 'bg-green-100 text-green-800',
    certification: 'bg-purple-100 text-purple-800',
    other: 'bg-gray-100 text-gray-800'
  }
  return classMap[type] || 'bg-gray-100 text-gray-800'
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

function openCertificateModal(cert: any) {
  modal.value = {
    show: true,
    certificate: cert
  }
}

function closeModal() {
  modal.value.show = false
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
</style>

