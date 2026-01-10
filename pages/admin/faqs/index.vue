<template>
  <div class="container mx-auto p-4">
    <AdminFAQs />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-layout',
  requiresAuth: true,
  requiresAdmin: true
})

import AdminFAQs from '@/components/Admin/FAQs/AdminFAQs.vue'
</script>

