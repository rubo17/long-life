

<template>
  <div class="mt-35 container mx-auto px-4 py-10 space-y-10">
    <!-- Cabecera -->
    <div class="text-center border-b-4 border-blue-500 pb-5">
      <h1 class="text-3xl font-bold text-gray-800">Tu carrito</h1>
    </div>

    <div class="p-5 space-y-10">
        <!-- Mensaje de producto añadido -->
        <div class="flex justify-between items-center bg-green-50 px-4 py-2 rounded-md">
        <div class="flex items-center gap-3 text-green-700">
            <Positivo v-if="cart.length>0" class="w-6 h-6 text-green-500" />
              <p v-if="cart.length>0" class="text-sm">{{ cart[cart.length - 1]?.nombre }} se ha añadido a tu carrito.</p>
              <p v-if="cart.length==0" class="text-sm">El carrito esta vacio.</p>
            </div>
        <router-link class="text-sm text-white p-4 bg-gray-800 rounded-lg cursor-pointer" to="/tienda">Seguir comprando</router-link>
        </div>

        <!-- Lista de productos -->
        <ProductInCart v-if="cart.length > 0" :products="cart" />

        <!-- Resumen del total -->
        <div class="flex justify-center">
        <div class="w-full  space-y-3 text-right">
            <div class="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>{{ getTotal() }}€</span>  
            </div>
            <router-link to="/finalizarCompra/direccion"
            class="block w-full text-center mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition shadow cursor-pointer">
            Finalizar compra
          </router-link>
        </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import Positivo from '../components/icons/Positivo.vue';
import ProductInCart from "../components/tienda/ProductInCart.vue";
import { useCart } from '../composables/api/carrito/UseCart';


const { cart, getTotal, loadCart } = useCart();

onMounted(async () => {
  await loadCart();
});

</script>