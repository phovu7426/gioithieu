<template>
  <div class="container mx-auto p-4">
    <AdminCertificates />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-layout',
  requiresAuth: true,
  requiresAdmin: true
})

import AdminCertificates from '@/components/Admin/Certificates/AdminCertificates.vue'
</script>

