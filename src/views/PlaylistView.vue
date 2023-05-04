<script setup>
	import Play from 'vue-material-design-icons/Play.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';
	import Share from 'vue-material-design-icons/Share.vue';
	import Magnify from 'vue-material-design-icons/Magnify.vue';
	import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
	import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
	import ClockTimeFiveOutline from 'vue-material-design-icons/ClockTimeFiveOutline.vue';

	import artist from '../artist.json';
	import { useSongStore } from '../stores/song';
	import { storeToRefs } from 'pinia';

	const useSong = useSongStore();
	const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong);

	const playFunc = () => {
		if (currentTrack.value) {
			useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value);
			return;
		}
		useSong.playFromFirst();
	};
</script>

<template>
	<div id="" class="max-w-[1500px] mx-auto">
		<div
			class="flex items-center w-full relative h-full px-8 mt-6 min-w-[650px]"
		>
			<img width="175" class="rounded-full" :src="artist.avatar" />

			<div class="ml-8">
				<div
					class="text-black dark:text-white text-3xl w-full font-semibold hover:underline cursor-pointer"
				>
					{{ artist.name }}
				</div>

				<div class="py-1.5 text-black dark:text-[#bfbfbf] font-light">
					843,033 followers
				</div>

				<div class="flex gap-4 items-center justify-start bottom-0 mb-1.5">
					<button
						class="p-2.5 px-6 rounded-full bg-[#ef5465] hover:bg-[#da292a] text-white"
						@click="playFunc()"
					>
						<div
							v-if="!isPlaying"
							class="flex items-center ease-out duration-300"
						>
							<Play :size="20" />
							<div class="font-bold text-xs pr-1">PLAY</div>
						</div>
						<div v-else class="flex items-center ease-out duration-300">
							<Pause :size="20" />
							<div class="font-bold text-xs pr-1">PAUSE</div>
						</div>
					</button>

					<button
						class="rounded-full p-2 border border-[#52525D] hover:bg-[#2b2b30]"
					>
						<HeartOutline
							class="text-[#1a1a1a] dark:text-[#eaeaea]"
							:size="20"
						/>
					</button>

					<button
						class="rounded-full p-2 border border-[#52525D] hover:bg-[#2b2b30]"
					>
						<DotsHorizontal
							class="text-[#1a1a1a] dark:text-[#eaeaea]"
							:size="20"
						/>
					</button>
				</div>
			</div>
		</div>

		<div class="mt-11"></div>

		<div class="flex justify-between pt-2 min-w-[650px]">
			<ul class="flex items-center justify-start w-full text-gray-400 h-9">
				<li class="pl-8">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-out duration-300 text-[#808080] hover:text-[#121216] border-b-transparent hover:border-b-[#121216] dark:text-[#bebebe] dark:hover:text-white dark:hover:border-b-[#fff]"
					>
						Discography
					</button>
				</li>
				<li class="text-[#121216] dark:text-[#fff] pl-10">
					<button
						class="font-semibold cursor-pointer border-b-2 border-b-[#ef5465] pb-2"
					>
						Top Tracks
					</button>
				</li>
				<li class="pl-10">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-out duration-300 text-[#808080] hover:text-[#121216] border-b-transparent hover:border-b-[#121216] dark:text-[#bebebe] dark:hover:text-white dark:hover:border-b-[#fff]"
					>
						Similar Artists
					</button>
				</li>
				<li class="pl-10">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-out duration-300 text-[#808080] hover:text-[#121216] border-b-transparent hover:border-b-[#121216] dark:text-[#bebebe] dark:hover:text-white dark:hover:border-b-[#fff]"
					>
						Playlists
					</button>
				</li>
				<li class="pl-10">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-out duration-300 text-[#808080] hover:text-[#121216] border-b-transparent hover:border-b-[#121216] dark:text-[#bebebe] dark:hover:text-white dark:hover:border-b-[#fff]"
					>
						Bio
					</button>
				</li>
			</ul>
		</div>
	</div>

	<div
		class="ease-out duration-200 border-b border-b-[#e9e9e9] dark:border-b-[#302d2d]"
	></div>

	<div class="mb-10"></div>

	<div id="SongsSection" class="max-w-[1500px] mx-auto">
		<div class="pl-8">
			<div class="mb-7 font-semibold text-3xl text-[#121216] dark:text-white">
				Tracklist
			</div>

			<div
				class="flex items-center border border-[#D1D1D6] dark:border-[#525254] bg-[#F8F8F9] dark:bg-[#23232D] rounded-sm text-[#c9c9c9] w-[300px]"
			>
				<Magnify class="text-[#9B9BA1] px-1" />
				<input
					type="text"
					class="w-full py-[5px] placeholder-[#cccccc] dark:placeholder-[#4d4d4d] bg-transparent outline-none ring-0 hover:ring-0 text-sm"
					placeholder="Search within tracklist"
				/>
			</div>
		</div>
	</div>
</template>

<style></style>
