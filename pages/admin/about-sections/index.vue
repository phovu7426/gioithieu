<template>
  <div class="container mx-auto p-4">
    <AdminAboutSections />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-layout',
  requiresAuth: true,
  requiresAdmin: true
})

import AdminAboutSections from '@/components/Admin/AboutSections/AdminAboutSections.vue'
</script>

