<template>
    <div class="mt-35 p-10 container mx-auto space-y-6">
      <div>
        <BuscarProducto @buscar="handleSearch" />
      </div>
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

        <Paginator
         :currentPage="currentPage"
         :totalPages="pagination.totalPages"
         @changePage="handlePageChange"
    />
    
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Paginator from '../components/Paginator.vue'
import BuscarProducto from '../components/tienda/BuscarProducto.vue'
import CategoryProductCard from '../components/tienda/CategoryProductCard.vue'
import ProductCard from '../components/tienda/ProductCard.vue'
import { UseCategoryProducts } from '../composables/api/productos/UseCategoryProducts'
import { useProducts } from '../composables/api/productos/UseProducts'
import { useProductsByCategory } from '../composables/api/productos/UseProductsByCategory'
import { Product } from '../types/Product'

// Variables globales
const activeCategoryId = ref<string>('todos')
const products = ref<Product[]>([])
const currentCategory = ref<string | undefined>('Todos los productos')
const currentDescriptionCategory = ref<string | undefined>('Tanto si tu objetivo es controlar tu peso, nutrir tus entrenamientos, abordar necesidades nutricionales específicas o perfeccionar tu rutina de cuidado de la piel, nuestra gama de productos te ofrece todo lo que necesitas.')
const { categoryProducts } = UseCategoryProducts()

// useProducts para todos los productos
const { products: allProducts, fetchProducts: fetchAllProducts, currentPage: currentPageAll, pagination: paginationAll } = useProducts()

// Datos para productos por categoría (se crean después)
let productsByCategory = ref<Product[]>([])
let fetchCategoryProducts: () => Promise<void>
let currentPageCategory = ref(1)
let paginationCategory = ref({ currentPage: 1, perPage: 6, total: 0, totalPages: 1 })

// Computed dinámico
const currentPage = computed(() => {
  return activeCategoryId.value === 'todos' ? currentPageAll.value : currentPageCategory.value
})

const pagination = computed(() => {
  return activeCategoryId.value === 'todos' ? paginationAll.value : paginationCategory.value
})
const handleSearch = (query: string) => {
  const all = activeCategoryId.value === 'todos' ? allProducts.value : productsByCategory.value
  products.value = all.filter(p => p.nombre.toLowerCase().includes(query.toLowerCase()))
}

// onMounted
onMounted(async () => {
  await fetchAllProducts()
  products.value = allProducts.value || []
})

// Manejar selección en el select (móvil)
const handleSelectCategory = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const value = target.value

  if (value === 'todos') {
    filterByCategory('todos', 'Todos los productos')
    return
  }

  const [id, name] = value.split('||')
  filterByCategory(id, name)
}

// Filtro de categoría
const filterByCategory = async (id: string, nombre?: string, description?: string) => {
  currentCategory.value = nombre
  activeCategoryId.value = id
  currentDescriptionCategory.value = description

  if (id === 'todos') {
    currentPageAll.value = 1
    await fetchAllProducts()
    products.value = allProducts.value || []
  } else {
    // Cargar productos por categoría (creando el composable dinámicamente)
    const categoryComposable = useProductsByCategory(id)
    productsByCategory = categoryComposable.products
    fetchCategoryProducts = categoryComposable.fetchProducts
    currentPageCategory = categoryComposable.currentPage
    paginationCategory = categoryComposable.pagination

    currentPageCategory.value = 1
    await fetchCategoryProducts()
    products.value = productsByCategory.value || []
  }
}

async function handlePageChange(page: number) {
  if (activeCategoryId.value === 'todos') {
    currentPageAll.value = page
    await fetchAllProducts()
    products.value = allProducts.value || []
  } else {
    currentPageCategory.value = page
    await fetchCategoryProducts()
    products.value = productsByCategory.value || []
  }
}
</script>
