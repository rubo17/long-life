<template>
        <div class="space-y-6">
            <div v-for="product in products" :key="product.id_producto" class="flex items-center gap-6 border-b pb-4">
                <img :src="product.imagen" alt="" class="w-30 h-30  rounded-md" />
                <div class="flex-1">
                    <h2 class="text-lg font-semibold text-gray-800">{{ product.nombre }}</h2>
                    <p class="text-gray-500 text-sm">Cantidad: {{ product.cantidad }}</p>
                </div>
                <div class="text-right flex gap-10">
                    <div>
                        <p class="text-gray-800 font-medium">Precio: {{ product.precio }} €</p>
                        <p class="text-sm text-gray-500">Subtotal: {{ product.precio * product.cantidad}} €</p>
                    </div>
                    <div class="flex justify-center items-center">
                        <CrossIcon @click="removeFromCart(product.id_producto)" class="w-5 h-5 cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useCart } from '../../composables/UseCart';
import { Product } from '../../types/Product';
import CrossIcon from '../icons/CrossIcon.vue';


const props = defineProps<{
  products: Product[]
}>()
const {removeFromCart}= useCart();

</script>