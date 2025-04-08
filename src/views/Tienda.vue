<template>
    <div class="mt-35 p-10 container mx-auto space-y-6">
        <!-- Título y descripción -->
        <div class="flex flex-col lg:flex-row justify-center items-center gap-5">
            <h2 class="text-green-500 text-6xl font-bold text-center">
                {{ currentCategory }}
            </h2>
            <p class="text-gray-500 text-lg text-center lg:text-left">
                {{ currentDescriptionCategory }}
            </p>
        </div>

        <!-- Categorías -->
        <div class="">
            <div class="hidden lg:flex w-full gap-4">
                    <CategoryProductCard :active="activeCategoryId=='todos'"  @click="filterByCategory('todos','Todos los productos','Tanto si tu objetivo es controlar tu peso, nutrir tus entrenamientos, abordar necesidades nutricionales específicas o perfeccionar tu rutina de cuidado de la piel, nuestra gama de productos te ofrece todo lo que necesitas.')" name="Todos los productos"/>     

                        <CategoryProductCard :active="activeCategoryId==category.id_categoria"  v-for="category in categoryProducts" :key="category.id_categoria"
                            @click="filterByCategory(category.id_categoria,category.nombre,category.descripcion)"
                            :name="category.nombre"
                        />
            </div>

            <!-- Para pantallas móviles: menú desplegable -->
            <div class="lg:hidden">
                <select
                    class="w-full p-2 border rounded-md text-gray-700"
                    @change="(e) => handleSelectCategory(e)"
                >
                    <option value="todos">Todos los productos</option>
                    <option
                    v-for="category in categoryProducts"
                    :key="category.id_categoria"
                    :value="category.id_categoria + '||' + category.nombre"
                    >
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
            :product="product"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
import CategoryProductCard from '../components/tienda/CategoryProductCard.vue';
import ProductCard from '../components/tienda/ProductCard.vue';
import { UseCategoryProducts } from '../composables/api/UseCategoryProducts';
import { useProducts } from '../composables/api/UseProducts';
import { useProductsByCategory } from '../composables/api/UseProductsByCategory';
import { Product } from '../types/Product';

    const activeCategoryId = ref<string>('todos'); // ID activa por defecto
    const products = ref<Product[]>([]);
        const currentCategory = ref<string | undefined>("Todos los productos");
         const currentDescriptionCategory = ref<string | undefined>("Tanto si tu objetivo es controlar tu peso, nutrir tus entrenamientos, abordar necesidades nutricionales específicas o perfeccionar tu rutina de cuidado de la piel, nuestra gama de productos te ofrece todo lo que necesitas.");
        const { categoryProducts } = UseCategoryProducts();
    
    onMounted(async () => {
        const { products: all, fetchProducts } = useProducts();
        await fetchProducts();
        products.value = all.value || [];
    });
    const handleSelectCategory = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        const value = target.value;

        if (value === "todos") {
            filterByCategory("todos", "Todos los productos");
            return;
        }

        const [id, name] = value.split("||");
        filterByCategory(id, name);
    };

    const filterByCategory = async (id: string,nombre?:string,description?:string) => {
        console.log("Descripcion de "+nombre+" "+description)
        currentCategory.value = nombre;
         activeCategoryId.value =id
        currentDescriptionCategory.value= description
        console.log(currentCategory.value)

        if (id === "todos") {
            const { products: all, fetchProducts } = useProducts();
            await fetchProducts();
            products.value = all.value || [];
        } else {
            const { products: byCategory, fetchProducts } = useProductsByCategory(id);
            await fetchProducts();
            products.value = byCategory.value || [];
        }
    };
</script>
