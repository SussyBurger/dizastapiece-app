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

		<div class="relative pt-8">
			<ul class="flex flex-col justify-center w-full gap-2 md:justify-between">
				<li
					v-for="track in this.tracks.value"
					class="flex font-primary"
					@mouseenter="hoveredTrackId = track.id"
					@mouseleave="hoveredTrackId = null"
					:key="track.id"
				>
					<div class="flex flex-1 hover:bg-[#979797] hover:bg-opacity-20">
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
									@click="playTrack(track.preview_url)"
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

							<div class="pl-2">
								<div
									class="text-[#1f1f1f] dark:text-[#d9d9d9] ease-out duration-200"
								>
									<span
										:class="{
											'text-[#ef5465]':
												selectedTrack === track.preview_url &&
												track.preview_url !== null,
										}"
									>
										{{ track.name }}
									</span>
								</div>
								<div
									class="text-[14px] text-[#1f1f1f] dark:text-[#d9d9d9] ease-out duration-200"
								>
									<span
										:class="{
											'text-[#ef5465]':
												selectedTrack === track.preview_url &&
												track.preview_url !== null,
										}"
									>
										{{ track.artists[0].name }}
									</span>
								</div>
								<div class="text-xs text-[#858590] ease-out duration-200">
									{{ 'Released on ' + track.album.release_date }}
								</div>
							</div>
						</div>

						<div class="flex items-center">
							<button
								class="mr-3 rounded-full p-1.5 hover:bg-[#ef5465] hover:text-[#e3e3e8] cursor-pointer ease-out duration-200"
							>
								<DotsHorizontal />
							</button>
							<button
								class="mr-3 rounded-full p-1.5 hover:bg-[#ef5465] hover:text-[#e3e3e8] cursor-pointer ease-out duration-200"
							>
								<HeartOutline @click="addTrackToPlaylist(track)" />
							</button>
							<button
								class="mr-8 px-3 py-1 text-[#303030] dark:text-[#e3e3e8] transition duration-200 ease-in-out bg-transparent border-2 border-[#666] dark:border-[#9d9daf] hover:border-[#ef5465] dark:hover:border-[#ef5465] rounded-full hover:text-white hover:bg-[#ef5465]"
								@click="addTrackToPlaylist(track)"
							>
								Add to Playlist
							</button>
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
	import { ref } from 'vue';
	import Play from 'vue-material-design-icons/Play.vue';
	import Plus from 'vue-material-design-icons/Plus.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';
	import Magnify from 'vue-material-design-icons/Magnify.vue';
	import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
	import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';

	let isHover = ref(false);
</script>

<script>
	import axios from 'axios';
	import { TOKEN_USER } from '../main.js';

	export default {
		data() {
			return {
				tracks: [],
				keySearch: '',
				isTrackPlaying: false,
				selectedTrack: null,
				playbackTime: 0,
				hoveredTrackId: null,
			};
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
				// add event listener to toggle the play/pause button when track finishes
				elmAudio.addEventListener('ended', () => {
					this.isTrackPlaying = false;
				});
			},
		},
	};
</script>
