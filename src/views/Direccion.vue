<template>
    <div class="container mx-auto space-y-6 px-4 py-6 rounded-lg min-h-screen">
      
      <div class="flex flex-col-reverse gap-6 lg:flex-row">
        <!-- Formulario de dirección -->
         
        <div class="w-full lg:w-3/5 space-y-6">

            <h1 class="text-lg font-semibold">Detalles de envío</h1>
            <div class="flex gap-4 justify-center text-center">
              <div
            :class="[
              'flex-1 border rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer transition',
              metodoEntrega === 'tienda' ? 'border-green-500' : 'border-gray-300'
            ]"
            @click="metodoEntrega = 'tienda'"
          >               
           <svg class="w-8 h-8 mb-1" viewBox="0 0 24 24"><path fill="currentColor" d="M20.001 11.452 20 18.99h2v2H2v-2h2v-7.534A4 4 0 0 1 2.005 8.19L2 7.99v-3a2 2 0 0 1 1.85-1.994L4 2.989h16a2 2 0 0 1 1.995 1.85v3a4 4 0 0 1-1.999 3.463Z" /></svg>
                <p class="text-sm">Recogida en tienda</p>
              </div>
              <div
                :class="[
                  'flex-1 border rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer transition',
                  metodoEntrega === 'domicilio' ? 'border-green-500' : 'border-gray-300'
                ]"
                @click="metodoEntrega = 'domicilio'"
              >            
                  <svg class="w-8 h-8 mb-1" viewBox="0 0 24 24"><path fill="currentColor" d="M7 8v2H2V8zm10.434-1H14v3h5.234zM20 12h-6v4h.17a3.001 3.001 0 0 1 5.66 0H20zm-3 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" /></svg>
                <p class="text-sm">Entrega a domicilio</p>
              </div>
            </div>

            <FormularioDireccion
              :metodo-entrega="metodoEntrega"
            />  
      </div>
        <!-- Resumen del pedido -->
        <div class="w-full lg:w-2/5">
            <DetallesPedido/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
import DetallesPedido from '../components/finalizarCompra/DetallesPedido.vue';
import FormularioDireccion from '../components/finalizarCompra/FormularioDireccion.vue';
const metodoEntrega = ref<'tienda' | 'domicilio'>('domicilio')

 
  </script>
  