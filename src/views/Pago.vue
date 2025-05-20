<template>
    <div class="min-h-screen">
        <div class="flex flex-col">
            <div class="w-full">
                <DetallesPedido :cupon="cupon" />
            </div>
            <div class="w-full ">
                <Checkout/>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Checkout from '../components/finalizarCompra/Checkout.vue';
import DetallesPedido from '../components/finalizarCompra/DetallesPedido.vue';

const cupon = ref(null)

onMounted(() => {
  const stored = localStorage.getItem('cuponInfo')
  if (stored) {
    try {
      cupon.value = JSON.parse(stored)
    } catch {
      cupon.value = null
    }
  }
})
</script>