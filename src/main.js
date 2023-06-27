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
	'BQBrlSVHw8h7txZiqkXGz6aT0Tq6nUoDWS-UmMiH7rsdqQhDt0k3xFqpmYEwWKIvuR6NvRok4gmx8XZlS3yQ4bUZPeKmeoL_OULKUALEPYWerfNzLk4bw2M17LvZNaEjB1eea_LpiXXwMDXpP5CtfA9YbhBg5dvUDfEDmnW0R3kd_5OJbVXl1aOZubV0keRsHG2QQPY4b4SPOKhI4HtsxddAROrswQQne6g';
