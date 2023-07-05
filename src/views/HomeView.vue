<script setup>
	import MixesInspiredBy from '../components/MixesInspiredBy.vue';
	import MultiArtistSelect from '../components/MultiArtistSelect.vue';
	import CarouselSlider from '../components/slider/CarouselSlider.vue';
	import Highlights from '../components/Highlights.vue';
</script>

<template>
	<div class="max-md:w-screen lg:max-w-[1500px] min-w-[480px] mx-auto">
		<div class="px-8 mt-8 lg:min-w-[800px] w-full">
			<!-- 1st Section -->
			<div class="inline-block text-xl font-semibold dark:text-white">
				Recommended songs
			</div>

			<div class="text-sm font-light dark:text-[#a2a2ad]">
				Based on the tracks you love
			</div>

			<div class="py-3"></div>

			<div class="flex justify-center w-full gap-8 md:justify-between">
				<div class="w-2/3 md:w-1/2 lg:w-1/3 dark:text-white">
					<MixesInspiredBy
						class="pb-1.5"
						text="Makes Me Feel Better"
						by="OnenO"
						to="/search"
						image="https://i.scdn.co/image/ab67616d0000b273247bf1341aea44ca29427f44"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Tomorrow Comes Today"
						by="Gorillaz"
						to="/search"
						image="https://i.scdn.co/image/ab67616d0000b273f6c46838e4425ea96e2562fe"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Merry-Go-Round of Life"
						by="Joe Hisaishi"
						to="/search"
						image="https://i.scdn.co/image/ab67616d0000b27333ea9fb3fd69bca55a015229"
					/>
				</div>
				<div class="hidden md:block sm:w-1/2 lg:w-1/3 dark:text-white">
					<MixesInspiredBy
						class="pb-1.5"
						text="Duality"
						by="Slipknot"
						to="/search"
						image="https://i.scdn.co/image/ab67616d0000b2736b3463e7160d333ada4b175a"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Left Behind"
						by="Slipknot"
						to="/search"
						image="https://i.scdn.co/image/ab67616d0000b273a62eefef8ee83d5e09aa8331"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Day of Dead (feat. Taelor Yung)"
						by="Konrad OldMoney"
						to="/search"
						image="https://i.scdn.co/image/ab67616d0000b273247bf1341aea44ca29427f44"
					/>
				</div>
				<div class="hidden lg:block lg:w-1/3 dark:text-white">
					<MixesInspiredBy
						class="pb-1.5"
						text="Drip Too Clean"
						by="Cerbeus"
						to="/search"
						image="https://i.scdn.co/image/ab67616d0000b2734ad9fc07ac3f540cfa3527c3"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Psychosocial"
						by="Slipknot"
						to="/search"
						image="https://i.scdn.co/image/ab67616d0000b273457163bec7e8e4decf8c6375"
					/>
					<MixesInspiredBy
						class="pb-1.5"
						text="Tropical Thot"
						by="Frawst, 37 Heartbreak"
						to="/search"
						image="https://i.scdn.co/image/ab67616d0000b2734ad9fc07ac3f540cfa3527c3"
					/>
				</div>
			</div>
		</div>

		<!-- 2nd Section -->
		<div class="px-8 mt-8 w-screen lg:min-w-[800px] lg:w-full">
			<div class="inline-block text-xl font-semibold dark:text-white">
				Most-streamed artists
			</div>
			<div class="text-sm font-light dark:text-[#a2a2ad]">
				Discover new tracks, grouped by genre with playlist
			</div>

			<div class="py-3"></div>

			<div class="grid grid-cols-2 font-primary md:flex md:justify-start gap-7">
				<MultiArtistSelect
					class="w-full lg:w-1/4"
					category="R&B"
					text="Featuring The Weeknd"
					to="/categories"
					:images="{
						one: 'https://i.scdn.co/image/ab67616d0000b27313e54d6687e65678d60466c2',
						two: 'https://i.scdn.co/image/ab67616d0000b2734c8f092adc59b4bf4212389d',
						three:
							'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
						four: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
					}"
				/>
				<MultiArtistSelect
					class="w-full lg:w-1/4"
					category="Hip hop"
					text="Featuring Drake"
					to="/categories"
					:images="{
						one: 'https://i.scdn.co/image/ab67616d0000b273c7ea04a9b455e3f68ef82550',
						two: 'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5',
						three:
							'https://i.scdn.co/image/ab67616d0000b2739416ed64daf84936d89e671c',
						four: 'https://i.scdn.co/image/ab67616d0000b273f6aca6a7d4132d9b2d15e0f0',
					}"
				/>
				<MultiArtistSelect
					class="w-full lg:w-1/4"
					category="Hip hop"
					text="Featuring Eminem"
					to="/categories"
					:images="{
						one: 'https://i.scdn.co/image/ab67616d0000b273c08d5fa5c0f1a834acef5100',
						two: 'https://i.scdn.co/image/ab67616d0000b2732f44aec83b20e40f3baef73c',
						three:
							'https://i.scdn.co/image/ab67616d0000b273dbb3dd82da45b7d7f31b1b42',
						four: 'https://i.scdn.co/image/ab67616d0000b273e4073def0c03a91e3fceaf73',
					}"
				/>
				<MultiArtistSelect
					class="w-full truncate lg:w-1/4"
					category="Alt-rock/ Hip hop"
					text="Featuring Juice WRLD"
					to="/categories"
					:images="{
						one: 'https://i.scdn.co/image/ab67616d0000b273f7db43292a6a99b21b51d5b4',
						two: 'https://i.scdn.co/image/ab67616d0000b2738b27d35aa2c6dcf99895d664',
						three:
							'https://i.scdn.co/image/ab67616d0000b2733e0698e4ae5ffb82a005aeeb',
						four: 'https://i.scdn.co/image/ab67616d0000b2737459992b444de38842b9bee7',
					}"
				/>
			</div>
		</div>

		<!-- 3rd Section -->
		<div class="mt-8 max-md:w-screen lg:min-w-[800px]">
			<CarouselSlider
				category="Most-streamed song"
				:data="[
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273705079df9a25a28b452c1fc9',
						song: 'Last Night',
						by: 'Morgan Wallen',
						released: '03/03/2023',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273dfddf1cb31b85a6d28b7d91f',
						song: 'Ella Baila Sola',
						by: 'Eslabon Armado, Peso Pluma',
						released: '04/28/2023',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647',
						song: 'Cruel Summer',
						by: 'Taylor Swift',
						released: '08/23/2019',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273017d5e26552345c4b1575b6c',
						song: 'fukumean',
						by: 'Gunna',
						released: '06/16/2023',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273ca650d3a95022e0490434ba1',
						song: 'Fast Car',
						by: 'Luke Combs',
						released: '03/24/2023',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2737e8f938c02fac3b564931116',
						song: 'Barbie World (with Aqua) [From Barbie The Album]',
						by: 'Nicki Minaj, Ice Spice, Aqua',
						released: '06/23/2023',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273e6f540885b43d6f379360b22',
						song: 'LADY GAGA',
						by: 'Peso Pluma, Gabito Ballesteros, Junior H',
						released: '06/29/2023',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2730c471c36970b9406233842a5',
						song: 'Kill Bill',
						by: 'SZA',
						released: '12/08/2022',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273716c0b0ad51594ff788b5f06',
						song: 'un x100to',
						by: 'Grupo Frontera, Bad Bunny',
						released: '04/17/2023',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b27337895eee206eabf2682e3064',
						song: 'Oh U Went (feat. Drake)',
						by: 'Young Thug, Drake',
						released: '06/23/2023',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b273e6f540885b43d6f379360b22',
						song: 'LUNA',
						by: 'Peso Pluma, Junior H',
						released: '06/29/2023',
					},
					{
						url: 'https://i.scdn.co/image/ab67616d0000b2738940ac99f49e44f59e6f7fb3',
						song: 'See You Again (feat. Kali Uchis)',
						by: 'Tyler, The Creator, Kali Uchis',
						released: '07/21/2017',
					},
				]"
			/>
		</div>

		<div class="w-full">
			<div class="px-8 mt-8 w-full min-w-[480px]">
				<div class="py-3"></div>
			</div>
		</div>

		<div class="px-8 mt-8">
			<div class="inline-block text-xl font-semibold dark:text-white">
				Hightlights
			</div>

			<div class="py-3"></div>

			<div class="flex items-center justify-center w-full gap-8 mx-auto">
				<div class="w-1/2 py-4 rounded-lg">
					<Highlights
						by="Some Artist 1"
						song="Random Song 1"
						image="https://picsum.photos/id/274/800/300"
					/>
				</div>
				<div class="w-1/2 py-4 rounded-lg">
					<Highlights
						by="Some Artist 2"
						song="Random Song 2"
						image="https://picsum.photos/id/299/800/300"
					/>
				</div>
			</div>
		</div>

		<!-- <TopSlider></TopSlider> -->

		<div class="pb-40"></div>
	</div>
</template>

<style></style>
