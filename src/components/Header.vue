<template>
  <div class="bg-white mb-30 ">
    <header
      class="fixed inset-x-0 top-0 z-50 bg-white bg-opacity-60 backdrop-blur-lg backdrop-brightness-75 transition-all duration-300 shadow-md">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <RouterLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-20 w-auto" src="/images/longlife.png" alt="" />
          </RouterLink>
        </div>
        <div class="flex lg:hidden">
          <button type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 cursor-pointer"
            @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="{
            'text-blue-600': activeItem === item.name,
            'text-gray-900': activeItem !== item.name
          }" @click="activeItem = item.name" class="text-sm/6 font-semibold transition hover:text-green-500">
            {{ item.name }}
          </router-link>

          <!-- Icono de perfil -->
          <router-link
            v-if="isLoggedIn"
            to="/perfil"
            @click="activeItem = 'perfil'"
            :class="{
              'text-blue-600': activeItem === 'perfil',
              'text-gray-900': activeItem !== 'perfil'
            }"
            class="relative transition hover:text-green-500"
          >
            <Profile class="w-6 h-6" />

            <!-- Badge Premium -->
            <span
              v-if="esPremium"
              class="absolute -top-2 -right-2 bg-amber-400 text-white text-[9px] font-bold px-1 py-0.5 rounded-full"
            >
              ⭐
            </span>
          </router-link>


          <router-link v-if="isLoggedIn" to="/carrito" @click="activeItem = 'profile'" :class="{
            'text-blue-600': activeItem === 'profile',
            'text-gray-900': activeItem !== 'profile'
          }" class="relative transition hover:text-green-500">
            <Cart class="w-6 h-6" />

            <!-- Badge de cantidad -->
            <span v-if="cart.length > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {{ cart.length }}
            </span>
          </router-link>
        </div>

        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <RouterLink v-if="sessionState === 'Log in'" to="/login"
            class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 transition hover:text-green-500">
            {{ sessionState }} <span class="text-green-500" aria-hidden="true">&rarr;</span>
          </RouterLink>

          <!-- Log out como botón -->
          <p v-else @click="logout"
            class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-red-600 hover:text-red-400 cursor-pointer">
            {{ sessionState }} <span class="text-red-400" aria-hidden="true">&rarr;</span>
          </p>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <RouterLink @click="mobileMenuOpen=false" to="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-20 w-auto sm:hidden" src="/images/longlife.png" alt="" />
            </RouterLink>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6 cursor-pointer" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <RouterLink v-for="item in navigation" :key="item.name" :to="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 transition hover:text-green-500"
                  @click="mobileMenuOpen=false">
                  {{ item.name }}
                </RouterLink>
                <div class="space-y-3 ">
                  <RouterLink
                    @click="mobileMenuOpen = false"
                    class="block relative w-fit"
                    v-if="isLoggedIn"
                    to="/perfil"
                  >
                    <Profile class="w-6 h-6 transition hover:text-green-500" />
                    <span
                      v-if="esPremium"
                      class="absolute -top-2 -right-2 bg-yellow-400 text-white text-[10px] font-bold px-1 py-0.5 rounded-full shadow-sm"
                    >
                      ⭐
                    </span>
                  </RouterLink>
                  <RouterLink @click="mobileMenuOpen=false" class="block" to="/carrito">
                    <Cart class="w-6 h-6 transition hover:text-green-500" />
                  </RouterLink>
                </div>

              </div>
              <div class="py-6">
                <RouterLink v-if="sessionState === 'Log in'" to="/login"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 transition hover:text-green-500">
                  {{ sessionState }} <span class="text-green-500" aria-hidden="true">&rarr;</span>
                </RouterLink>

                <!-- Log out como botón -->
                <p v-else @click="logout"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-red-600 hover:text-red-400 cursor-pointer">
                  {{ sessionState }} <span class="text-red-400" aria-hidden="true">&rarr;</span>
                </p>

              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCart } from '../composables/api/carrito/UseCart'
import { useAuthLogin } from '../composables/api/login/UseUserLogin'
import Cart from './icons/Cart.vue'
import Profile from './icons/Profile.vue'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Que es longLife', href: '/QueEsLongLife' },
  { name: 'Planes', href: '/planes' },
  { name: 'Suscripciones', href: '/suscripciones' },
  { name: 'Tienda', href: '/tienda' },
  { name: 'Contacto', href: '/contacto' },
  ]

const sessionState = ref('') 
const mobileMenuOpen = ref(false)
const activeItem = ref('')

// ✅ Traemos todo de useAuthLogin ya preparado
const { logout, isLoggedIn, esPremium } = useAuthLogin()
const { cart, loadCart } = useCart()

if (localStorage.getItem('token')) {
  sessionState.value = 'Log out'
} else {
  sessionState.value = 'Log in'
}

onMounted(() => {
  loadCart()
})
</script>

