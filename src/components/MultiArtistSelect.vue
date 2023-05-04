<script setup>
	import { toRefs, ref } from 'vue';
	import { RouterLink } from 'vue-router';

	import Play from 'vue-material-design-icons/Play.vue';

	let isHover = ref(false);

	const props = defineProps({
		category: String,
		images: Object,
		text: String,
		to: String,
	});

	const { category, images, text, to } = toRefs(props);
</script>

<template>
	<div>
		<RouterLink :to="to" class="relative">
			<div
				@mouseenter="isHover = true"
				@mouseleave="isHover = false"
				class="flex justify-center items-center contrast-[2] brightness-[0.87] rounded-md aspect-square overflow-hidden"
			>
				<div
					:class="
						isHover
							? 'transition ease-in duration-150 bg-opacity-20'
							: 'transition ease-out duration-150 bg-opacity-5'
					"
					class="absolute w-full h-full bg-black z-10 rounded-md"
				></div>

				<img
					class="absolute contrast-[0.55] left-0 top-0 w-1/2"
					:src="images.one"
				/>
				<img
					class="absolute contrast-[0.55] right-0 top-0 w-1/2"
					:src="images.two"
				/>
				<img
					class="absolute contrast-[0.55] left-0 bottom-0 w-1/2"
					:src="images.three"
				/>
				<img
					class="absolute contrast-[0.55] right-0 bottom-0 w-1/2"
					:src="images.four"
				/>

				<div
					class="absolute z-10 p-2 rounded-full bg-white hover:bg-[#e6e6e6] inline-block ease-out duration-300"
				>
					<Play :size="30" class="text-black" />
				</div>
				<div
					class="absolute z-30 flex items-center bottom-1 left-0 h-7 ml-1 bg-black rounded-full px-2 bg-opacity-10"
				>
					<img
						src="/images/sound-wave-icon.png"
						class="pr-2 opacity-[0.75] brightness-[1.2]"
						width="30"
					/>
					<div class="text-white font-bold text-[21px]">{{ category }}</div>
				</div>
			</div>
		</RouterLink>

		<div class="h-2"></div>

		<RouterLink :to="to">
			<div class="hover:underline">{{ text }}</div>
		</RouterLink>
	</div>
</template>

<style></style>
