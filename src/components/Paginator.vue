<template>
    <div class="flex items-center justify-center mt-6">
      <nav class="isolate inline-flex -space-x-px rounded-md shadow" aria-label="Pagination">
        <!-- Anterior -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'relative inline-flex items-center rounded-l-md px-2 py-2 text-sm ring-1 ring-inset focus:z-20',
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed bg-white'
              : 'text-gray-500 hover:bg-gray-100 ring-gray-300'
          ]"
        >
          <span class="sr-only">Anterior</span>
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12.28 15.22a.75.75 0 01-1.06 0L6.97 11.03a.75.75 0 010-1.06l4.25-4.25a.75.75 0 111.06 1.06L8.56 10l3.72 3.72a.75.75 0 010 1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
  
        <!-- Números -->
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset cursor-pointer',
            page === currentPage
              ? 'z-10 bg-indigo-600 text-white ring-indigo-600'
              : 'text-gray-900 hover:bg-gray-50 ring-gray-300'
          ]"
        >
          {{ page }}
        </button>
  
        <!-- Siguiente -->
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="[
            'relative inline-flex items-center rounded-r-md px-2 py-2 text-sm ring-1 ring-inset focus:z-20',
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed bg-white'
              : 'text-gray-500 hover:bg-gray-100 ring-gray-300'
          ]"
        >
          <span class="sr-only">Siguiente</span>
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M7.72 4.78a.75.75 0 011.06 0L13.03 9a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 11-1.06-1.06L11.44 10 7.72 6.28a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </nav>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineEmits, defineProps } from 'vue';
  
  const props = defineProps<{
    currentPage: number
    totalPages: number
  }>()
  
  const emit = defineEmits<{
    (e: 'changePage', page: number): void
  }>()
  
  function goToPage(page: number) {
    if (page >= 1 && page <= props.totalPages) {
      emit('changePage', page)
    }
  }
  </script>
  