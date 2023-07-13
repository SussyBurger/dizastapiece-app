<script setup>
	import Play from 'vue-material-design-icons/Play.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';
	import Share from 'vue-material-design-icons/Share.vue';

	import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
	import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';

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
	<div
		id="HeaderSection"
		class="max-w-[1200x] mx-auto"
	>
		<div class="flex items-center relative h-full px-8 mt-6 min-w-[650px]">
			<img
				width="175"
				class="rounded-full"
				:src="artist.avatar"
			/>

			<div class="ml-8">
				<div
					class="w-full text-3xl font-semibold text-black cursor-pointer dark:text-white hover:underline"
				>
					{{ artist.name }}
				</div>

				<div class="py-1.5 text-black dark:text-[#bfbfbf] font-light">
					843,033 followers
				</div>

				<div class="flex gap-4 items-center justify-start bottom-0 mb-1.5">
					<button
						class="p-2.5 px-6 rounded-full bg-[#ef5465] hover:bg-[#E4062F] text-white"
						@click="playFunc()"
					>
						<div
							v-if="!isPlaying"
							class="flex items-center px-6 duration-300 ease-out"
						>
							<Play :size="20" />
							<div class="pr-1 text-sm font-bold">PLAY</div>
						</div>
						<div
							v-else
							class="flex items-center px-6 duration-300 ease-out"
						>
							<Pause :size="20" />
							<div class="pr-1 text-sm font-bold">PAUSE</div>
						</div>
					</button>

					<button
						class="rounded-full p-2 border border-[#52525D] hover:bg-[#999] hover:bg-opacity-20 dark:hover:bg-[#2b2b30] ease-out duration-200"
					>
						<HeartOutline
							class="text-[#1a1a1a] dark:text-[#eaeaea]"
							:size="20"
						/>
					</button>

					<button
						class="rounded-full p-2 border border-[#52525D] hover:bg-[#999] hover:bg-opacity-20 dark:hover:bg-[#2b2b30] ease-out duration-200"
					>
						<Share
							class="text-[#1a1a1a] dark:text-[#eaeaea]"
							:size="20"
						/>
					</button>

					<button
						class="rounded-full p-2 border border-[#52525D] hover:bg-[#999] hover:bg-opacity-20 dark:hover:bg-[#2b2b30] ease-out duration-200"
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
			<ul
				id="navbar"
				class="flex items-center justify-start w-full text-gray-400 h-9"
			>
				<li class="pl-8">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-in-out duration-200 text-[#0d0d0d] hover:font-normal border-b-transparent hover:border-b-[#121216] dark:text-[#f2f2f2] dark:hover:text-[#f3f3f3] dark:hover:border-b-[#f3f3f3]"
					>
						<RouterLink to="/bio">Bio</RouterLink>
					</button>
				</li>
				<li class="text-[#121216] dark:text-[#fff] pl-10">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-in-out duration-200 text-[#0d0d0d] hover:font-normal border-b-transparent hover:border-b-[#121216] dark:text-[#f2f2f2] dark:hover:text-[#f3f3f3] dark:hover:border-b-[#f3f3f3]"
					>
						<RouterLink to="/toptracks">Top Tracks</RouterLink>
					</button>
				</li>
				<li class="pl-10">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-in-out duration-200 text-[#0d0d0d] hover:font-normal border-b-transparent hover:border-b-[#121216] dark:text-[#f2f2f2] dark:hover:text-[#f3f3f3] dark:hover:border-b-[#f3f3f3]"
					>
						<RouterLink to="/similarartists">Similar Artists</RouterLink>
					</button>
				</li>
			</ul>
		</div>
	</div>

	<div
		class="ease-out duration-200 border-b border-b-[#e9e9e9] dark:border-b-[#302d2d]"
	></div>

	<main class="py-10 ease-out duration-300 w-full min-w-[480px]">
		<RouterView />
	</main>
</template>

<style></style>
