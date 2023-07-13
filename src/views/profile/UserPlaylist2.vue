<template>
	<main class="w-full max-w-8xl">
		<ul
			class="flex flex-col justify-center w-full gap-4 px-8 md:justify-between"
		>
			<li
				class="rounded-sm"
				v-for="playlist in playlists"
				:key="playlist.id"
			>
				<div
					class="flex flex-row border text-[#444] border-[#e0e0e0] bg-[#f2f2f2] dark:text-[#f3f3f3] dark:border-[#32323d] dark:bg-[#191922] items-center"
				>
					<div
						class="relative flex items-center w-24 h-24 cursor-pointer"
						@mouseenter="hoveredPlaylistId = playlist.id"
						@mouseleave="hoveredPlaylistId = null"
						@click="toggleEditForm(playlist.id)"
					>
						<div
							class="absolute z-10 w-full h-full m-1 bg-[#333]"
							:class="{
								'transition ease-in duration-100 bg-opacity-40 dark:bg-opacity-40':
									hoveredPlaylistId === playlist.id,
								'transition ease-out duration-100 bg-opacity-5 dark:bg-opacity-5':
									hoveredPlaylistId !== playlist.id,
							}"
						></div>
						<div
							class="absolute z-20 items-center justify-between w-full h-full pt-5 m-10"
							:class="{
								'transition ease-in duration-100 bg-opacity-100':
									hoveredPlaylistId === playlist.id,
								'transition ease-out duration-100 bg-opacity-0 opacity-0':
									hoveredPlaylistId !== playlist.id,
							}"
						>
							<Pen
								class="text-white"
								:size="28"
							/>
							<p class="text-white select-none">Edit</p>
						</div>

						<img
							:src="
								playlist.images.length
									? playlist.images[0].url
									: 'images/no-cover-art.jpg'
							"
							class="z-0 m-1 border border-[#e0e0e0] dark:border-[#32323d] rounded-sm w-24"
						/>
					</div>

					<div class="pl-8">
						<h2 class="text-4xl font-semibold">{{ playlist.name }}</h2>
						<span>{{ playlist.description }}</span>
						<div
							class="flex items-center text-xs cursor-pointer font-extralight"
							@click="getTracks(playlist.id)"
						>
							<span>{{ playlist.tracks.total + ' song(s)' }}</span>
							<CircleSmall :size="24" />

							<button>
								{{ playlist.showTracks ? 'Hide tracklist' : 'Show tracklist' }}
							</button>
							<MenuDown
								:size="24"
								:class="playlist.showTracks ? 'rotate-180' : 'rotate-0'"
							/>
						</div>
					</div>
				</div>
				<div v-if="showEditPlaylistForm && editingPlaylistId === playlist.id">
					<form>
						<div class="flex">
							<div class="flex-col px-2 my-1.5">
								<span class="flex items-center px-2 my-2">Name</span>
								<span class="flex px-2 py-4">Description</span>
								<span class="flex items-center px-2 pt-5">Public</span>
							</div>
							<div class="flex-col w-full">
								<div class="px-2 my-2">
									<label class="flex">
										<input
											type="text"
											v-model="editingPlaylist.name"
											class="w-full bg-[#3e3e3e] placeholder-[#ccc] placeholder:opacity-20 rounded-md border border-[#535353] ml-14 outline-none px-3 py-1"
											placeholder="Enter playlist name"
										/>
									</label>
								</div>

								<div class="px-2 my-3">
									<label class="flex">
										<textarea
											v-model="editingPlaylist.description"
											class="bg-[#3e3e3e] placeholder-[#ccc] placeholder:opacity-20 w-full border border-[#535353] rounded-md resize-none ml-14 px-3 py-1 outline-none"
											placeholder="Add an optional description"
										></textarea>
									</label>
								</div>

								<div class="mt-3">
									<input
										type="checkbox"
										v-model="editingPlaylist.public"
										class="bg-[#3e3e3e] ml-16 outline-none"
									/>
								</div>
							</div>
						</div>

						<div class="flex flex-row-reverse w-full px-2 my-2">
							<button
								type="submit"
								class="flex-end border hover:bg-[#ef5465] ease-out duration-200 border-[#535353] hover:border-[#ef5465] px-2 py-1.5 rounded-md"
								@click="saveChanges(playlist.id)"
							>
								Save Changes
							</button>
						</div>
					</form>
				</div>
			</li>
		</ul>

		<div class="mb-8"></div>

		<div class="pb-40"></div>
	</main>
</template>

<script setup>
	import { ref, reactive } from 'vue';

	import Pen from 'vue-material-design-icons/Pen.vue';
	import CircleSmall from 'vue-material-design-icons/CircleSmall.vue';
	import MenuDown from 'vue-material-design-icons/MenuDown.vue';

	let isHover = ref(false);

	const editingPlaylistId = ref(null);
	const editingPlaylist = reactive({
		name: '',
		description: '',
		public: false,
	});

	const showEditPlaylistForm = ref(false);
	/* 	const toggleEditForm = (playlistId) => {
		showEditPlaylistForm.value = !showEditPlaylistForm.value;
		editingPlaylistId.value = playlistId;
	}; */
	const toggleEditForm = (playlistId) => {
		showEditPlaylistForm.value = !showEditPlaylistForm.value;
		editingPlaylistId.value = playlistId;
		const playlist = playlists.find((p) => p.id === playlistId);
		editingPlaylist.name = playlist.name;
		editingPlaylist.description = playlist.description;
		editingPlaylist.public = playlist.public;
	};

	const saveChanges = (playlist) => {
		axios
			.put(
				`https://api.spotify.com/v1/playlists/${playlist.id}`,
				{
					name: editingPlaylist.name,
					description: editingPlaylist.description,
					public: editingPlaylist.public,
				},
				{
					headers: {
						Authorization: `Bearer ${TOKEN_USER}`,
						'Content-Type': 'application/json',
					},
				}
			)
			.then((response) => {
				console.log(response);
				showEditPlaylistForm.value = false;
			})
			.catch((error) => {
				console.log(error);
			});
	};
</script>

<script>
	import axios from 'axios';
	import { ref, reactive } from 'vue';
	import { TOKEN_USER } from '../../main.js';

	export default {
		data() {
			return {
				playlists: [],
				selectedTrack: null,
				hoveredPlaylistId: null,
				showEditPlaylistForm: false,
				showRemoveTrackMessage: false,
				editingPlaylist: null,
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
			editPlaylist(playlistId) {
				if (!editPlaylist) {
					console.log('Invalid playlist');
					return;
				}

				axios
					.put(
						`https://api.spotify.com/v1/playlists/${playlistId}`,
						{
							name: editingPlaylist.name,
							description: editingPlaylist.description,
							public: editingPlaylist.public,
						},
						{
							headers: {
								Authorization: `Bearer ${TOKEN_USER}`,
								'Content-Type': 'application/json',
							},
						}
					)
					.then((response) => {
						console.log(response);

						const index = playlists.findIndex(
							(playlist) => playlist.id === playlistId
						);
						playlists[index].name = editingPlaylist.name;
						playlists[index].description = editingPlaylist.description;
						playlists[index].public = editingPlaylist.public;
						showEditPlaylistForm.value = false;
					})
					.catch((error) => {
						console.log(error);
					});
			},
		},
	};
</script>
