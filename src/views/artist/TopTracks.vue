<script setup>
	import TrackRow from '../../components/TrackRow.vue';

	import Magnify from 'vue-material-design-icons/Magnify.vue';
	import ClockTimeFiveOutline from 'vue-material-design-icons/ClockTimeFiveOutline.vue';

	import artist from '../../artist.json';
	import { useSongStore } from '../../stores/song.js';
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
		id="SongsSection"
		class="mx-2 max-w-[1400px]"
	>
		<div class="pl-8">
			<div class="mb-7 font-semibold text-3xl text-[#121216] dark:text-white">
				Tracklist
			</div>
		</div>

		<div class="mb-4"></div>

		<div
			class="flex items-center min-w-[590px] mx-8 border-b border-b-[#cecaca] dark:border-b-[#302d2d] px-1.5 py-2.5"
		>
			<div class="flex flex-1">
				<div class="text-xs font-light text-[#aeaeae] dark:text-[#4d4d4d]">
					#
				</div>
				<div class="pl-6 text-xs font-light text-[#aeaeae] dark:text-[#4d4d4d]">
					TITLE
				</div>
			</div>

			<ClockTimeFiveOutline
				class="text-[#aeaeae] dark:text-[#4d4d4d]"
				:size="20"
			/>
		</div>

		<ul
			class="w-full mx-8 pr-16 min-w-[650px]"
			v-for="track in artist.tracks"
			:key="track"
		>
			<TrackRow
				v-if="track"
				:track="track"
			/>
		</ul>
	</div>
</template>

<style></style>
