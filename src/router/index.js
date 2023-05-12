import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ArtistView from '../views/ArtistView.vue';
import PlaylistView from '../views/PlaylistView.vue';
import CategoryView from '../views/CategoryView.vue';
import LoginView from '../views/LoginView.vue';
import CallbackView from '../views/CallbackView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/artist',
			name: 'artist',
			component: ArtistView,
		},
		{
			path: '/playlist',
			name: 'playlist',
			component: PlaylistView,
		},
		{
			path: '/categories',
			name: 'categories',
			component: CategoryView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
		{
			path: '/callback',
			name: 'callback',
			component: CallbackView,
		},
	],
});

export default router;
