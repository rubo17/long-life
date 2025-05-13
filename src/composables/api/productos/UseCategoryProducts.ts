import { onMounted, ref } from 'vue';
import api from '../../../api/axios';

export interface CategoryProducts {
  id_categoria: string;
  nombre: string;
  descripcion: string;
}

export function UseCategoryProducts() {
  const categoryProducts = ref<CategoryProducts[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<boolean>(false);

  const fetchCategoryProducts = async () => {
    try {
      const response = await api.get<CategoryProducts[],any>('/category_products');
      categoryProducts.value = response.data.data;
      console.log(categoryProducts.value)
    } catch (err) {
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchCategoryProducts);

  return { categoryProducts, loading, error, fetchCategoryProducts };
}
