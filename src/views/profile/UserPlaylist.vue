<template>
	<div class="w-full px-8 pl-8 max-w-8xl">
		<h1 class="mb-6 text-3xl font-semibold uppercase font-primary">
			My Playlists
		</h1>

		<ul class="flex flex-col justify-center w-full gap-4 md:justify-between">
			<li
				class="rounded-sm"
				v-for="playlist in playlists"
				:key="playlist.id"
			>
				<div
					class="flex flex-row border border-[#acb0b9] bg-[#DADCE0] dark:bg-[#23232D]"
				>
					<img
						:src="
							playlist.images.length
								? playlist.images[0].url
								: 'images/no-cover-art.jpg'
						"
						class="z-0 m-1 border border-[#e0e0e0] dark:border-[#32323d] rounded-sm w-24"
					/>

					<div class="pl-2">
						<h2 class="text-5xl font-semibold">{{ playlist.name }}</h2>
						<span>{{ playlist.tracks.total + ' song' }}</span>
						<div
							class="flex cursor-pointer"
							@click="getTracks(playlist.id)"
						>
							<button>
								{{ playlist.showTracks ? 'Hide tracklist' : 'Show tracklist' }}
							</button>
							<MenuDown
								:size="28"
								:class="playlist.showTracks ? 'rotate-180' : 'rotate-0'"
							/>
						</div>
					</div>
				</div>

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
										class="text-base duration-200 ease-out"
										:class="{
											'text-[#ef5465]':
												selectedTrack === track.track.preview_url &&
												track.track.preview_url !== null,
										}"
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
										class="text-xs text-[#858590] ease-out duration-200"
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
									@click="removeTrackFromPlaylist(track)"
								>
									<span class="hidden duration-200 ease-out md:block">
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

		<div class="w-full px-2 mx-auto">
			<CreatePlaylist></CreatePlaylist>
		</div>

		<div class="pb-40"></div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import Play from 'vue-material-design-icons/Play.vue';
	import Close from 'vue-material-design-icons/Close.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';
	import MenuDown from 'vue-material-design-icons/MenuDown.vue';
	import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
	import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
	import ClockTimeFiveOutline from 'vue-material-design-icons/ClockTimeFiveOutline.vue';

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
				hoveredTrackId: null,
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
			removeTrackFromPlaylist(track) {
				const playlist_id = '1wU6KVw5aeIQMNEzRbeVrA';
				const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
				const headers = {
					Authorization: `Bearer ${TOKEN_USER}`,
					'Content-Type': 'application/json',
				};
				const body = {
					tracks: [{ uri: track.track.uri }],
				};
				axios
					.delete(url, { headers, data: body })
					.then((response) => {
						console.log(response);
					})
					.catch((error) => {
						console.log(error);
					});
			},
		},
		components: { CreatePlaylist },
	};
</script>

<style></style>
