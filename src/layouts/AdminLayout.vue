<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar para pantallas grandes -->
    <AdminSidebar v-if="!isMobile || showSidebar" class="hidden md:block" />

    <!-- Overlay sidebar en móviles -->
    <transition name="fade">
      <AdminSidebar
        v-if="isMobile && showSidebar"
        class="fixed z-50 inset-0 bg-[#1E293B] bg-opacity-50 md:hidden"
        @close="showSidebar = false"
      />
    </transition>

    <!-- Contenido principal -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar @toggleSidebar="toggleSidebar" />
      <main class="flex-1 overflow-y-auto p-6 md:p-8">
        <RouterView />
      </main>
    </div>
  </div>
  <Notifications position="bottom right" />
</template>

<script setup>
import { Notifications } from '@kyvg/vue3-notification'
import { onMounted, ref } from 'vue'
import AdminNavbar from '../components/admin/AdminNavbar.vue'
import AdminSidebar from '../components/admin/AdminSideabar.vue'

const showSidebar = ref(false)
const isMobile = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

onMounted(() => {
  const checkMobile = () => isMobile.value = window.innerWidth < 768
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>
