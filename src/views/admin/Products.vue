<template>
  <div class="container mx-auto p-6 space-y-10">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold mb-4">Productos</h1>
    </div>

    <div v-if="loading">Cargando productos...</div>
    <div v-else-if="error">Error al cargar los productos.</div>

    <BaseTable :columns="columns" :data="products" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import BaseTable from '../../components/admin/ui/BaseTable.vue'
import { useProducts } from '../../composables/api/productos/UseProducts'

const { products, loading, error, fetchProducts } = useProducts()

const columns = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'precio', label: 'precio' },
  { key: 'stock', label: 'Stock' }
]

onMounted(fetchProducts)
</script>
