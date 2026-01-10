<template>
  <div class="container mx-auto p-4">
    <AdminStaff />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-layout',
  requiresAuth: true,
  requiresAdmin: true
})

import AdminStaff from '@/components/Admin/Staff/AdminStaff.vue'
</script>

