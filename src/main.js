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
	'BQAVvGiZVSp0a0gnM9IEwAVm2pGwlqxFHDxAqHMH6pJBGYETzlHj5fSqUa8TapTWQorookb_cBae0lxgsBKOiz5ctK_OyOC0bXUEP6O1f1dXS5I5jRugqJOXCwO57poXvtAJzIY2B6qTakxXnO2VhIb2tcwXmsNbhPJWK3089ZjRIkjxDJArRdQ9dRp7F1zbiSSMxVMoohUn9zN33XklYi_v';
