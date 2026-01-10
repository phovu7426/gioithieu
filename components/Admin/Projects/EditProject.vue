<template>
  <div>
    <ProjectForm 
      v-if="showModal"
      :show="showModal"
      :project="project"
      :status-enums="statusEnums"
      :api-errors="apiErrors"
      @submit="handleSubmit" 
      @cancel="onClose" 
    />
  </div>
</template>

<script setup>
import ProjectForm from './ProjectForm.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  project: Object,
  statusEnums: {
    type: Array,
    default: () => []
  },
  apiErrors: Object
})

const emit = defineEmits(['updated', 'close'])

const showModal = ref(false)

watch(() => props.show, (newValue) => {
  showModal.value = newValue
}, { immediate: true })

async function handleSubmit(formData) {
  emit('updated', formData)
}

function onClose() {
  emit('close')
}
</script>

