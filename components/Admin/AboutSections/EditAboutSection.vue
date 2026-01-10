<template>
  <AboutSectionForm 
    :show="show" 
    :section="section"
    :api-errors="apiErrors"
    @submit="handleSubmit" 
    @cancel="onClose" 
  />
</template>

<script setup>
import AboutSectionForm from './AboutSectionForm.vue'

const props = defineProps({
  show: Boolean,
  section: Object,
  apiErrors: Object
})

const emit = defineEmits(['updated', 'close'])

function handleSubmit(formData) {
  emit('updated', formData)
}

function onClose() {
  emit('close')
}
</script>

