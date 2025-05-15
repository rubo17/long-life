<!-- components/ui/BaseTable.vue -->
<template>
    <div class="overflow-x-auto w-full flex">
      <table class="min-w-full text-left text-sm text-gray-800">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key" class="px-4 py-2 font-bold">
              {{ column.label }}
            </th>
            <th v-if="showActions" class="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index" class="border-t">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-2 whitespace-nowrap"
          >
            <!-- Mostrar imagen si la columna es imagen -->
            <img
              v-if="column.key === 'imagen' && row[column.key]"
              :src="row[column.key]"
              alt="Imagen"
              class="w-40 h-40 object-cover rounded"
            />
            <!-- Mostrar texto normal -->
            <span v-else>
              {{ row[column.key]?.toString().length > 50 ? row[column.key].toString().slice(0, 50) + '...' : row[column.key] }}
            </span>
          </td>
            <td v-if="showActions" class="px-4 py-2">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!data.length" class="text-gray-500 text-sm p-4 text-center">Sin resultados</p>
      
    </div>
  </template>
  
  <script setup lang="ts">

  defineProps<{
    columns: { key: string; label: string }[],
    data: Record<string, any>[],
    showActions?: boolean
  }>()
  </script>