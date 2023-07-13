<script setup>
	import { toRefs, ref } from 'vue';
	import { RouterLink } from 'vue-router';

	import 'vue3-carousel/dist/carousel.css';
	import { Carousel, Slide } from 'vue3-carousel';
	import CarouselItems from './CarouselItems.vue';

	import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';
	import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';

	let currentSlide = ref(0);
	let isHoverCategory = ref(false);

	const props = defineProps({
		category: String,
		data: Array,
	});

	const { data, category } = toRefs(props);

	const slideTo = (val) => {
		if (val && currentSlide.value <= 7) {
			let res = currentSlide.value + 2;
			if (res <= 12) {
				currentSlide.value += 2;
			} else if (res > 12) {
				currentSlide.value = 12;
			}
		} else if (!val) {
			let res = currentSlide.value - 2;
			if (res > 0) {
				currentSlide.value -= 2;
			} else if (res < 1) {
				currentSlide.value = 0;
			}
		}
	};
</script>

<template>
	<div>
		<div class="flex justify-between pb-5 ml-8 mr-6">
			<RouterLink
				to="/search"
				@mouseenter="isHoverCategory = true"
				@mouseleave="isHoverCategory = false"
				:class="
					isHoverCategory ? 'hover:text-[#ef5465]' : '#000000 dark:#ffffff'
				"
				class="flex items-center text-xl font-semibold cursor-pointer"
			>
				{{ category }}
				<ChevronRight
					:class="isHoverCategory ? 'hover:[#ef5465] ' : '#000000 dark:#ffffff'"
					:size="25"
					class="mt-1"
				/>
			</RouterLink>

			<div class="flex items-center">
				<button
					class="rounded-full p-2 hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b2b]"
					@click="slideTo(false)"
				>
					<ChevronLeft
						class="dark:text-white"
						:size="30"
					/>
				</button>
				<div class="px-2"></div>
				<button
					class="rounded-full p-2 hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b2b]"
					@click="slideTo(true)"
				>
					<ChevronRight
						class="dark:text-white"
						:size="30"
					/>
				</button>
			</div>
		</div>

		<Carousel
			class="mr-8"
			ref="carousel"
			v-model="currentSlide"
			:items-to-show="4"
			:items-to-scroll="4"
			:transition="800"
			snapAlign="start"
		>
			<Slide
				v-for="slide in data"
				:key="slide"
				class="flex items-baseline"
			>
				<CarouselItems :slide="slide" />
			</Slide>
		</Carousel>
	</div>
</template>
