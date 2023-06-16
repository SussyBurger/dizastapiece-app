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
	'BQCBLeNObJxVguiG0HG9Mw6HmX6j0IoZMNF8Leq1WOtnyPFrbIQTLOGHj4YMrbV6Xo0toqxILPIchG48J6DuyFgyu045GONwh0MSFL8WN8-RY0BCTXrWX2QsDeliaibh20sSVPWt1pZonRAJd3b-W50AnCrI3csMpjt57lgBOBqhtIFuF31uXJUWjtUjvIzCjeHt_NzRQfJI7Bz7UladEnm1';
