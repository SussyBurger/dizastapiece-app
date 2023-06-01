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
	'BQC89LbCRyiOAfSn1PmUhl1FW8KBTcwb2nhH5dLD8IXr0ZqvwyJudlECQBZyZZL4Z4LDS0-onsw3Onp3ITmtF5tFU3R1gdddUFCVREgD1-BZqjjRC8JGm9juFykqtjs_LR1vtuoNXzUFiz3RLC1r7SeVbld_8O_5Gz9ttl73ohIuVrPqSEXiztAfTo8rcN1DGlAvARuv7tnDjjhGzasl_9Yl';
