<script setup>
	import { ref, watch, onMounted } from 'vue';
	import uniqolor from 'uniqolor';

	import MusicPlayerVolume from '../components/MusicPlayerVolume.vue';

	import lyrics from '../lyrics.json';

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

	import PictureInPictureBottomRight from 'vue-material-design-icons/PictureInPictureBottomRight.vue';

	import { useSongStore } from '../stores/song';
	import { storeToRefs } from 'pinia';
	const useSong = useSongStore();
	const {
		isPlaying,
		audio,
		currentTrack,
		currentArtist,
		trackTime,
		hasLyrics,
		currentVolume,
	} = storeToRefs(useSong);

	let randColor = ref('');
	randColor.value = uniqolor.random();

	let isHover = ref(false);
	let isVolumeHover = ref(false);
	let isTrackTimeTotal = ref('0:00');
	let isTrackTimeCurrent = ref('0:00');
	let range = ref(0);
	let seeker = ref(null);
	let seekerContainer = ref(null);

	onMounted(() => {
		if (audio.value) {
			setTimeout(() => {
				timeupdate();
				loadmetadata();
			}, 300);
		}
		if (currentTrack.value) {
			seeker.value.addEventListener('change', function () {
				const time = audio.value.duration * (seeker.value.value / 100);
				audio.value.currentTime = time;
			});
			seeker.value.addEventListener('mousedown', function () {
				audio.value.pause();
				isPlaying.value = false;
			});
			seeker.value.addEventListener('mouseup', function () {
				audio.value.play();
				isPlaying.value = true;
			});
			seekerContainer.value.addEventListener('click', function (e) {
				const clickPosition =
					(e.pageX - seekerContainer.value.offsetLeft) /
					seekerContainer.value.offsetWidth;
				const time = audio.value.duration * clickPosition;
				audio.value.currentTime = time;
				seeker.value.value =
					(100 / audio.value.duration) * audio.value.currentTime;
			});
		}
	});

	const timeupdate = () => {
		audio.value.addEventListener('timeupdate', function () {
			var minutes = Math.floor(audio.value.currentTime / 60);
			var seconds = Math.floor(audio.value.currentTime - minutes * 60);
			isTrackTimeCurrent.value =
				minutes + ':' + seconds.toString().padStart(2, '0');
			trackTime.value = isTrackTimeCurrent.value;
			const value = (100 / audio.value.duration) * audio.value.currentTime;
			range.value = value;
			seeker.value.value = value;
		});
	};

	const loadmetadata = () => {
		audio.value.addEventListener('loadedmetadata', function () {
			const duration = audio.value.duration;
			const minutes = Math.floor(duration / 60);
			const seconds = Math.floor(duration % 60);
			isTrackTimeTotal.value =
				minutes + ':' + seconds.toString().padStart(2, '0');
		});
	};

	watch(
		() => audio.value,
		() => {
			timeupdate();
			loadmetadata();
		}
	);

	watch(
		() => isTrackTimeCurrent.value,
		(time) => {
			if (time && time == isTrackTimeTotal.value) {
				useSong.nextSong(currentTrack.value);
			}
		}
	);

	watch(
		() => currentTrack.value.id,
		(val) => {
			randColor.value = uniqolor.random();
			if (currentTrack.value.lyrics) {
				hasLyrics.value = true;
				return;
			}
			hasLyrics.value = false;
		}
	);
</script>

<template>
	<div
		v-if="audio"
		id="MusicPlayer"
		class="fixed flex min-w-[1000px] w-full h-20 border-t border-t-[#e0e0e0] dark:border-t-[#383838] bg-[#f2f2f2] dark:bg-[#23232d] items-center justify-between bottom-0 z-[50]"
	>
		<div class="flex items-center w-2/12">
			<div class="flex items-center justify-center h-[30px] pl-4">
				<button
					type="button"
					class="p-2 mx-2 rounded-full hover:text-[#f3f3f3] ease-out duration-100"
					:class="{
						'hover:bg-[#ef5465]': currentTrack.id !== 1,
					}"
					:disabled="currentTrack.id === 1"
					@click="useSong.prevSong(currentTrack)"
				>
					<SkipBackward
						:class="{
							'text-[#747474] dark:text-[#808080]': currentTrack.id === 1,
						}"
						:size="25"
					/>
				</button>

				<button
					type="button"
					class="p-2 rounded-full hover:bg-[#ef5465] hover:text-[#f3f3f3] dark:hover:text-[#fff] text-[#444] dark:text-[#e6e6e6] ease-out duration-100"
					@click="
						($event) => useSong.playOrPauseThisSong(currentArtist, currentTrack)
					"
				>
					<Play v-if="!isPlaying" :size="45" />
					<Pause v-else :size="45" />
				</button>
				<button
					type="button"
					class="mx-2 p-2 rounded-full hover:bg-[#ef5465] hover:text-[#f3f3f3] dark:hover:text-[#fff] text-[#444] dark:text-[#e6e6e6] ease-out duration-100"
					@click="($event) => useSong.nextSong(currentTrack)"
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
						Album
					</div>
					<div
						class="ml-3 text-[#444] dark:text-[#f3f3f3] text-[14px] font-[400]"
					>
						{{ currentTrack.name }}
					</div>

					<div class="text-[#444] dark:text-[#f3f3f3] relative -top-1 left-1.5">
						.
					</div>
					<div
						class="ml-3 text-[#444] dark:text-[#f3f3f3] text-[14px] font-[400]"
					>
						{{ currentArtist.name }}
					</div>
				</div>

				<div class="flex items-center">
					<div
						class="p-1.5 ml-2 hover:bg-[#a6a6a6] dark:hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer ease-out duration-200"
					>
						<Plus class="text-[#747474] dark:text-[#808080]" :size="20" />
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
						<Tune class="text-[#747474] dark:text-[#808080]" :size="20" />
					</div>
				</div>
			</div>

			<div class="flex items-center">
				<div
					class="text-[#808080] dark:text-[#8a8a8a] text-[10px] pr-2 relative -bottom-[5px]"
				>
					{{ isTrackTimeCurrent }}
				</div>

				<div
					ref="seekerContainer"
					class="relative w-full mt-2 mb-3"
					@mouseenter="isHover = true"
					@mouseleave="isHover = false"
				>
					<input
						v-model="range"
						ref="seeker"
						type="range"
						class="absolute accent-[#ef5465] rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none cursor-pointer"
						:class="({ rangeDotHidden: !isHover }, { rangeDot: isHover })"
					/>
					<div
						class="absolute inset-y-0 left-0 z-10 w-0 rounded-full pointer-events-none"
						:class="isHover ? 'h-1 mt-[5px]' : 'h-0.5 mt-1.5'"
						:style="`width: ${range}%; background-color: #ef5465 `"
					></div>
					<div
						class="absolute inset-y-0 left-0 z-0 w-full bg-[#bfbfbf] dark:bg-[#c4c4c4] rounded-full pointer-events-none"
						:class="isHover ? 'h-1 mt-[5px]' : 'h-0.5 mt-1.5'"
					></div>
				</div>

				<div
					v-if="isTrackTimeTotal"
					class="text-[#808080] dark:text-[#8a8a8a] text-[10px] pl-2 relative -bottom-[5px]"
				>
					{{ isTrackTimeTotal }}
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
					<Tune class="block text-[#444] dark:text-[#f3f3f3]" :size="17" />
				</div>
			</div>
			<div
				class="flex items-center ml-6 border-l border-l-[#bfbfbf] dark:border-l-[#363636]"
			>
				<img
					:src="currentArtist.albumCover"
					class="ml-6 rounded-sm"
					width="28"
				/>
				<div class="text-xs ml-1.5 text-[#444] dark:text-[#f3f3f3] font-light">
					Queue
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.rangeDotHidden[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 0;
		height: 0;
	}

	.rangeDot[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		background-color: #ef5465;
		border-radius: 100%;
		width: 12px;
		height: 12px;
	}
</style>
