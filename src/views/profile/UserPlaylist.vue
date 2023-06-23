<template>
	<div class="px-4 pl-8">
		<h1 class="mb-6 text-3xl font-semibold uppercase font-primary">
			My Playlists
		</h1>
		<ul class="flex flex-col justify-center w-full gap-4 md:justify-between">
			<li
				class=""
				v-for="playlist in playlists"
				:key="playlist.id"
			>
				<div class="flex flex-row">
					<img
						:src="
							playlist.images.length
								? playlist.images[0].url
								: 'images/no-cover-art.jpg'
						"
						class="z-0 m-1 border border-[#e0e0e0] dark:border-[#32323d] rounded-sm w-24"
					/>

					<div class="pl-2">
						<h2 class="text-3xl font-semibold">{{ playlist.name }}</h2>
						<span>{{ playlist.tracks.total + ' song' }}</span>
						<div>
							<button @click="getTracks(playlist.id)">
								{{ playlist.showTracks ? 'Hide tracklist' : 'Show tracklist' }}
							</button>
						</div>
					</div>
				</div>

				<div class="relative pt-2">
					<ul
						v-if="playlist.showTracks"
						class="flex flex-col justify-center w-full gap-2 ml-4 md:justify-between"
					>
						<li
							v-for="track in playlist.tracks.items"
							class="flex flex-1 font-primary hover:bg-[#979797] hover:bg-opacity-20"
							@mouseenter="isHover = true"
							@mouseleave="isHover = false"
							:key="track.track.id"
						>
							<div class="flex flex-1">
								<div class="flex items-center w-16 h-16 gap-2">
									<div
										class="absolute h-14 z-10 w-14 m-1 bg-[#ccc] dark:bg-black rounded-sm"
										:class="
											isHover
												? 'transition ease-in duration-200 bg-opacity-40 dark:bg-opacity-40'
												: 'transition ease-out duration-200 bg-opacity-5 dark:bg-opacity-5'
										"
									></div>
									<div
										class="absolute left-6 z-20 p-2 rounded-full bg-white hover:bg-[#ef5465] text-black hover:text-white cursor-pointer ease-out duration-200"
										:class="{
											'transition ease-in duration-200 opacity-100':
												isHover && hoveredTrackId === track.track.id,
											'transition ease-out duration-200 opacity-0':
												hoveredTrackId !== track.track.id,
										}"
									>
										<Play
											class="truncate rounded-full"
											:size="32"
										/>
										<Pause
											class="hidden"
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
									<p class="text-base">{{ track.track.name }}</p>
									<p class="text-sm">{{ track.track.artists[0].name }}</p>
									<p class="text-xs text-[#858590] ease-out duration-200">
										{{ track.track.album.name }}
									</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</li>
		</ul>

		<div class="mb-8"></div>

		<!-- 		<div class="w-full px-2 mx-auto">
			<CreatePlaylist></CreatePlaylist>
		</div> -->

		<div class="pb-40"></div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import Play from 'vue-material-design-icons/Play.vue';
	import Plus from 'vue-material-design-icons/Plus.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';

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
		},
		components: { CreatePlaylist },
	};
</script>

<style></style>
