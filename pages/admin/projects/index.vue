<template>
  <div class="container mx-auto p-4">
    <AdminProjects />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
  requiresAuth: true,
  requiresAdmin: true
})

import AdminProjects from '@/components/Admin/Projects/AdminProjects.vue'
</script>

