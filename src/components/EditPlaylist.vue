<template>
	<main
		class="max-w-xl p-4 rounded-md border-2 border-[#32323d] font-primary flex-col items-center bg-[#282828] text-[#fafafa]"
	>
		<div class="flex items-center">
			<h2 class="flex-1 px-4 text-lg uppercase">Add new playlist</h2>

			<!-- <CloseBoxOutline
				class="flex-none pr-1 cursor-pointer hover:text-[#ccc] ease-out duration-200"
			/> -->
		</div>
		<form
			@submit.prevent="createPlaylist"
			class="flex-col"
		>
			<div class="flex">
				<div class="flex-col px-2 my-1.5">
					<span class="flex items-center px-2 my-2">Name</span>
					<span class="flex px-2 py-4">Description</span>
					<span class="flex items-center px-2 pt-5"> Public </span>
				</div>
				<div class="flex-col w-full">
					<div class="px-2 my-2">
						<label class="flex">
							<input
								type="text"
								v-model="name"
								class="w-full bg-[#3e3e3e] placeholder-[#ccc] placeholder:opacity-20 rounded-md border border-[#535353] ml-14 outline-none px-3 py-1"
								placeholder="Enter playlist name"
							/>
						</label>
					</div>

					<div class="px-2 my-3">
						<label class="flex">
							<textarea
								v-model="description"
								class="bg-[#3e3e3e] placeholder-[#ccc] placeholder:opacity-20 w-full border border-[#535353] rounded-md resize-none ml-14 px-3 py-1 outline-none"
								placeholder="Add an optional description"
							></textarea>
						</label>
					</div>

					<div class="mt-3">
						<input
							type="checkbox"
							class="bg-[#3e3e3e] ml-16 outline-none"
						/>
					</div>
				</div>
			</div>
			<div
				class="flex items-center text-xs text-[#ccc] px-6 justify-center opacity-30"
			>
				(click anywhere outside to close)
			</div>

			<div class="flex flex-row-reverse w-full px-2 my-2">
				<button
					type="submit"
					class="flex-end border hover:bg-[#ef5465] ease-out duration-200 border-[#535353] hover:border-[#ef5465] px-2 py-1.5 rounded-md"
				>
					Create Playlist
				</button>
			</div>
		</form>
	</main>
</template>

<script setup>
	import CloseBoxOutline from 'vue-material-design-icons/CloseBoxOutline.vue';
</script>

<script>
	import axios from 'axios';
	import { TOKEN_USER } from '../main.js';

	export default {
		data() {
			return {
				name: '',
				description: '',
				public: true,
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
					public: true,
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
