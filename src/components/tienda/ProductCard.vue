<template>
    <div class="group relative flex flex-col items-center p-4 border-2 border-transparent rounded-xl transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/10 space-y-2">
        
        <!-- Badge de edición limitada (opcional, lo puedes condicionar con una prop) -->
        <div v-if="product.estado" class="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold tracking-wider rounded-full shadow-md">
                {{ product.estado }}
            </span>
        </div>
        
        <!-- Contenedor de imagen -->
        <div @click="goToDetails" class="mb-4 overflow-hidden rounded-lg w-full cursor-pointer">
            <img class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" 
                 :src="product.imagen" 
                 :alt="product.nombre">
        </div>
        
        <!-- Información del producto -->
        <div class="text-center w-full">
            <h3 class="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                {{ product.nombre }}
            </h3>
            <p class="text-gray-600 mt-1">{{ product.meta_descripcion }}</p>
            <div class="mt-3 text-lg font-semibold text-green-600">{{ product.precio }} €</div>
        </div>
        
        <!-- Botón (aparece en hover) -->
        <AddToCart :addToCart="addToCart" />

    </div>
</template>

<script setup lang="ts">
    import { notify } from "@kyvg/vue3-notification";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { useCart } from "../../composables/api/carrito/UseCart";
import { Product } from "../../types/Product";
import AddToCart from "../buttons/AddToCart.vue";
    const props = defineProps<{
     product: Product
    }>()
    const router = useRouter();
    
    const goToDetails = () => {
        router.push({ name: 'productDetail', params: { id: props.product.id_producto } });
    };
    const { addToCart: addToCartFn, cart } = useCart();

    const addToCart = async () => {
        const existingProduct = cart.value.find(p => p.id_producto === props.product.id_producto);
        const totalCantidad = (existingProduct?.cantidad || 0) + 1;
        if (totalCantidad > Number(props.product.stock)) {
            notify({
                type: 'error',
                text: 'No hay stock de este producto'
                });
                return
            }
    await addToCartFn(props.product);
    router.push('/carrito'); // opcional
    };
 
</script>
