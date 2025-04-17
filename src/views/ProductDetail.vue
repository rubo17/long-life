<template>
  <div class="mt-20 mx-auto max-w-6xl p-6 space-y-10">
    <!-- Loader -->
    <div v-if="loading" class="flex justify-center items-center h-60">
      <div class="text-gray-600 text-lg animate-pulse">Cargando producto...</div>
    </div>

    <!-- Contenido principal -->
    <div v-else class="space-y-10">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <RouterLink to="/tienda" class="text-green-500 hover:underline">
          Volver a ver todos los productos
        </RouterLink>
        <span>|</span>
        <span class="font-medium text-gray-800">{{ product?.nombre }}</span>
      </div>

      <h1 class="text-4xl font-bold text-gray-900">
        {{ product?.nombre }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <img :src="product?.imagen || '/images/default-product.jpg'" alt="Imagen del producto"
            class="w-full h-auto rounded-xl shadow-md object-cover" />
        </div>

        <div class="space-y-5">
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">
            {{ product?.meta_descripcion }}
          </p>

          <div class="text-3xl font-bold text-green-600">
            {{ product?.precio }} €
          </div>

          <select class="block border rounded-md p-2" v-model="selectedQuantity">
            <option disabled selected >Selecciona las unidades</option>
            <option v-for="n in Number(product?.stock)" :key="n" :value="n">
              {{ n }}
            </option>
          </select>
          <p class="font-bold">En Stock: {{ product?.stock }}</p>

          <button @click="addToCart" :disabled="!isLoggedIn"
            class="px-6 py-2 rounded-full font-medium mt-4 w-full text-white transition-all" :class="{
              'bg-green-500 hover:bg-blue-500 cursor-pointer': isLoggedIn,
              'bg-gray-400 opacity-50 cursor-not-allowed': !isLoggedIn
            }">
            Añadir al carrito
          </button>
        </div>
      </div>

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
  </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useCart } from '../composables/api/carrito/UseCart';
import { useAuthLogin } from '../composables/api/login/UseUserLogin';
import { useProductById } from '../composables/api/productos/UseProductsById';
const activeTab = ref<'descripcion' | 'ingredientes'>('descripcion');
const route = useRoute();

const { product, fetchProduct, loading } = useProductById(route.params.id as string);
const router = useRouter();

console.log(product)
onMounted(async () => {
  await fetchProduct();
  console.log("Producto:", product.value);

});
const { addToCart: addToCartFn } = useCart();
const selectedQuantity = ref<number | null>(null);

const addToCart = () => {
  if (!product.value || !selectedQuantity.value) return;

  const item = {
    ...product.value,
    cantidad: selectedQuantity.value
  };

  addToCartFn(item);
  router.push('/carrito'); // opcional

};

const { isLoggedIn } = useAuthLogin();
</script>