<script setup>
	import Highlights from '../components/Highlights.vue';
</script>

<template>
	<div>
		<div class="px-8 mt-8 w-screen min-w-[480px]">
			<div class="py-3"></div>
			<p class="font-primary text-center pb-6 dark:text-[#d1d1d6] text-sm">
				Sample Text
			</p>
			<div class="flex justify-center gap-7">
				<!-- 				<div class="relative flex items-center justify-center">
					<img
						src="https://picsum.photos/id/79/300/300"
						class="absolute z-0 rounded-full cursor-pointer -left-36"
						width="100"
					/>
					<img
						src="https://picsum.photos/id/79/300/300"
						class="absolute z-0 rounded-full cursor-pointer -left-20"
						width="115"
					/>
					<img
						src="https://picsum.photos/id/79/300/300"
						class="z-0 rounded-full cursor-pointer"
						width="160"
					/>
					<img
						src="https://picsum.photos/id/79/300/300"
						class="absolute z-0 rounded-full cursor-pointer -right-20"
						width="115"
					/>
					<img
						src="https://picsum.photos/id/79/300/300"
						class="absolute z-0 rounded-full cursor-pointer -right-36"
						width="100"
					/>
				</div> -->
			</div>
			<div class="flex justify-center w-full p-3">
				<button
					type="button"
					class="text-white bg-[#ed5465] hover:bg-[#d8384a] font-semibold rounded-full px-8 py-2 text-center text-[15px]"
				>
					Add
				</button>
			</div>
		</div>
	</div>

	<div class="w-screen px-8 mt-8">
		<div class="inline-block text-xl font-semibold dark:text-white">
			Hightlights
		</div>

		<div class="py-3"></div>

		<div class="flex items-center justify-center w-full gap-8 mx-auto">
			<div class="w-1/3 py-4 rounded-lg">
				<Highlights
					by="Some Artist 1"
					song="Random Song 1"
					image="https://picsum.photos/id/274/800/300"
				/>
			</div>
			<div class="w-1/3 py-4 rounded-lg">
				<Highlights
					by="Some Artist 2"
					song="Random Song 2"
					image="https://picsum.photos/id/299/800/300"
				/>
			</div>
		</div>
	</div>
</template>
