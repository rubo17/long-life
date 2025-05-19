

<template>
  <div class="mt-35 container mx-auto px-4 py-10 space-y-10">
    <!-- Cabecera -->
    <div class="text-center border-b-4 border-blue-500 pb-5">
      <h1 class="text-3xl font-bold text-gray-800">Tu carrito</h1>
    </div>

    <div class="p-5 space-y-10">
        <!-- Mensaje de producto añadido -->
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-green-50 px-4 py-4 rounded-md min-h-[100px]">
        <!-- Mensaje -->
        <div class="flex items-center gap-3 text-green-700 text-center md:text-left">
          <Positivo v-if="cart.length > 0" class="w-6 h-6 text-green-500" />
          <p class="text-sm">
            <span v-if="cart.length > 0">{{ cart[cart.length - 1]?.nombre }} se ha añadido a tu carrito.</span>
            <span v-else>El carrito está vacío.</span>
          </p>
        </div>

        <!-- Botón -->
        <router-link
          class="w-full md:w-auto text-sm text-white text-center px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          to="/tienda"
        >
          Seguir comprando
        </router-link>
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
            <router-link 
            :to="'/finalizarCompra/direccion'"
            class="block w-full text-center mt-4 py-2 px-4 rounded-lg transition shadow
                  text-white
                  bg-blue-500 hover:bg-blue-600
                  disabled-link"
          >
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


const { cart, getTotal, loadCart,error } = useCart();

onMounted(async () => {
  await loadCart();
});

</script>