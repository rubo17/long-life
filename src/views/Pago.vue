<template>
    <div class="min-h-screen">
        <div class="flex flex-col">
            <div class="w-full">
                <DetallesPedido/>
            </div>
            <div class="w-full ">
                <Checkout/>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import Checkout from '../components/finalizarCompra/Checkout.vue';
import DetallesPedido from '../components/finalizarCompra/DetallesPedido.vue';
</script>