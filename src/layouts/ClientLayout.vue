<template>
  <!-- Solo muestra Header si NO estamos en /login -->
  <Header   v-if="!['/login', '/register'].includes(route.path) && !route.path.startsWith('/resetPassword') && !route.path.startsWith('/forgotPassword')"
  />

  <div class="mt-30 min-h-screen leading-relaxed">
    <RouterView />
  </div>

  <!-- Solo muestra Footer si NO estamos en /login -->
  <Footer   v-if="!['/login', '/register'].includes(route.path) && !route.path.startsWith('/resetPassword') && !route.path.startsWith('/forgotPassword')"  />
  <router-link v-if="isAdmin"
    to="/admin"
    class="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition"
  >
    Administrar
  </router-link>
  <Notifications position="bottom right" />

</template>

<script setup lang="ts">

import { Notifications } from '@kyvg/vue3-notification';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Footer from '../components/Footer.vue';
import Header from '../components/Header.vue';
import { useRole } from '../composables/UseRole';

const route = useRoute();
const { isAdmin, updateRole } = useRole();

onMounted(updateRole); // se ejecuta al montar



</script>