<script setup>
	import { ref } from 'vue';
	import { RouterLink } from 'vue-router';

	import Play from 'vue-material-design-icons/Play.vue';

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
			<div
				:class="
					isHover
						? 'transition ease-in duration-150 bg-opacity-30'
						: 'transition ease-out duration-150 bg-opacity-5'
				"
				class="absolute z-10 w-full h-full bg-black rounded-md"
			>
				<div class="absolute z-50 pt-4 pl-4">
					<div
						class="inline-block px-2 py-1 text-sm text-center text-white bg-black rounded-md bg-opacity-40"
					>
						Album
					</div>
					<div class="text-white text-xl mt-2 font-[700]">{{ by }}</div>
					<div class="text-white mt-2 font-[400]">{{ song }}</div>
				</div>
			</div>

			<!-- 			<div class="absolute z-45 bottom-3 left-3 rounded-full bg-white p-1.5">
				<Play :size="27" class="text-black" />
			</div> -->

			<img
				:src="image"
				class="rounded-lg"
			/>
		</div>
	</RouterLink>
</template>
