<template>
        <button
            @click="props.addToCart"
            :disabled="!isLoggedIn"
            class="absolute bottom-0 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 px-6 py-2 rounded-full font-medium mt-4"
            :class="[
                isLoggedIn ? 'bg-green-500 text-white hover:bg-blue-500 cursor-pointer' : 'bg-gray-400 text-white cursor-not-allowed'
            ]"
            >
            Añadir al carrito
            </button>
</template>

<script setup lang="ts">
  import { useAuthLogin } from '../../composables/api/login/UseUserLogin';

  const props = defineProps<{
    addToCart: () => void
  }>()
      
  const { isLoggedIn } = useAuthLogin();

</script>