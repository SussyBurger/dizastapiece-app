<script setup>
	import { ref } from 'vue';
	import { RouterLink } from 'vue-router';

	let isHover = ref(false);
	const props = defineProps({ by: String, song: String, image: String });
</script>

<template>
	<RouterLink
		to="/artist"
		class="cursor-pointer"
	>
		<div
			class="relative"
			@mouseenter="isHover = true"
			@mouseleave="isHover = false"
		>
			<!-- <div class="absolute w-full h-full bg-black"></div> -->
			<div
				class="absolute z-10 w-full h-full bg-black rounded-md"
				:class="
					isHover
						? 'transition ease-in duration-150 bg-opacity-50'
						: 'transition ease-out duration-150 bg-opacity-30'
				"
			>
				<div class="absolute z-50 pt-4 pl-4">
					<div
						class="inline-block px-2 py-1 text-sm text-center text-white bg-black rounded-md font-primary bg-opacity-40"
					>
						Album
					</div>
					<div class="text-white text-xl mt-2 font-[700]">{{ by }}</div>
					<div class="text-white mt-2 font-[400]">{{ song }}</div>
				</div>
			</div>

			<img
				:src="image"
				class="w-[800px] h-[300px] object-cover rounded-lg"
			/>
		</div>
	</RouterLink>
</template>
