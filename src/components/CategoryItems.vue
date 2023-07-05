<template>
	<RouterLink to="/search">
		<div
			v-if="randomColor.color"
			:style="`background-color: ${randomColor.color}`"
			class="contrast-[2] brightness-[0.87] rounded-xl aspect-square relative overflow-hidden"
		>
			<div class="text-white pt-3 pl-4 font-semibold text-[23px] truncate">
				{{ category }}
			</div>
			<img
				:src="image || ''"
				class="absolute contrast-[0.55] -right-3.5 -bottom-3 max-w-[100px] -rotate-[20deg]"
			/>
		</div>
	</RouterLink>
</template>

<script setup>
	import { toRefs, ref } from 'vue';
	import { RouterLink } from 'vue-router';
	import uniqolor from 'uniqolor';

	let randomColor = ref('');
	randomColor.value = uniqolor.random();

	const props = defineProps({ category: String, image: String });
	const { category } = toRefs(props);
</script>
