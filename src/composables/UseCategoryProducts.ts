import axios from 'axios';
import { onMounted, ref } from 'vue';

export interface CategoryProducts {
  id_categoria: string;
  nombre: string;
}

export function UseCategoryProducts() {
  const categoryProducts = ref<CategoryProducts[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<boolean>(false);

  const fetchCategoryProducts = async () => {
    try {
      const response = await axios.get<CategoryProducts[]>('http://localhost/longLifeBack/public/category_products');
      categoryProducts.value = response.data;
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
