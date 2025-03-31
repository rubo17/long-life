<template>
    <div class="mt-35 p-10 container mx-auto space-y-6">
        <!-- Título y descripción -->
        <div class="flex flex-col lg:flex-row justify-center items-center gap-5">
            <h2 class="text-green-500 text-4xl font-bold text-center">
                TODOS LOS PRODUCTOS
            </h2>
            <p class="text-gray-500 text-lg text-center lg:text-left">
                Tanto si tu objetivo es controlar tu peso, nutrir tus entrenamientos, abordar necesidades
                nutricionales específicas o perfeccionar tu rutina de cuidado de la piel, nuestra gama de
                productos te ofrece todo lo que necesitas.
            </p>
        </div>

        <!-- Categorías -->
        <div class="">
            <!-- Para pantallas grandes: botones en línea -->
            <div class="hidden lg:flex w-full gap-4">
                <button
                    class="flex-1 py-2 px-4 rounded-md  border-b-2 border-green-500 cursor-pointer transition hover:border-b-4">
                    Todos los productos
                </button>
                <button class="flex-1 py-2 px-4 rounded-md transition border-b-2 border-green-500 cursor-pointer">
                    Todos los productos
                </button>
                <button class="flex-1 py-2 px-4 rounded-md transition border-b-2 border-green-500 cursor-pointer">
                    Todos los productos
                </button>
                <button class="flex-1 py-2 px-4 rounded-md transition border-b-2 border-green-500 cursor-pointer">
                    Todos los productos
                </button>

            </div>

            <!-- Para pantallas móviles: menú desplegable -->
            <div class="lg:hidden">
                <select class="w-full p-2 border rounded-md text-gray-700">
                    <option>Todos los productos</option>
                    <option>Nutrición día a día</option>
                    <option>Rendimiento deportivo</option>
                    <option>Cuidado de la piel</option>
                </select>
            </div>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center mt-20 space-y-6">
            <ProductCard 
                id="1"
                title="LIFT-OFF"
                imageUrl="/images/products/lift-off.webp"
                :price="99.99"
                :isLimitedEdition="true"
             />
        
            <ProductCard 
                id="2"
                title="ENERGY BOOST"
                imageUrl="/images/products/lift-off.webp"
                :price="79.99"
                :isLimitedEdition="false"
            />
            
            <ProductCard 
                id="3"
                title="PROTEIN SHAKE"
                imageUrl="/images/products/lift-off.webp"
                :price="49.99"
                :isLimitedEdition="true"
            />
        </div>
    </div>
</template>


<script setup>
import ProductCard from '../components/ProductCard.vue';



</script>