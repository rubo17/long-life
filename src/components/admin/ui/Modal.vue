<!-- components/ui/Modal.vue -->
<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 bg-opacity-50 flex items-center overflow-auto justify-center ">
        <div class="bg-white p-6 md:p-8 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border border-gray-500">
            <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl cursor-pointer">
          &times;
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
}>()
defineEmits(['close'])
</script>
