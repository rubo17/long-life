<template>
  <div class="bg-white mb-30 ">
    <header
      class="fixed inset-x-0 top-0 z-50 bg-white bg-opacity-60 backdrop-blur-lg backdrop-brightness-75 transition-all duration-300 shadow-md">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-20 w-auto" src="/images/longlife.png" alt="" />
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 cursor-pointer"
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

          <!-- Ícono de perfil -->
          <a v-if="isLoggedIn" href="/admin" @click="activeItem = 'cart'" :class="{
            'text-blue-600': activeItem === 'cart',
            'text-gray-900': activeItem !== 'cart'
          }">
            <Profile class="w-6 h-6 transition hover:text-green-500" />
          </a>
          <router-link
            to="/carrito"
            @click="activeItem = 'profile'"
            :class="{
              'text-blue-600': activeItem === 'profile',
              'text-gray-900': activeItem !== 'profile'
            }"
            class="transition hover:text-green-500"
          >
          <Cart class="w-6 h-6" />
        </router-link>
        </div>

        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
                  v-if="sessionState === 'Log in'"
                  href="/login"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 transition hover:text-green-500"
                >
                  {{ sessionState }} <span class="text-green-500" aria-hidden="true">&rarr;</span>
                </a>

                <!-- Log out como botón -->
                <a
                  v-else
                  @click="logout"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-red-600 hover:text-red-400 cursor-pointer"
                >
                  {{ sessionState }} <span class="text-red-400" aria-hidden="true">&rarr;</span>
                </a>
        </div>
      </nav>
      <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
        <div class="fixed inset-0 z-50" />
        <DialogPanel
          class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="/" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-20 w-auto sm:hidden" src="/images/longlife.png" alt="" />
            </a>
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="size-6 cursor-pointer" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 transition hover:text-green-500"
                  @click="activeItem = item.name">
                  {{ item.name }}
                </a>
                <a v-if="isLoggedIn" href="/admin">
                  <Profile class="w-6 h-6 transition hover:text-green-500" />
                </a>
                <a  href="/carrito">
                  <Cart class="w-6 h-6 transition hover:text-green-500" />
                </a>
              </div>
              <div class="py-6">
                <a
                  v-if="sessionState === 'Log in'"
                  href="/login"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 transition hover:text-green-500"
                >
                  {{ sessionState }} <span class="text-green-500" aria-hidden="true">&rarr;</span>
                </a>

                <!-- Log out como botón -->
                <a
                  v-else
                  @click="logout"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-red-600 hover:text-red-400 cursor-pointer"
                >
                  {{ sessionState }} <span class="text-red-400" aria-hidden="true">&rarr;</span>
                </a>

              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  </div>
</template>

<script setup>
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '../composables/api/login/UseUserLogin'
import Cart from './icons/Cart.vue'
import Profile from './icons/Profile.vue'
const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Que es longLife', href: 'longlife' },
  { name: 'Planes', href: 'planes' },
  { name: 'Suscripciones', href: 'suscripciones' },
  { name: 'Tienda', href: '/tienda' },
  { name: 'Blog', href: '#' },
  { name: 'Contacto', href: 'Contacto' },
]
const sessionState = ref('')

if (localStorage.getItem('token')) {
  sessionState.value = 'Log out'
} else {
  sessionState.value = 'Log in'
}
const {logout,isLoggedIn}= useAuth();

const mobileMenuOpen = ref(false)
const activeItem = ref(null) 
</script>
