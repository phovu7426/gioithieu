<template>
  <div class="container mx-auto p-4">
    <AdminPartners />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-layout',
  requiresAuth: true,
  requiresAdmin: true
})

import AdminPartners from '@/components/Admin/Partners/AdminPartners.vue'
</script>

