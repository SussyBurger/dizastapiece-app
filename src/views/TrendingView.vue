<template>
	<main class="w-full px-8 mt-8 max-w-8xl">
		<div
			class="flex items-center border border-[#d1d1d6] dark:border-[#32323d] bg-[#F8F8F9] dark:bg-[#23232D] rounded-sm text-[#c9c9c9] w-[300px] ease-out duration-200"
		>
			<Magnify
				id="searchBtn"
				class="text-[#9B9BA1] px-1 cursor-pointer"
			/>
			<input
				@change="searchPlayList($event)"
				id="searchInput"
				v-model="query"
				type="text"
				class="w-full py-[5px] placeholder-[#ccc] dark:placeholder-[#4d4d4d] text-[#444] dark:text-[#f3f3f3] bg-transparent outline-none ring-0 hover:ring-0 text-sm"
				placeholder="Enter track name or artist"
			/>
		</div>

		<div
			class="flex items-center justify-between border-b border-b-[#cecaca] dark:border-b-[#302d2d] px-1.5 pt-8 pb-2.5"
		>
			<div class="text-xs font-light pl-2 text-[#aeaeae] dark:text-[#4d4d4d]">
				TITLE
			</div>
			<ClockTimeFiveOutline
				class="text-[#aeaeae] dark:text-[#4d4d4d] pr-2 md:pr-4"
				:size="20"
			/>
		</div>

		<div class="relative pt-2.5">
			<ul class="flex flex-col justify-center w-full gap-2 md:justify-between">
				<li
					v-for="track in this.tracks.value"
					class="flex font-primary"
					@mouseenter="hoveredTrackId = track.id"
					@mouseleave="hoveredTrackId = null"
					:key="track.id"
				>
					<div
						class="flex flex-1 hover:bg-[#979797] hover:bg-opacity-20"
						:class="{
							'bg-[#979797] bg-opacity-10 ':
								selectedTrack === track.preview_url &&
								track.preview_url !== null,
						}"
					>
						<div class="flex flex-1">
							<div class="flex items-center w-16 h-16 gap-2">
								<div
									:class="{
										'transition ease-in duration-200 bg-opacity-40 dark:bg-opacity-40':
											hoveredTrackId === track.id && !isTrackPlaying,
										'transition ease-out duration-200 bg-opacity-5 dark:bg-opacity-5':
											hoveredTrackId !== track.id || isTrackPlaying,
										'bg-opacity-100': selectedTrack === track.preview_url,
									}"
									class="absolute h-14 z-10 w-14 m-1 bg-[#ccc] dark:bg-black rounded-sm"
								></div>
								<div
									:class="{
										'transition ease-in duration-200 opacity-100':
											hoveredTrackId === track.id && !isTrackPlaying,
										'transition ease-out duration-200 opacity-0':
											hoveredTrackId !== track.id || isTrackPlaying,
										'transition ease-in duration-200 bg-opacity-100':
											selectedTrack === track.preview_url && track.id,
										'transition ease-out duration-200 opacity-0':
											selectedTrack !== track.preview_url,
									}"
									class="absolute left-2 z-20 p-2 rounded-full bg-white hover:bg-[#ef5465] text-black hover:text-white cursor-pointer ease-out duration-200"
									@click="playTrack(track.preview_url, track.album.name)"
								>
									<Play
										v-if="
											!isTrackPlaying || selectedTrack !== track.preview_url
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
									:src="track.album.images[0].url"
									class="z-0 m-1 border border-[#e0e0e0] dark:border-[#32323d] rounded-sm w-14 h-14"
								/>
							</div>

							<div class="items-center pl-2">
								<p
									class="text-[#1f1f1f] hover:underline dark:text-[#d9d9d9] max-w-[100px] md:max-w-[240px] lg:max-w-lg truncate cursor-pointer ease-out duration-200"
									:class="{
										'text-[#ef5465] dark:text-[#ef5465] font-medium':
											selectedTrack === track.preview_url &&
											track.preview_url !== null,
									}"
									@click="playTrack(track.preview_url, track.album.name)"
								>
									{{ track.name }}
								</p>
								<p
									class="text-[#1f1f1f] dark:text-[#d9d9d9] ease-out duration-200"
									:class="{
										'text-[#ef5465] dark:text-[#ef5465]':
											selectedTrack === track.preview_url &&
											track.preview_url !== null,
									}"
								>
									{{ track.artists[0].name }}
								</p>
								<p
									class="text-xs text-[#858590] ease-out duration-200 max-w-[100px] md:max-w-[240px] lg:max-w-lg truncate"
									:class="{
										'text-[#f27382]':
											selectedTrack === track.preview_url &&
											track.preview_url !== null,
									}"
								>
									{{ track.album.name }}
									<!-- {{ 'Released on ' + track.album.release_date }} -->
								</p>
							</div>
						</div>

						<div class="flex items-center">
							<button
								class="mr-3 rounded-full p-1.5 hover:bg-[#ef5465] hover:text-[#e3e3e8] cursor-pointer ease-out duration-200"
								:class="{
									'text-[#ef5465]':
										selectedTrack === track.preview_url &&
										track.preview_url !== null,
								}"
							>
								<DotsHorizontal />
							</button>
							<button
								class="mr-3 rounded-full p-1.5 hover:bg-[#ef5465] hover:text-[#e3e3e8] cursor-pointer ease-out duration-200"
								:class="{
									'text-[#ef5465]':
										selectedTrack === track.preview_url &&
										track.preview_url !== null,
								}"
							>
								<HeartOutline />
							</button>

							<button
								class="mr-4 px-1 md:px-3 py-1 text-[#303030] dark:text-[#e3e3e8] duration-200 ease-out bg-transparent border-2 border-[#666] dark:border-[#9d9daf] hover:border-[#ef5465] dark:hover:border-[#ef5465] rounded-full hover:text-white hover:bg-[#ef5465]"
								:class="{
									'border-[#ef5465] dark:border-[#ef5465] text-[#ef5465] dark:text-[#ef5465] hover:text-white dark:hover:text-white':
										selectedTrack === track.preview_url &&
										track.preview_url !== null,
								}"
								@click="togglePlaylistDropdown(track.id)"
							>
								<span class="hidden duration-200 ease-out md:block">
									Add to Playlist
								</span>
								<span class="duration-200 ease-out md:hidden"><Plus /></span>
							</button>
							<div
								id="playlist-dropdown"
								v-if="track.id === selectedTrackId"
								class="absolute right-0 mt-2 bg-[#f3f3f3] dark:bg-[#343438] shadow-md rounded-lg overflow-hidden"
							>
								<ul>
									<li
										v-for="playlist in playlists"
										:key="playlist.id"
										class="px-4 py-2 cursor-pointer hover:bg-[#ef5465] hover:text-white"
										@click="addTrackToPlaylist(track, playlist.id)"
									>
										{{ playlist.name }}
									</li>
								</ul>
							</div>

							<span
								class="px-1.5 md:pr-4"
								:class="{
									'text-[#ef5465]':
										selectedTrack === track.preview_url &&
										track.preview_url !== null,
								}"
								>{{ trackDuration(track.duration_ms) }}
							</span>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<audio
			autoplay
			id="audio-play"
		></audio>

		<div class="mb-20"></div>
	</main>
</template>

<script setup>
	import Play from 'vue-material-design-icons/Play.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';
	import Plus from 'vue-material-design-icons/Plus.vue';
	import Magnify from 'vue-material-design-icons/Magnify.vue';
	import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
	import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
	import ClockTimeFiveOutline from 'vue-material-design-icons/ClockTimeFiveOutline.vue';
</script>

<script>
	import axios from 'axios';
	import { TOKEN_USER } from '../main.js';

	export default {
		data() {
			return {
				tracks: [],
				playlists: [],
				keySearch: '',
				isTrackPlaying: false,
				selectedTrack: null,
				playbackTime: 0,
				hoveredTrackId: null,
			};
		},
		created() {
			document.addEventListener('click', this.handleClickOutside);
			this.getPlaylists();
		},
		setup() {},

		methods: {
			searchPlayList(event) {
				if (event.target && event.target.value) {
					this.keysearch = event.target.value;
					const url = `https://api.spotify.com/v1/search?q=${this.keysearch}&type=track`;
					const headers = {
						Authorization: `Bearer ${TOKEN_USER}`,
					};
					axios
						.get(url, { headers })
						.then((response) => {
							this.tracks.value = JSON.parse(
								JSON.stringify(response.data.tracks.items)
							);
							console.log(this.tracks.value);
						})
						.catch((error) => {
							console.log(error);
						});
				}
			},
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
			playTrack(track, album) {
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
			addTrackToPlaylist(track, playlistId) {
				const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
				const headers = {
					Authorization: `Bearer ${TOKEN_USER}`,
					'Content-Type': 'application/json',
				};
				const body = {
					uris: [track.uri],
				};
				axios
					.post(url, body, { headers })
					.then((response) => {
						console.log(response);
						this.selectedTrackId = null;
					})
					.catch((error) => {
						console.log(error);
					});
			},
			togglePlaylistDropdown(trackId) {
				if (this.selectedTrackId === trackId) {
					this.selectedTrackId = null;
				} else {
					this.selectedTrackId = trackId;
				}
			},
			handleClickOutside(event) {
				const target = event.target;
				const dropdownMenu = document.querySelector('#playlist-dropdown');

				if (!dropdownMenu.contains(target)) {
					this.selectedTrackId = null;
				}
			},
		},
	};
</script>
