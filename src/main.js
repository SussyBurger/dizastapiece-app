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
	'BQDKtRcSP6VuYOmaM00FIQ29Xwt1LZ2W6V89tCPwseezhhVpc8BhtZx4N9MN2endmBbOGx5B8jd_7Vfa7P4o6pnck6gn0692gm2GkBfT6bQ1MbItNwTqiQQgHVRxAdsEWPPkFc2x8BWyTdkDGIbtL1oJgEVnM2mT56oZcLQagKGlXB-DuPY0pQvZoiNbtZCMWuvg_5mpSLrK3rgJpaBqgj2s6COuE_XChFo';
