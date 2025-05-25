<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
    <div class="bg-white p-6 rounded-lg max-w-md w-full shadow-lg space-y-4">
      <h2 class="text-xl font-bold text-green-600">{{ title }}</h2>
      <p class="text-gray-700 whitespace-pre-line">{{ message }}</p>
      <div class="text-right">
        <button @click="$emit('close')" class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  message: string
}>()
defineEmits(['close'])
</script>