<template>
  <div class="container mx-auto p-4">
    <AdminTestimonials />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-layout',
  requiresAuth: true,
  requiresAdmin: true
})

import AdminTestimonials from '@/components/Admin/Testimonials/AdminTestimonials.vue'
</script>

