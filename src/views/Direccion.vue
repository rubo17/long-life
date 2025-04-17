<template>
    <div class="container mx-auto space-y-6 px-4 py-6 rounded-lg">
      <div class="flex flex-col-reverse gap-6 lg:flex-row">
        <!-- Formulario de dirección -->
        <div class="w-full lg:w-3/5 ">
            <FormularioDireccion/>
        </div>
  
        <!-- Resumen del pedido -->
        <div class="w-full lg:w-2/5">
            <DetallesPedido/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import DetallesPedido from '../components/finalizarCompra/DetallesPedido.vue';
import FormularioDireccion from '../components/finalizarCompra/FormularioDireccion.vue';
  
 
  </script>
  