<template>
  <div class="container mx-auto p-4">
    <AdminGallery />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-layout',
  requiresAuth: true,
  requiresAdmin: true
})

import AdminGallery from '@/components/Admin/Gallery/AdminGallery.vue'
</script>

