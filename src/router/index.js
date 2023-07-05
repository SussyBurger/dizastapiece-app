import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import FeaturedView from '../views/FeaturedView.vue';
import CategoryView from '../views/CategoryView.vue';
import SearchView from '../views/SearchView.vue';

import LoginView from '../views/LoginView.vue';
import CallbackView from '../views/CallbackView.vue';
import UserView from '../views/UserView.vue';

import Profile from '../views/profile/Profile.vue';
import NewsSetting from '../views/profile/NewsSetting.vue';
import Devices from '../views/profile/Devices.vue';
import UserPlaylist from '../views/profile/UserPlaylist.vue';

import Bio from '../views/artist/Bio.vue';
import TopTracks from '../views/artist/TopTracks.vue';
import SimilarArtists from '../views/artist/SimilarArtists.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/featured',
			name: 'featured',
			component: FeaturedView,
			children: [
				{
					path: '/bio',
					component: Bio,
				},
				{
					path: '/toptracks',
					component: TopTracks,
				},
				{
					path: '/similarartists',
					component: SimilarArtists,
				},
			],
		},
		{
			path: '/userplaylist',
			name: 'userplaylist',
			component: UserPlaylist,
		},
		{
			path: '/categories',
			name: 'categories',
			component: CategoryView,
		},
		{
			path: '/search',
			name: 'search',
			component: SearchView,
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
		{
			path: '/user',
			name: 'user',
			component: UserView,
			children: [
				{
					path: '/profile',
					component: Profile,
				},
				{
					path: '/settings',
					component: NewsSetting,
				},
				{
					path: '/devices',
					component: Devices,
				},
			],
		},
	],
});

export default router;
