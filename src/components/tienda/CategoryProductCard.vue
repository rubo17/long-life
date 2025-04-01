<template>
    <button 
      class="flex-1 py-3 px-5 rounded-lg border-b-4 border-gray-300 text-gray-700 font-semibold
      transition-all duration-300 ease-in-out hover:border-green-500 hover:text-green-700
       active:scale-95 cursor-pointer">
      {{ name }}
    </button>
  </template>
  
<script setup lang="ts">
    import { defineProps } from "vue";

    const props = defineProps({
        id_category: Number,
        name: String,
    });
</script>