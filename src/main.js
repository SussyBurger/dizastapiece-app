import { createApp } from 'vue';
import 'animate.css';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

import App from './App.vue';
import router from './router';

import './assets/main.css';
import { createRouter } from 'vue-router';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');

export const TOKEN_USER =
	'BQCzGRd7DdtAau4sYk32ihEQYXj6IiPRkhpr5RD_fKWL_J_2381nVl-qUoqvy-spUWUsYQvQ3UNJ-gGSxfPiZVc0o6o7aa2Zd1GMHh4z5eIp-IdSZ9h4ejhFbfxceyoASsnr1m7R8V01UOMN_y1hOOemlw16LUUfs30pTWMzLVWO1MlZGdsxfw-OZ5GyenvAzQa2Ce1Rs4tjL9OMSjO9x4mB';
