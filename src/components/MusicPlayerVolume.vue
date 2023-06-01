<script setup>
	import { ref, onMounted, watch } from 'vue';

	import { useSongStore } from '../stores/song';
	import { storeToRefs } from 'pinia';
	const useSong = useSongStore();
	const { audio, currentVolume } = storeToRefs(useSong);

	let isHover = ref(false);
	let volume = ref(null);

	onMounted(() => {
		volume.value.addEventListener('input', (e) => {
			audio.value.volume = e.currentTarget.value / 100;
		});
	});

	watch(
		() => audio.value,
		() => {
			setTimeout(() => (audio.value.volume = currentVolume.value / 100), 200);
		}
	);
</script>

<template>
	<div
		class="flex items-center mt-2 ml-2 mb-6 w-[150px] relative"
		@mouseenter="($event) => (isHover = true)"
		@mouseleave="($event) => (isHover = false)"
	>
		<input
			v-model="currentVolume"
			ref="volume"
			type="range"
			class="absolute z-40 w-full h-0 my-2 mt-6 bg-opacity-100 rounded-full appearance-none cursor-pointer accent-[#ef5465] focus:outline-none"
			:class="({ rangeDotHidden: !isHover }, { rangeDot: isHover })"
		/>
		<div
			class="absolute inset-y-0 left-0 z-10 w-0 rounded-full pointer-events-none"
			:class="isHover ? 'h-1 mt-1.5' : 'h-1 mt-1.5'"
			:style="`width: ${currentVolume}%; background-color: #ef5465`"
		></div>
		<div
			class="absolute h-1 mt-1.5 -z-0 inset-y-0 left-0 w-full bg-[#bfbfbf] dark:bg-[#c4c4c4] rounded-full"
		></div>
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
