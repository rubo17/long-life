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
</template>

<script setup>
import AdminNavbar from '../components/admin/AdminNavbar.vue';
import AdminSidebar from '../components/admin/AdminSideabar.vue';
</script>
