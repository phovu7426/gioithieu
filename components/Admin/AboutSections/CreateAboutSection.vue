<template>
  <AboutSectionForm 
    :show="show" 
    :api-errors="apiErrors"
    @submit="handleSubmit" 
    @cancel="onClose" 
  />
</template>

<script setup>
import AboutSectionForm from './AboutSectionForm.vue'

const props = defineProps({
  show: Boolean,
  apiErrors: Object
})

const emit = defineEmits(['created', 'close'])

function handleSubmit(formData) {
  emit('created', formData)
}

function onClose() {
  emit('close')
}
</script>

