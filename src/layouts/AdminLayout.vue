<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Contenido -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <AdminNavbar />
      <main class="flex-1 overflow-y-auto p-6 md:p-8">
        <RouterView />
      </main>
    </div>
  </div>
  <Notifications position="bottom right" />

</template>

<script setup>
import { Notifications } from '@kyvg/vue3-notification';
import AdminNavbar from '../components/admin/AdminNavbar.vue';
import AdminSidebar from '../components/admin/AdminSideabar.vue';
</script>
