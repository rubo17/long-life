import axios from 'axios'
import { onMounted, ref } from 'vue'
import { Product } from '../../../types/Product'

export function useProductsByCategory(id: string) {
  const products = ref<Product[]>([])
  const loading = ref(true)
  const error = ref(false)

  const currentPage = ref(1)
  const perPage = ref(6)
  const pagination = ref({
    currentPage: 1,
    perPage: 9,
    total: 0,
    totalPages: 0
  })

  const fetchProducts = async () => {
    loading.value = true
    try {
      const res = await axios.get(`http://localhost/longLifeBack/public/productsByCategory/${id}`, {
        params: {
          page: currentPage.value,
          perPage: perPage.value
        }
      })
      products.value = res.data.data
      pagination.value = res.data.pagination
      error.value = false
    } catch (err) {
      console.error(err)
      error.value = true
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchProducts)

  return {
    products,
    loading,
    error,
    fetchProducts,
    currentPage,
    pagination,
    perPage
  }
}
