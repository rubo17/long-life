import { ref, watch } from 'vue';
import { Product } from '../types/Product';

const cart = ref<Product[]>([]);

// Cargar del localStorage solo una vez al iniciar
const loadCart = () => {
  const stored = localStorage.getItem('productsInCart');
  if (stored) {
    try {
      cart.value = JSON.parse(stored);
    } catch (e) {
      console.error("Error al parsear el carrito:", e);
      cart.value = [];
    }
  }
};

// Guardar cada vez que el carrito cambie
watch(cart, (newVal) => {
  localStorage.setItem('productsInCart', JSON.stringify(newVal));
}, { deep: true });
const removeFromCart = (id: string) => {
    cart.value = cart.value.filter(p => p.id_producto !== id);
  };

const addToCart = (product: Product) => {
  const existing = cart.value.find(p => p.id_producto === product.id_producto);
  if (existing) {
    existing.cantidad++;
  } else {
    cart.value.push({ ...product, cantidad: 1 }); 
  }
};

const clearCart = () => {
  cart.value = [];
};

const getTotal = () => {
  return cart.value.reduce((total, item) => total + item.precio * item.cantidad, 0);
};

const getItemCount = () => {
  return cart.value.reduce((count, item) => count + item.cantidad, 0);
};

loadCart(); 

export function useCart() {
  return {
    cart,
    addToCart,
    clearCart,
    getTotal,
    getItemCount,
    removeFromCart
  };
}
