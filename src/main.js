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
	'BQDEbxwWUcqC_gaRuJkmXebwVv1WgewNGxiG0AqHsfsdmjccNcs69wp0_qnZet_F0qMf9yxM88rPnlUunuutWdhrObIwzISqztAlBz5HmOnZ3tP0meNAfued3fhGuLlSOsfKfio1EVkyMhaQvJ-iLJqsNQ8VMRnI8BmBGA2zRzP6txlF1cJ4vLADbBfnlxLFjF_315-TPcZFjT3HeHGU_tUpZk3MvV__Y0A';
