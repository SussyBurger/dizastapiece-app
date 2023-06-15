<template>
	<main class="px-8 mt-8">
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
					:key="track.id"
				>
					<div class="flex flex-1 hover:bg-[#979797] hover:bg-opacity-20">
						<div
							class="flex items-center w-16 h-16 gap-2"
							@mouseenter="isHover = true"
							@mouseleave="isHover = false"
						>
							<div
								:class="
									isHover
										? 'transition ease-in duration-100 bg-opacity-40 dark:bg-opacity-40'
										: 'transition ease-out duration-100 bg-opacity-5 dark:bg-opacity-5'
								"
								class="absolute z-10 w-16 bg-[#ccc] dark:bg-black rounded-sm"
							></div>
							<div
								:class="
									isHover
										? 'transition ease-in duration-100 bg-opacity-100'
										: 'transition ease-out duration-100 bg-opacity-0 opacity-0'
								"
								class="absolute left-2 z-20 p-2 rounded-full bg-white hover:bg-[#999] hover:bg-opacity-20 cursor-pointer ease-out duration-200"
								@click="playTrack(track.preview_url)"
							>
								<Play
									v-if="!isTrackPlaying || selectedTrack !== track.preview_url"
									class="text-black truncate bg-white rounded-full"
									:size="32"
								/>
								<Pause
									v-else
									:size="32"
								/>
							</div>
							<img
								:src="track.album.images[0].url"
								class="z-0 m-1 border rounded-sm w-14 h-14"
							/>
						</div>

						<div class="pl-2">
							<div class="text-[#1f1f1f] dark:text-[#d9d9d9]">
								{{ track.name }}
							</div>
							<div class="text-[14px] text-[#1f1f1f] dark:text-[#d9d9d9]">
								{{ track.artists[0].name }}
							</div>
							<div class="text-xs text-[#858590]">
								{{ 'Released on ' + track.album.release_date }}
							</div>
						</div>

						<!-- 						<div
							class="items-center justify-center cursor-pointer text-overflow"
							@click="playTrack(track.preview_url)"
						>
							<Play
								v-if="!isTrackPlaying || selectedTrack !== track.preview_url"
								class="text-black truncate bg-white rounded-full"
							/>
							<Pause v-else />
						</div> -->
					</div>
				</li>
			</ul>
		</div>
		<audio
			autoplay
			id="audio-play"
		></audio>
	</main>
</template>

<script setup>
	import { ref } from 'vue';
	import Play from 'vue-material-design-icons/Play.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';
	import Magnify from 'vue-material-design-icons/Magnify.vue';

	let isHover = ref(false);
	/* 	import { storeToRefs } from 'pinia';

	const useTrack = usePlayerStore();
	const { isTrackPlaying, selectedTrack, playbackTime } = storeToRefs(useTrack);

	 */
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
