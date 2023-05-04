<script setup>
	import Highlights from '../components/Highlights.vue';
</script>

<template>
	<div>
		<div class="px-8 mt-8 min-w-[800px]">
			<div class="py-3"></div>
			<p class="text-center pb-6 dark:text-[#d1d1d6] text-sm">Sample Text</p>
			<div class="flex justify-center gap-7">
				<!-- 				<div class="flex items-center justify-center relative">
					<img
						src="https://picsum.photos/id/79/300/300"
						class="absolute -left-36 z-0 rounded-full cursor-pointer"
						width="100"
					/>
					<img
						src="https://picsum.photos/id/79/300/300"
						class="absolute -left-20 z-0 rounded-full cursor-pointer"
						width="115"
					/>
					<img
						src="https://picsum.photos/id/79/300/300"
						class="z-0 rounded-full cursor-pointer"
						width="160"
					/>
					<img
						src="https://picsum.photos/id/79/300/300"
						class="absolute -right-20 z-0 rounded-full cursor-pointer"
						width="115"
					/>
					<img
						src="https://picsum.photos/id/79/300/300"
						class="absolute -right-36 z-0 rounded-full cursor-pointer"
						width="100"
					/>
				</div> -->
			</div>
			<div class="w-full flex justify-center p-3">
				<button
					type="button"
					class="text-white bg-[#ed5465] hover:bg-[#d8384a] font-semibold rounded-full px-8 py-2 text-center text-[15px]"
				>
					Add
				</button>
			</div>
		</div>
	</div>

	<div class="px-8 mt-8 min-w-[800px]">
		<div class="dark:text-white text-xl font-semibold inline-block">
			Hightlights
		</div>

		<div class="py-3"></div>
		<div class="flex items-center gap-8">
			<div class="rounded-lg w-1/2">
				<Highlights
					by="Some Artist 1"
					song="Random Song 1"
					image="https://picsum.photos/id/274/800/300"
				/>
			</div>
			<div class="rounded-lg w-1/2">
				<Highlights
					by="Some Artist 2"
					song="Random Song 2"
					image="https://picsum.photos/id/299/800/300"
				/>
			</div>
		</div>
	</div>
</template>

<style></style>
