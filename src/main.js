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
	'BQDOean9g1tDKasfg7c8OjYSvbsZxdmnRviAogRljHC6cmE3_lOlzfb6DkyUzM6aZEfmE9z5UyrMY-_3bCgM1vAGpLf9m44o1oK3fv1mZ4wPK8-vUaiWUju1lJfKlEoMFsiiwg7K44QgJN6xWiEuhnC0ZkFq4SUXlPop9zzvOZqO1tu6_lgChUS0r3LeuyaKiBGRfgvNXWRWRzLA7r29aO32gL0fZe9QF-s';
