import Notifications from '@kyvg/vue3-notification';
import 'typeface-oswald';
import 'typeface-poppins';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el router
import './style.css';

createApp(App)
  .use(router)
  .use(Notifications)
  .mount('#app')