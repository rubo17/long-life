<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
  
</script>

<template>
    <Header></Header>
    <div  class=" mt-30 min-h-screen">
      <RouterView />
  </div>  
  <Footer></Footer>
</template>

<style scoped>

</style>
