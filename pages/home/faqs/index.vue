<template>
  <div class="min-h-screen bg-gray-50">
    <div class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Câu hỏi thường gặp
          </h1>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ và dự án của chúng tôi
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="space-y-4">
          <div v-for="i in 5" :key="i" class="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>

        <!-- FAQs List -->
        <div v-else-if="faqs.length > 0" class="space-y-4 mb-12">
          <div
            v-for="faq in faqs"
            :key="faq.id"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              @click="toggleFaq(faq.id)"
              class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span class="font-semibold text-gray-900 text-lg pr-4 flex-1">
                {{ faq.question }}
              </span>
              <svg
                class="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform"
                :class="{ 'rotate-180': expandedFaqs.includes(faq.id) }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[500px]"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 max-h-[500px]"
              leave-to-class="opacity-0 max-h-0"
            >
              <div
                v-show="expandedFaqs.includes(faq.id)"
                class="px-6 pb-5 bg-gray-50 border-t border-gray-200"
              >
                <div class="pt-4 text-gray-700 leading-relaxed" v-html="faq.answer"></div>
                <div v-if="faq.helpful_count !== undefined" class="mt-4">
                  <button
                    @click="markHelpful(faq.id)"
                    class="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                    </svg>
                    Hữu ích ({{ faq.helpful_count || 0 }})
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16 bg-white rounded-lg shadow-sm mb-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Chưa có câu hỏi nào</h3>
          <p class="text-gray-600">Các câu hỏi sẽ được cập nhật sớm nhất có thể.</p>
        </div>

        <!-- CTA Section -->
        <div class="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Không tìm thấy câu trả lời?</h2>
          <p class="text-gray-600 mb-6 max-w-2xl mx-auto">
            Đội ngũ hỗ trợ của chúng tôi sẵn sàng trả lời mọi thắc mắc của bạn
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/home/contact"
              class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Liên hệ với chúng tôi
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
import { ref, onMounted } from 'vue'
import { useGlobalApiClient } from '@/composables/api'
import { publicEndpoints } from '@/api/endpoints'
import { useSeo } from '@/composables/seo'
import { useToast } from '@/composables/ui/useToast'

definePageMeta({
  layout: 'home'
})

const { apiClient } = useGlobalApiClient()
const { showSuccess, showError } = useToast()

// SEO configuration
useSeo({
  title: 'Câu hỏi thường gặp',
  description: 'Tìm câu trả lời cho những thắc mắc phổ biến về dịch vụ và dự án của chúng tôi',
  type: 'website',
  url: '/home/faqs'
})

// State
const faqs = ref([])
const expandedFaqs = ref([])
const loading = ref(true)

// Load FAQs
onMounted(async () => {
  await loadFaqs()
})

async function loadFaqs() {
  loading.value = true
  try {
    const response = await apiClient.get(publicEndpoints.faqs.list, {
      params: {
        status: 'active',
        limit: 100
      }
    })
    
    if (response.data?.success) {
      faqs.value = Array.isArray(response.data.data) 
        ? response.data.data 
        : (response.data.data?.data || [])
    }
  } catch (error) {
    console.error('Failed to load FAQs:', error)
    faqs.value = []
  } finally {
    loading.value = false
  }
}

function toggleFaq(id) {
  const index = expandedFaqs.value.indexOf(id)
  if (index >= 0) {
    expandedFaqs.value.splice(index, 1)
  } else {
    expandedFaqs.value.push(id)
  }
}

async function markHelpful(faqId) {
  try {
    const response = await apiClient.post(publicEndpoints.faqs.markHelpful(faqId))
    if (response.data?.success) {
      const faq = faqs.value.find(f => f.id === faqId)
      if (faq) {
        faq.helpful_count = (faq.helpful_count || 0) + 1
      }
      showSuccess('Cảm ơn bạn đã đánh giá câu trả lời này hữu ích!')
    }
  } catch (error) {
    console.error('Failed to mark FAQ as helpful:', error)
    showError('Đã có lỗi xảy ra. Vui lòng thử lại sau.')
  }
}
</script>
