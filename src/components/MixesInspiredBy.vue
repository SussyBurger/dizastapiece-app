<script setup>
	import { toRefs, ref } from 'vue';
	import { RouterLink } from 'vue-router';

	import Play from 'vue-material-design-icons/Play.vue';

	let isHover = ref(false);

	const props = defineProps({
		by: String,
		image: String,
		text: String,
		to: String,
	});

	const { by, image, text, to } = toRefs(props);
</script>

<template>
	<main>
		<RouterLink
			:to="to"
			class="relative"
		>
			<div
				class="flex items-center bg-[#DADCE0] dark:bg-[#23232D] rounded-sm h-[54px] relative"
			>
				<div
					class="flex items-center w-[54px]"
					@mouseenter="isHover = true"
					@mouseleave="isHover = false"
				>
					<div
						:class="
							isHover
								? 'transition ease-in duration-100 bg-opacity-40 dark:bg-opacity-40'
								: 'transition ease-out duration-100 bg-opacity-5 dark:bg-opacity-5'
						"
						class="absolute h-full z-10 w-[54px] bg-[#ccc] dark:bg-black rounded-sm"
					></div>
					<div
						:class="
							isHover
								? 'transition ease-in duration-100 bg-opacity-100'
								: 'transition ease-out duration-100 bg-opacity-0 opacity-0'
						"
						class="absolute z-20 p-1.5 rounded-full bg-white hover:bg-[#999] hover:bg-opacity-20 ease-out duration-200 left-[6px]"
					>
						<Play
							:size="30"
							class="text-black"
						/>
					</div>
					<img
						:src="image"
						class="min-h-[54px] min-w-[54px] rounded-sm z-0"
					/>
				</div>
				<div class="w-full ml-4 truncate">
					<p
						class="hover:underline truncate max-w-[95%] text-black dark:text-gray-200 font-light text-[15px] cursor-pointer"
					>
						{{ text }}
					</p>
					<p
						class="text-[#666A6F] dark:text-[#787882] truncate text-[12px] max-w-[95%] font-light"
					>
						by <span class="cursor-pointer hover:underline">{{ by }}</span>
					</p>
				</div>
			</div>
		</RouterLink>
	</main>
</template>
