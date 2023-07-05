<script setup>
	import { ref } from 'vue';
	import { RouterLink } from 'vue-router';

	import Play from 'vue-material-design-icons/Play.vue';
	import HeartOutline from 'vue-material-design-icons/HeartOutline.vue';
	import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue';

	let isHover = ref(false);
	const props = defineProps({ slide: Object });
</script>

<template>
	<div class="pl-8">
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
				></div>

				<div
					class="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 p-1.5 rounded-full bg-white z-50"
				>
					<Play class="text-black text-[69px]" />
				</div>

				<div
					:class="
						isHover
							? 'transition ease-in duration-150 opacity-100'
							: 'transition ease-out duration-150 opacity-0'
					"
					class="hidden lg:block absolute z-50 bottom-3 left-[60px] rounded-full text-black bg-white p-2"
				>
					<HeartOutline
						:class="
							isHover
								? 'transition ease-in duration-150 bg-opacity-100'
								: 'transition ease-out duration-150 opacity-0'
						"
						:size="23"
					/>
				</div>

				<div
					:class="
						isHover
							? 'transition ease-in duration-150 opacity-100'
							: 'transition ease-out duration-150 opacity-0'
					"
					class="hidden lg:block absolute z-50 bottom-3 left-[107px] rounded-full text-black bg-white p-1.5"
				>
					<DotsHorizontal
						:class="
							isHover
								? 'transition ease-in duration-150 bg-opacity-100'
								: 'transition ease-out duration-150 opacity-0'
						"
						:size="27"
					/>
				</div>

				<img
					class="w-5 md:w-6 absolute z-40 right-0 bottom-0 pb-1.5 mr-1.5 md:pb-3 md:mr-3 contrat-[1.4] brightness-[1.1]"
					src="/images/sound-wave-icon.png"
				/>

				<img
					:src="slide.url"
					class="rounded-md aspect-square"
				/>
			</div>

			<div class="mt-2 text-left dark:text-white">
				<div class="text-sm hover:underline">{{ slide.song }}</div>
				<div class="text-[13px] text-[#858590] flex hover:underline">
					{{ slide.by }}
				</div>
				<div class="text-[11px] text-[#858590] pt-0.5 flex">
					Released on {{ slide.released }}
				</div>
			</div>
		</RouterLink>
	</div>
</template>
