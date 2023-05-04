<script setup>
	import MixesInspiredBy from '../components/MixesInspiredBy.vue';
	import MultiArtistSelect from '../components/MultiArtistSelect.vue';
	import CarouselSlider from '../components/slider/CarouselSlider.vue';
</script>

<template>
	<div class="max-w-[1500px] mx-auto">
		<div class="px-8 mt-8 min-w-[800px] w-full">
			<!-- 1st Section -->
			<div class="dark:text-white text-xl font-semibold inline-block">
				Mixes inspired by
			</div>

			<div class="text-sm font-light dark:text-[#a2a2ad]">
				Based on the tracks you love
			</div>

			<div class="py-3"></div>

			<div class="flex justify-between w-full gap-8">
				<div class="xl:w-1/3 w-1/2 dark:text-white">
					<MixesInspiredBy
						class="pb-1.5"
						text="Track Name #1"
						by="Artist no.1"
						to="/categories"
						image="/images/album-cover.png"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Track Name #4"
						by="Artist no.1"
						to="/categories"
						image="/images/album-cover.png"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Track Name #7"
						by="Artist no.1"
						to="/categories"
						image="/images/album-cover.png"
					/>
				</div>
				<div class="xl:block hidden xl:w-1/3 sm:w-1/2 md:block dark:text-white">
					<MixesInspiredBy
						class="pb-1.5"
						text="Track Name #2"
						by="Artist no.1"
						to="/categories"
						image="/images/album-cover.png"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Track Name #5"
						by="Artist no.1"
						to="/categories"
						image="/images/album-cover.png"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Track Name #8"
						by="Artist no.1"
						to="/categories"
						image="/images/album-cover.png"
					/>
				</div>
				<div class="xl:block hidden xl:w-1/3 sm:w-1/2 dark:text-white">
					<MixesInspiredBy
						class="pb-1.5"
						text="Track Name #3"
						by="Artist no.1"
						to="/categories"
						image="/images/album-cover.png"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Track Name #6"
						by="Artist no.1"
						to="/categories"
						image="/images/album-cover.png"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Track Name #9"
						by="Artist no.1"
						to="/categories"
						image="/images/album-cover.png"
					/>
				</div>
			</div>
		</div>

		<!-- 2nd Section -->
		<div class="px-8 mt-8 min-w-[800px] w-full">
			<div class="dark:text-white text-xl font-semibold inline-block">
				Multiple artist selection
			</div>
			<div class="text-sm font-light dark:text-[#a2a2ad]">
				Discover new tracks, grouped by genre with playlist
			</div>

			<div class="py-3"></div>

			<div class="flex justify-start gap-7">
				<MultiArtistSelect
					class="w-1/4"
					category="New"
					text="Featuring song-name-no.1, song-name-no.2, song-name-no.3, song-name-no.4 "
					to="/categories"
					:images="{
						one: 'https://picsum.photos/id/26/300/300',
						two: 'https://picsum.photos/id/27/300/300',
						three: 'https://picsum.photos/id/28/300/300',
						four: 'https://picsum.photos/id/29/300/300',
					}"
				/>
				<MultiArtistSelect
					class="w-1/4"
					category="New"
					text="Featuring song-name-no.1, song-name-no.2, song-name-no.3, song-name-no.4 "
					to="/categories"
					:images="{
						one: 'https://picsum.photos/id/56/300/300',
						two: 'https://picsum.photos/id/57/300/300',
						three: 'https://picsum.photos/id/58/300/300',
						four: 'https://picsum.photos/id/59/300/300',
					}"
				/>
				<MultiArtistSelect
					class="w-1/4"
					category="New"
					text="Featuring song-name-no.1, song-name-no.2, song-name-no.3, song-name-no.4 "
					to="/categories"
					:images="{
						one: 'https://picsum.photos/id/64/300/300',
						two: 'https://picsum.photos/id/65/300/300',
						three: 'https://picsum.photos/id/66/300/300',
						four: 'https://picsum.photos/id/67/300/300',
					}"
				/>
				<MultiArtistSelect
					class="w-1/4"
					category="New"
					text="Featuring song-name-no.1, song-name-no.2, song-name-no.3, song-name-no.4 "
					to="/categories"
					:images="{
						one: 'https://picsum.photos/id/76/300/300',
						two: 'https://picsum.photos/id/77/300/300',
						three: 'https://picsum.photos/id/78/300/300',
						four: 'https://picsum.photos/id/79/300/300',
					}"
				/>
			</div>
		</div>

		<!-- 3rd Section -->
		<div class="mt-8 min-w-[800px]">
			<CarouselSlider
				category="Most-streamed song"
				:data="[
					{
						url: 'https://picsum.photos/id/188/300/300',
						song: 'Track .1',
						by: 'Singer .1',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/192/300/300',
						song: 'Track .2',
						by: 'Singer .2',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/195/300/300',
						song: 'Track .3',
						by: 'Singer .3',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/202/300/300',
						song: 'Track .4',
						by: 'Singer .4',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/209/300/300',
						song: 'Track .5',
						by: 'Singer .5',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/220/300/300',
						song: 'Track .6',
						by: 'Singer .6',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/221/300/300',
						song: 'Track .7',
						by: 'Singer .7',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/223/300/300',
						song: 'Track .8',
						by: 'Singer .8',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/227/300/300',
						song: 'Track .9',
						by: 'Singer .9',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/234/300/300',
						song: 'Track .10',
						by: 'Singer .10',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/238/300/300',
						song: 'Track .11',
						by: 'Singer .11',
						released: '02/03/2022',
					},
					{
						url: 'https://picsum.photos/id/240/300/300',
						song: 'Track .12',
						by: 'Singer .12',
						released: '02/03/2022',
					},
				]"
			/>
		</div>

		<div class="pb-40"></div>

		<!-- 		<audio
		src="../../public/playlist/Still D.R.E. (Dj Dark & Mentol Remix).mp3"
		controls
	></audio> -->
	</div>
</template>

<style></style>
