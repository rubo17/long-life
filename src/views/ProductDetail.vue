<template>
  <div class="mt-20 mx-auto max-w-6xl p-6 space-y-10">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-sm text-gray-600">
      <RouterLink to="/tienda" class="text-green-500 hover:underline">
        Volver a ver todos los productos
      </RouterLink>
      <span>|</span>
      <span class="font-medium text-gray-800">{{ product?.nombre }}</span>
    </div>

    <!-- Nombre del producto -->
    <h1 class="text-4xl font-bold text-gray-900">
      {{ product?.nombre }}
    </h1>

    <!-- Info del producto -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      <!-- Imagen -->
      <div>
        <img :src="product?.imagen || '/images/default-product.jpg'" alt="Imagen del producto"
          class="w-full h-auto rounded-xl shadow-md object-cover" />
      </div>

      <!-- Info lateral -->
      <div class="space-y-5">
        <p class="text-gray-700 leading-relaxed whitespace-pre-line">
          {{ product?.meta_descripcion }}
        </p>

        <div class="text-3xl font-bold text-green-600">
          {{ product?.precio }} €
        </div>

        <!-- Selección unidades -->
        <select class="block border rounded-md p-2">
          <option disabled selected>Selecciona las unidades</option>
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
        <p class="font-bold">En Stock: {{ product?.stock }}</p>
        <!-- Botón -->
        <button @click="addToCart"
          class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow transition duration-300 font-medium cursor-pointer">
          Añadir al carrito
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="space-y-5">
      <div class="flex gap-5">
        <button @click="activeTab = 'descripcion'"
          :class="['p-2 border-b-4 cursor-pointer', activeTab === 'descripcion' ? 'border-blue-500' : 'border-transparent']">
          Descripción
        </button>
        <button @click="activeTab = 'ingredientes'"
          :class="['p-2 border-b-4 cursor-pointer', activeTab === 'ingredientes' ? 'border-blue-500' : 'border-transparent']">
          Ingredientes
        </button>
      </div>

      <!-- Contenido tabs -->
      <!-- Contenido tabs -->
      <div class="text-gray-700 leading-relaxed whitespace-pre-line">
        <p v-if="activeTab === 'descripcion'">
          {{ product?.descripcion }}
        </p>
        <p v-if="activeTab === 'ingredientes'">
          {{ product?.ingredientes }}
        </p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useProductById } from '../composables/api/UseProductsById';
const activeTab = ref<'descripcion' | 'ingredientes'>('descripcion');
const route = useRoute();

const { product,fetchProduct } = useProductById(route.params.id as string);

console.log(product)
onMounted(() => {
  setTimeout(async () => {
    await fetchProduct(); 
    console.log("Producto:", product.value);

  }, 500);
});
const addToCart = () => {
  console.log("Producto añadido al carrito");
};
</script>