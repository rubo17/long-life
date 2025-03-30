<script setup>
import AdminHeader from '../components/admin/AdminHeader.vue';
import AdminSideabar from '../components/admin/AdminSideabar.vue';
</script>

<template>
  <div class="flex">
    <AdminSideabar />
    <div class="flex-1">
      <AdminHeader />
      <div class="p-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>
