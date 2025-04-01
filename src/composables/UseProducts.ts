import axios from 'axios';
import { onMounted, ref } from 'vue';

export interface Product {
  id_producto: string;
  nombre: string;
  meta_descripcion: string;
  descripcion: string;
  ingredientes: string;
  precio: Number;
  id_categoria_producto: string;
  imagen: string;
  stock: string;
  estado:string;
}

export function UseProducts() {
  const products = ref<Product[]>([]);
  const loading = ref<boolean>(true);
  const error = ref<boolean>(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost/longLifeBack/public/products');
      products.value = response.data;
      console.log(products.value)
    } catch (err) {
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchProducts);

  return { products, loading, error, fetchProducts };
}
