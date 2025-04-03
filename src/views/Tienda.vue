<template>
    <div class="mt-35 p-10 container mx-auto space-y-6">
        <!-- Título y descripción -->
        <div class="flex flex-col lg:flex-row justify-center items-center gap-5">
            <h2 class="text-green-500 text-6xl font-bold text-center">
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
                <CategoryProductCard name="Todos los productos"/>                
                <!-- Asegurar que el componente `CategoryProducts` se renderiza -->
                <CategoryProductCard
                    v-for="category in categoryProducts"
                    :key="category.id_categoria"
                    :name="category.nombre"
                />
            </div>

            <!-- Para pantallas móviles: menú desplegable -->
            <div class="lg:hidden">
                <select class="w-full p-2 border rounded-md text-gray-700">
                    <option>Todos los productos</option>
                    <option v-for="category in categoryProducts" :key="category.id_categoria">
                        {{ category.nombre }}
                    </option>
                </select>
            </div>
        </div>

        <!-- Productos -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center items-center mt-20 space-y-6">
            <ProductCard
                v-for="product in products"
                :key="product.id_producto"
                :id_producto="product.id_producto"
                :title="product.nombre"
                :descripcion="product.meta_descripcion"
                :imageUrl="product.imagen"
                :price="product.precio"
                :estado="product.estado"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import CategoryProductCard from '../components/tienda/CategoryProductCard.vue';
import ProductCard from '../components/tienda/ProductCard.vue';
import { UseCategoryProducts } from '../composables/UseCategoryProducts';
import { UseProducts } from '../composables/UseProducts';

const {products} = UseProducts();
const {categoryProducts} = UseCategoryProducts();
console.log(categoryProducts);

</script>