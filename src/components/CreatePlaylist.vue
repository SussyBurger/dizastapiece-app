<template>
	<div class="flex-col items-center">
		<h2>Add new playlist</h2>
		<form
			@submit.prevent="createPlaylist"
			class="flex-col"
		>
			<label class="flex">
				Name:
				<input
					type="text"
					v-model="name"
				/>
			</label>
			<label class="flex">
				Description:
				<textarea v-model="description"></textarea>
			</label>
			<label class="flex">
				Public:
				<input type="checkbox" />
			</label>
			<button
				type="submit"
				class="border"
			>
				Create Playlist
			</button>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';
	import { TOKEN_USER } from '../main.js';

	export default {
		data() {
			return {
				name: '',
				description: '',
				public: false,
				userID: '316osap42zsktmc3hqsktsf22kk4',
			};
		},

		methods: {
			createPlaylist() {
				console.log(TOKEN_USER, 'TOKENUSER');
				const headers = {
					Authorization: `Bearer ${TOKEN_USER}`,
					'Content-Type': 'application/json',
				};
				console.log(headers, 'headers');
				const data = {
					name: this.name,
					description: this.description,
					public: false,
				};

				axios
					.post(
						`https://api.spotify.com/v1/users/${this.userID}/playlists`,
						data,
						{ headers }
					)
					.then((response) => console.log('Playlist created:', response.data))
					.catch((error) => console.error(error));
			},
		},
	};
</script>
