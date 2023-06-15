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
		class="max-w-[1500px] mx-auto"
	>
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
					class="w-full py-[5px] placeholder-[#ccc] dark:placeholder-[#4d4d4d] bg-transparent outline-none ring-0 hover:ring-0 text-sm"
					placeholder="Search within tracklist"
				/>
			</div>
		</div>

		<div class="mb-4"></div>

		<div
			class="flex items-center justify-between min-w-[590px] mx-8 border-b border-b-[#cecaca] dark:border-b-[#302d2d] px-1.5 py-2.5"
		>
			<div class="text-xs font-light text-[#aeaeae] dark:text-[#4d4d4d]">
				TRACK
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
