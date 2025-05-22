<template>
  <div class="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-sm w-full">
      <h2 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{{ message }}</h2>
      <div class="flex justify-end gap-3">
        <button @click="$emit('cancel')" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Cancelar
        </button>
        <button @click="$emit('confirm')" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()

defineEmits(['confirm', 'cancel'])
</script>
