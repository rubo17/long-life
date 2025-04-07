<template>
  <button 
    class="flex-1 py-3 px-5 rounded-lg border-b-4 font-semibold transition-all duration-300 ease-in-out cursor-pointer"
    :class="{
      'border-green-500 text-green-700': active,
      'border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-700': !active
    }"
  >
    {{ name }}
  </button>
</template>

<script setup lang="ts">
    import { defineProps } from "vue";

    const props = defineProps({
        id_category: Number,
        name: String,
        active: Boolean
      });
</script>