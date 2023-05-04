import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ArtistView from '../views/ArtistView.vue';
import PlaylistView from '../views/PlaylistView.vue';
import CategoryView from '../views/CategoryView.vue';

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
	],
});

export default router;
