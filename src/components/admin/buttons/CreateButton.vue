<template>
    <button 
       @click="onClick"
        class="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-200 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
        <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
            </svg>
            {{ text }}
        </span>
    </button>
</template>
<script setup lang="ts">
defineProps<{
  text: string,
  onClick: () => void // 👈 Aquí defines la función como prop
}>();
</script>