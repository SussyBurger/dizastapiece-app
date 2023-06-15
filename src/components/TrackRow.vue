<script setup>
	import artist from '../artist.json';
	import { ref, toRefs, onMounted } from 'vue';

	import Play from 'vue-material-design-icons/Play.vue';
	import Pause from 'vue-material-design-icons/Pause.vue';
	import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
	import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';
	import MicrophoneVariant from 'vue-material-design-icons/MicrophoneVariant.vue';

	import { useSongStore } from '../stores/song';
	import { storeToRefs } from 'pinia';

	const useSong = useSongStore();
	const { audio, isPlaying, currentTrack, hasLyrics } = storeToRefs(useSong);

	let isHover = ref(false);
	let isHoverGif = ref(false);
	let isTrackTime = ref('00:00');

	const props = defineProps({ track: Object });
	const { track } = toRefs(props);

	onMounted(() => {
		const audioMeta = new Audio(track.value.path);
		audioMeta.addEventListener('loadedmetadata', () => {
			const duration = audioMeta.duration;
			const minutes = Math.floor(duration / 60);
			const seconds = Math.floor(duration % 60);
			isTrackTime.value = minutes + ':' + seconds.toString().padStart(2, '0');
		});
	});

	const openLyrics = (track, artist) => {
		if (
			audio.value &&
			!audio.value.paused &&
			track.id === currentTrack.value.id
		) {
			isLyrics.value = true;
		} else if (
			audio.value &&
			audio.value.paused &&
			track.id === currentTrack.value.id
		) {
			useSong.playOrPauseSong();
			isLyrics.value = true;
		} else {
		}
	};
</script>

<template>
	<li
		@mouseenter="isHover = true"
		@mouseleave="isHover = false"
		class="w-full flex items-center justify-between p-2 hover:bg-[#979797] hover:bg-opacity-5"
	>
		<div class="flex items-center">
			<div class="relative">
				<div
					v-if="isHover"
					class="p-1 mt-[3px] ml-0.5 absolute rounded-full bg-white cursor-pointer text-black"
				>
					<Play
						v-if="!isPlaying && isHover"
						@click="useSong.playOrPauseThisSong(artist, track)"
					/>
					<Play
						v-else-if="isPlaying && currentTrack.name !== track.name"
						@click="useSong.loadSong(artist, track)"
					/>
				</div>

				<div
					v-else-if="
						track &&
						currentTrack &&
						currentTrack.name &&
						isPlaying === track.name
					"
					class="p-1 mt-[3px] ml-0.5 absolute rounded-full bg-white cursor-pointer"
				>
					<Pause
						v-if="!isHover"
						class="text-black"
						:size="25"
						@click="useSong.playOrPauseSong()"
					/>
				</div>

				<div
					@mouseenter="isHoverGif = true"
					@mouseleave="isHoverGif = false"
					v-if="
						isPlaying &&
						track &&
						currentTrack &&
						currentTrack.name === track.name
					"
					class="p-1 mt-[3px] ml-0.5 absolute rounded-full bg-white cursor-pointer"
				>
					<img v-if="!isHoverGif" src="/images/audio-wave.gif" :sizes="25" />
					<Pause
						v-if="isHoverGif"
						class="text-black"
						:size="25"
						@click="useSong.playOrPauseSong()"
					/>
				</div>

				<img
					width="37"
					class="border border-[#b3b3b3] dark:border-[#494949]"
					:src="artist.albumCover"
				/>
			</div>

			<div
				v-if="track"
				:class="
					track && currentTrack && currentTrack.name === track.name
						? 'text-[#ef5464]'
						: 'text-[#333] dark:text-[#d4d4d4]'
				"
				class="pl-4 text-sm cursor-pointer hover:underline"
			>
				{{ track.id }}. {{ track.name }}
			</div>
		</div>

		<div class="flex items-center">
			<div
				v-if="track.lyrics"
				@click="openLyrics(track, artist)"
				class="rotate-45 rounded-full p-1.5 mr-3 hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer"
			>
				<MicrophoneVariant class="text-[#333] dark:text-[#ccc]" :size="21" />
			</div>

			<div
				class="rounded-full p-1.5 mr-3 hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer"
			>
				<HeartOutline class="text-[#333] dark:text-[#ccc]" :size="21" />
			</div>
			<div
				class="rounded-full p-1.5 mr-3 hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer"
			>
				<DotsHorizontal class="text-[#333] dark:text-[#ccc]" :size="21" />
			</div>
			<div
				v-if="isTrackTime"
				:class="
					track && currentTrack && currentTrack.name === track.name
						? 'text-[#ef5464] dark:text-[#ef5464]'
						: 'text-[#333] dark:text-[#d4d4d4]'
				"
				class="text-[13px] font-[200] pl-10 text-[#333] dark:text-[#d4d4d4]"
			>
				{{ isTrackTime }}
			</div>
		</div>
	</li>
</template>
