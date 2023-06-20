<template>
	<div
		id="PlayerControl"
		class="fixed flex w-full h-20 border-t border-t-[#e0e0e0] dark:border-t-[#383838] bg-[#e6e6e6] dark:bg-[#23232d] items-center justify-between bottom-0 z-[50]"
	>
		<div class="flex items-center w-2/12">
			<div class="flex items-center justify-center h-8 pl-4">
				<button
					class="p-2 mx-2 rounded-full hover:text-[#f3f3f3] ease-out duration-100"
				>
					<SkipBackward
						class="text-[#747474] dark:text-[#808080]"
						:size="25"
					/>
				</button>

				<button
					class="p-2 rounded-full hover:bg-[#ef5465] hover:text-[#f3f3f3] dark:hover:text-[#fff] text-[#444] dark:text-[#e6e6e6] ease-out duration-100"
				>
					<Play
						v-if="!isPlaying"
						:size="45"
					/>

					<Pause
						v-else
						:size="45"
					/>
				</button>

				<button
					class="mx-2 p-2 rounded-full hover:bg-[#ef5465] hover:text-[#f3f3f3] dark:hover:text-[#fff] text-[#444] dark:text-[#e6e6e6] ease-out duration-100"
				>
					<SkipForward :size="25" />
				</button>
			</div>
		</div>
		<div class="mb-2.5 w-full max-w-[50%] mx-10">
			<div class="relative flex items-center justify-between pl-1 top-1 mx-7">
				<div class="flex items-center">
					<div
						class="bg-[#c6c6d2] dark:bg-[#2e2e39] text-[#797986] dark:text-[#72727d] text-[10px] px-1 py-0.5"
					>
						Sample
					</div>

					<div
						class="ml-3 text-[#444] dark:text-[#f3f3f3] text-[14px] font-[400] truncate"
					>
						Track Name
					</div>

					<div class="text-[#444] dark:text-[#f3f3f3] relative -top-1 left-1.5">
						.
					</div>

					<div
						class="ml-3 text-[#444] dark:text-[#f3f3f3] text-[14px] font-[400]"
					>
						Artist
					</div>

					<div class="flex items-center">
						<div
							class="p-1.5 ml-2 hover:bg-[#a6a6a6] dark:hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer ease-out duration-200"
						>
							<Plus
								class="text-[#747474] dark:text-[#808080]"
								:size="20"
							/>
						</div>
						<div
							class="p-1.5 ml-2 hover:bg-[#a6a6a6] dark:hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer ease-out duration-200"
						>
							<HeartOutline
								class="text-[#747474] dark:text-[#808080]"
								:size="20"
							/>
						</div>
						<div
							class="p-1.5 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer ease-out duration-200"
						>
							<Tune
								class="text-[#747474] dark:text-[#808080]"
								:size="20"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex items-center justify-end w-1/4 pr-6">
			<div class="flex items-center">
				<div
					class="p-2 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer"
				>
					<PictureInPictureBottomRight
						class="block text-[#444] dark:text-[#f3f3f3]"
						:size="17"
					/>
				</div>
				<div
					class="p-2 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer"
				>
					<ShuffleVariant
						class="block text-[#444] dark:text-[#f3f3f3]"
						:size="17"
					/>
				</div>

				<div
					class="relative"
					@mouseenter="($event) => (isVolumeHover = true)"
					@mouseleave="($event) => (isVolumeHover = false)"
				>
					<div
						class="p-2 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer"
					>
						<VolumeHigh
							v-if="currentVolume >= 50"
							class="block text-[#444] dark:text-[#f3f3f3]"
							:size="17"
						/>
						<VolumeMedium
							v-else-if="currentVolume >= 25 && currentVolume < 50"
							class="block text-[#444] dark:text-[#f3f3f3]"
							:size="17"
						/>
						<VolumeLow
							v-else-if="currentVolume > 0 && currentVolume < 25"
							class="block text-[#444] dark:text-[#f3f3f3]"
							:size="17"
						/>
						<VolumeMute
							v-else
							class="block text-[#444] dark:text-[#f3f3f3]"
							:size="17"
						/>
					</div>

					<div
						v-show="isVolumeHover"
						class="absolute p-2 px-4 -top-12 -left-20 border-2 border-[#e0e0e0] dark:border-[#383838] bg-[#f2f2f2] dark:bg-[#2a2a37] rounded-xl shadow-xl"
					>
						<MusicPlayerVolume />
					</div>
				</div>
				<div
					class="p-2 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer"
				>
					<Tune
						class="block text-[#444] dark:text-[#f3f3f3]"
						:size="17"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script></script>

<script setup>
	import { ref, watch, onMounted } from 'vue';

	import Play from 'vue-material-design-icons/Play.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';

	import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';

	import ShuffleVariant from 'vue-material-design-icons/ShuffleVariant.vue';
	import Plus from 'vue-material-design-icons//Plus.vue';
	import Tune from 'vue-material-design-icons//Tune.vue';
	import VolumeHigh from 'vue-material-design-icons//VolumeHigh.vue';
	import VolumeMedium from 'vue-material-design-icons//VolumeMedium.vue';
	import VolumeLow from 'vue-material-design-icons//VolumeLow.vue';
	import VolumeMute from 'vue-material-design-icons//VolumeMute.vue';
	import SkipForward from 'vue-material-design-icons//SkipForward.vue';
	import SkipBackward from 'vue-material-design-icons//SkipBackward.vue';
</script>

<style></style>
