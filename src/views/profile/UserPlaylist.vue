<template>
	<main class="w-full max-w-8xl">
		<div
			v-if="showRemoveTrackMessage"
			:class="{
				'fixed -translate-x-1/2 top-6 left-1/2 z-50 px-4 py-2 text-white bg-[#26c05c] rounded animate-fade-slide duration-200':
					showRemoveTrackMessage,
			}"
		>
			Track removed successfully!
		</div>

		<div
			id="bg-cover"
			class="top-0 left-0 fixed w-screen h-screen bg-black bg-opacity-70 dark:bg-[#0c0d0d] dark:bg-opacity-70"
			:class="`${showPlaylistForm ? 'z-[60] ' : 'hidden'}`"
			@click="toggleForm"
		></div>
		<div
			class="fixed duration-200 ease-out -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-1/2"
			:class="`${showPlaylistForm ? 'z-[60] ' : 'hidden'}`"
		>
			<CreatePlaylist></CreatePlaylist>
		</div>

		<div class="flex items-center px-8 py-8">
			<div class="text-3xl font-semibold uppercase font-primary">
				My Playlists
			</div>

			<PlusBox
				:size="32"
				class="pl-2.5 opacity-25 hover:opacity-100 hover:text-[#ef5465] cursor-pointer ease-out duration-200"
				@click="toggleForm"
			/>
		</div>

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
						<!-- <div
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
						</div> -->

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

				<!-- <div v-if="showEditPlaylistForm">
					<form @submit.prevent="editPlaylist(playlist)">
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
											v-model="playlist.name"
											class="w-full bg-[#3e3e3e] placeholder-[#ccc] placeholder:opacity-20 rounded-md border border-[#535353] ml-14 outline-none px-3 py-1"
											placeholder="Enter playlist name"
										/>
									</label>
								</div>

								<div class="px-2 my-3">
									<label class="flex">
										<textarea
											v-model="playlist.description"
											class="bg-[#3e3e3e] placeholder-[#ccc] placeholder:opacity-20 w-full border border-[#535353] rounded-md resize-none ml-14 px-3 py-1 outline-none"
											placeholder="Add an optional description"
										></textarea>
									</label>
								</div>

								<div class="mt-3">
									<input
										type="checkbox"
										v-model="playlist.public"
										class="bg-[#3e3e3e] ml-16 outline-none"
									/>
								</div>
							</div>
						</div>

						<div class="flex flex-row-reverse w-full px-2 my-2">
							<button
								type="submit"
								class="flex-end border hover:bg-[#ef5465] ease-out duration-200 border-[#535353] hover:border-[#ef5465] px-2 py-1.5 rounded-md"
							>
								Save Changes
							</button>
						</div>
					</form>
				</div> -->

				<div class="relative px-2 pt-2">
					<ul
						v-if="playlist.showTracks"
						class="flex flex-col justify-center w-full gap-2 ml-2 md:justify-between"
					>
						<!-- Infomation topbar -->
						<div
							class="flex items-center justify-between border-b border-b-[#cecaca] dark:border-b-[#302d2d] mr-4 pb-1.5"
						>
							<div
								class="text-xs font-light pl-2 text-[#aeaeae] dark:text-[#4d4d4d]"
							>
								TRACK
							</div>
							<ClockTimeFiveOutline
								class="text-[#aeaeae] dark:text-[#4d4d4d] pr-4"
								:size="20"
							/>
						</div>

						<li
							v-for="track in playlist.tracks.items"
							class="flex flex-1 font-primary hover:bg-[#979797] hover:bg-opacity-20"
							:class="{
								'bg-[#979797] bg-opacity-10 ':
									selectedTrack === track.track.preview_url &&
									track.track.preview_url !== null,
							}"
							@mouseenter="hoveredTrackId = track.track.id"
							@mouseleave="hoveredTrackId = null"
							:key="track.track.id"
						>
							<div class="flex flex-1">
								<div class="flex items-center w-16 h-16 gap-2">
									<div
										class="absolute h-14 z-10 w-14 m-1 bg-[#ccc] dark:bg-black rounded-sm"
										:class="{
											'transition ease-in duration-200 bg-opacity-40 dark:bg-opacity-40':
												hoveredTrackId === track.track.id && !isTrackPlaying,
											'transition ease-out duration-200 bg-opacity-5 dark:bg-opacity-5':
												hoveredTrackId !== track.track.id || isTrackPlaying,
											'bg-opacity-100':
												selectedTrack === track.track.preview_url,
										}"
									></div>
									<div
										class="absolute left-6 z-20 p-2 rounded-full bg-white hover:bg-[#ef5465] text-black hover:text-white cursor-pointer ease-out duration-200"
										:class="{
											'transition ease-in duration-200 opacity-100':
												hoveredTrackId === track.track.id && !isTrackPlaying,
											'transition ease-out duration-200 opacity-0':
												hoveredTrackId !== track.track.id || isTrackPlaying,
											'transition ease-in duration-200 bg-opacity-100':
												selectedTrack === track.track.preview_url &&
												track.track.id,
											'transition ease-out duration-200 opacity-0':
												selectedTrack !== track.track.preview_url,
										}"
										@click="playTrack(track.track.preview_url)"
									>
										<Play
											v-if="
												!isTrackPlaying ||
												selectedTrack !== track.track.preview_url ||
												(!isTrackPlaying &&
													selectedTrack !== track.track.preview_url)
											"
											class="truncate rounded-full"
											:size="32"
										/>
										<Pause
											v-else
											:size="32"
										/>
									</div>

									<img
										:src="
											track.track.album.images.length
												? track.track.album.images[0].url
												: 'images/no-cover-art.jpg'
										"
										class="z-0 m-1 border border-[#e0e0e0] dark:border-[#32323d] rounded-sm w-14 h-14"
									/>
								</div>

								<div class="items-center pl-2">
									<p
										class="text-base max-w-[100px] md:max-w-[240px] lg:max-w-xs truncate hover:underline cursor-pointer duration-200 ease-out"
										:class="{
											'text-[#ef5465]':
												selectedTrack === track.track.preview_url &&
												track.track.preview_url !== null,
										}"
										@click="playTrack(track.track.preview_url)"
									>
										{{ track.track.name }}
									</p>
									<p
										class="text-sm duration-200 ease-out"
										:class="{
											'text-[#ef5465]':
												selectedTrack === track.track.preview_url &&
												track.track.preview_url !== null,
										}"
									>
										{{ track.track.artists[0].name }}
									</p>
									<p
										class="truncate text-xs text-[#858590] ease-out duration-200 max-w-[100px] md:max-w-[240px] lg:max-w-xs"
										:class="{
											'text-[#f27382]':
												selectedTrack === track.track.preview_url &&
												track.track.preview_url !== null,
										}"
									>
										{{ track.track.album.name }}
									</p>
								</div>
							</div>

							<div class="flex items-center">
								<button
									class="mr-4 px-1 md:px-3 py-1 bg-transparent border-2 border-[#666] dark:border-[#9d9daf] hover:border-[#ef5465] dark:hover:border-[#ef5465] rounded-full hover:text-white hover:bg-[#ef5465] duration-200 ease-out"
									:class="{
										'border-[#ef5465] dark:border-[#ef5465] text-[#ef5465] dark:text-[#ef5465] hover:text-white dark:hover:text-white':
											selectedTrack === track.track.preview_url &&
											track.track.preview_url !== null,
									}"
									@click="removeTrackFromPlaylist(playlist.id, track.track.id)"
								>
									<span class="hidden truncate duration-200 ease-out md:block">
										Remove from Playlist
									</span>
									<span class="duration-200 ease-out md:hidden"><Close /></span>
								</button>

								<span
									class="ml-4 mr-6"
									:class="{
										'text-[#ef5465]':
											selectedTrack === track.track.preview_url &&
											track.track.preview_url !== null,
									}"
								>
									{{ trackDuration(track.track.duration_ms) }}
								</span>
							</div>
						</li>
					</ul>
				</div>
			</li>
		</ul>

		<div class="mb-8"></div>

		<audio
			autoplay
			id="audio-play"
		></audio>

		<div class="pb-40"></div>
	</main>
</template>

<script setup>
	import { ref } from 'vue';
	import Play from 'vue-material-design-icons/Play.vue';
	import Close from 'vue-material-design-icons/Close.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';
	import Pen from 'vue-material-design-icons/Pen.vue';
	import CircleSmall from 'vue-material-design-icons/CircleSmall.vue';
	import MenuDown from 'vue-material-design-icons/MenuDown.vue';
	import ClockTimeFiveOutline from 'vue-material-design-icons/ClockTimeFiveOutline.vue';
	import PlusBox from 'vue-material-design-icons/PlusBox.vue';

	const showPlaylistForm = ref(false);
	const toggleForm = () => {
		showPlaylistForm.value = !showPlaylistForm.value;
	};

	const showEditPlaylistForm = ref(false);
	const toggleEditForm = () => {
		showEditPlaylistForm.value = !showEditPlaylistForm.value;
	};

	let isHover = ref(false);
</script>

<script>
	import axios from 'axios';
	import { TOKEN_USER } from '../../main.js';
	import CreatePlaylist from '../../components/CreatePlaylist.vue';

	export default {
		data() {
			return {
				playlists: [],
				isTrackPlaying: false,
				selectedTrack: null,
				playbackTime: 0,
				hoveredPlaylistId: null,
				hoveredTrackId: null,
				showEditPlaylistForm: false,
				showRemoveTrackMessage: false,
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
				const playlistIndex = this.playlists.findIndex(
					(playlist) => playlist.id === playlistId
				);
				if (this.playlists[playlistIndex].showTracks) {
					this.playlists[playlistIndex].showTracks = false;
				} else {
					axios
						.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
							headers: {
								Authorization: `Bearer ${TOKEN_USER}`,
							},
						})
						.then((response) => {
							console.log(response.data);
							this.playlists[playlistIndex].tracks = response.data;
							this.playlists[playlistIndex].showTracks = true;
						})
						.catch((error) => {
							console.log(error);
						});
				}
			},
			playTrack(track) {
				const elmAudio = document.getElementById('audio-play');
				if (elmAudio.src === track && !elmAudio.paused) {
					this.playbackTime = elmAudio.currentTime;
					elmAudio.pause();
					this.isTrackPlaying = false;
				} else {
					elmAudio.src = track;
					elmAudio.currentTime = this.playbackTime;
					elmAudio.play();
					this.isTrackPlaying = true;
					this.selectedTrack = track;
				}
				elmAudio.addEventListener('ended', () => {
					this.isTrackPlaying = false;
				});
			},
			trackDuration(durationMs) {
				const convertToSeconds = Math.ceil(durationMs / 1000);
				const minutes = Math.floor(convertToSeconds / 60);
				const seconds = String(convertToSeconds % 60).padStart(2, '0');
				return `${minutes}:${seconds}`;
			},
			removeTrackFromPlaylist(playlistId, trackId) {
				axios
					.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
						headers: {
							Authorization: `Bearer ${TOKEN_USER}`,
						},
						data: JSON.stringify({
							tracks: [{ uri: `spotify:track:${trackId}` }],
						}),
					})
					.then((response) => {
						console.log(response);
						this.selectedTrackId = null;
						this.showRemoveTrackMessage = true;
						setTimeout(() => {
							this.showRemoveTrackMessage = false;
						}, 2000);
						const playlistIndex = this.playlists.findIndex(
							(playlist) => playlist.id === playlistId
						);
						const trackIndex = this.playlists[
							playlistIndex
						].tracks.items.findIndex((item) => item.track.id === trackId);
						if (trackIndex !== -1) {
							this.playlists[playlistIndex].tracks.items.splice(trackIndex, 1);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			},
			/* 		editPlaylist(playlistId) {
				if (!playlistId) {
					console.log('Invalid playlist ID');
					return;
				}

				axios
					.put(
						`https://api.spotify.com/v1/playlists/${playlistId}`,
						{
							name: playlist.name,
							description: playlist.description,
							public: playlist.public,
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
					})
					.catch((error) => {
						console.log(error);
					});
			}, */
		},
		components: { CreatePlaylist },
	};
</script>
