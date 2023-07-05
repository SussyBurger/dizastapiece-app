import { createApp } from 'vue';
import 'animate.css';

import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from './App.vue';
import router from './router';

import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.mount('#app');

export const TOKEN_USER =
	'BQAkTTEKcwdJsCBuJYnxOPt7ZDB7DFa7T7nPKX5iW_uabMsdUATZn_0zu5RbMf85J9DtvppGncLlNU_C92iGe0kXOFkl2zE9U6NxGVOlHG4nWT7wgE06E6WRr1cBMetIZi_udH7Uwt7RWN1eP95kMUdOINFDC4GWpMF120E8Qml-WbcHikf8w_Yo3wVNv1ruGm2lZRmhgnF64EB6y9eRzqJdwAvh3jtlipg';
