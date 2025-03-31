<template>
    <div class="group relative flex flex-col items-center p-4 border-2 border-transparent rounded-xl transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/10 space-y-2">
        
        <!-- Badge de edición limitada (opcional, lo puedes condicionar con una prop) -->
        <div v-if="isLimitedEdition" class="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
            <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold tracking-wider rounded-full shadow-md">
                EDICIÓN LIMITADA
            </span>
        </div>
        
        <!-- Contenedor de imagen -->
        <div class="mb-4 overflow-hidden rounded-lg w-full cursor-pointer">
            <img class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" 
                 :src="imageUrl" 
                 :alt="title">
        </div>
        
        <!-- Información del producto -->
        <div class="text-center w-full">
            <h3 class="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                {{ title }}
            </h3>
            <p class="text-gray-600 mt-1">Descripción breve del producto</p>
            <div class="mt-3 text-lg font-semibold text-green-600">${{ price }}</div>
        </div>
        
        <!-- Botón (aparece en hover) -->
        <button @click="addToCart" class="absolute cursor-pointer bottom-0 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 mt-4">
            Añadir al carrito
        </button>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    id: Number,
    title: String,
    imageUrl: String,
    price: Number,
    isLimitedEdition: Boolean
});

const addToCart = () => {
    console.log(`Producto agregado al carrito: ${props.title} (ID: ${props.id})`);
};
</script>
