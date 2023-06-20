<template>
	<div class="pl-8">
		<h1>My Playlists</h1>
		<ul class="flex flex-col justify-center w-full gap-4 md:justify-between">
			<li
				v-for="playlist in playlists"
				:key="playlist.id"
			>
				<img
					:src="playlist.images[0].url"
					class="z-0 m-1 border border-[#e0e0e0] dark:border-[#32323d] rounded-sm w-60"
				/>
				<h2>{{ playlist.name }}</h2>
				{{ playlist.tracks.total + ' song' }}
				<button @click="getTracks(playlist.id)">Show tracks</button>
				<ul
					v-if="playlist.tracks"
					class="ml-4"
				>
					<li
						v-for="track in playlist.tracks"
						class="flex font-primary"
						:key="track.id"
					>
						{{ track.name }}
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios';
	import { TOKEN_USER } from '../main.js';
	export default {
		data() {
			return {
				playlists: [],
			};
		},
		mounted() {
			this.getPlaylists();
		},
		methods: {
			getPlaylists() {
				const userId = '316osap42zsktmc3hqsktsf22kk4';

				axios
					.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
						headers: {
							Authorization: `Bearer ${TOKEN_USER}`,
						},
					})
					.then((response) => {
						console.log(response.data);
						this.playlists = response.data.items;
					})
					.catch((error) => {
						console.log(error);
					});
			},
			getTracks(playlistId) {
				axios
					.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
						headers: {
							Authorization: `Bearer ${TOKEN_USER}`,
						},
					})
					.then((response) => {
						console.log(response.data);
						const playlistIndex = this.playlists.findIndex(
							(playlist) => playlist.id === playlistId
						);
						this.playlists[playlistIndex].tracks = response.data.items;
					})
					.catch((error) => {
						console.log(error);
					});
			},
		},
	};
</script>

<style></style>
