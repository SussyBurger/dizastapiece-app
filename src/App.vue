<script setup>
	import { RouterLink, RouterView } from 'vue-router';

	import { ref } from 'vue';

	import Magnify from 'vue-material-design-icons/Magnify.vue';
	import Bell from 'vue-material-design-icons/Bell.vue';

	import ChevronDoubleRight from 'vue-material-design-icons/ChevronDoubleRight.vue';
	import Music from 'vue-material-design-icons/Music.vue';
	import ViewGridOutline from 'vue-material-design-icons/ViewGridOutline.vue';
	import AccountMusic from 'vue-material-design-icons/AccountMusic.vue';
	import PlaylistMusic from 'vue-material-design-icons/PlaylistMusic.vue';
	import ThemeLightDark from 'vue-material-design-icons/ThemeLightDark.vue';

	import { useDark, useToggle } from '@vueuse/core';
	const isDark = useDark();
	const toggleDark = useToggle(isDark);

	const is_expanded = ref(false);
	const toggleMenu = () => {
		is_expanded.value = !is_expanded.value;
	};
</script>

<template>
	<div
		id="app"
		class="box-border m-0 p-0 flex-1 dark:bg-[#121216] dark:text-[#f3f3f3] ease-out duration-200"
	>
		<div
			id="Header"
			class="fixed flex items-center justify-between h-14 w-screen text-[#e3e3e8] bg-[#252525] border-b border-b-[#454545] z-50 ease-out duration-200"
		>
			<div id="logo" class="mx-6 cursor-pointer">
				<RouterLink to="/">
					<div
						class="bg-logo-light dark:bg-logo-dark bg-contain h-[54px] w-[192px] bg-center bg-no-repeat"
					></div>
				</RouterLink>
			</div>

			<div class="flex items-center justify-center w-full">
				<Magnify class="mt-1 pl-8 pr-2 text-[#eee]" :size="22" />
				<input
					class="p-1 bg-transparent font-[300] outline-none border-b border-[#32323D] text-[#eee] placeholder-[#4d4d4d] w-full max-w-xl"
					placeholder="Search"
					type="text"
				/>
			</div>

			<div class="flex items-center">
				<div class="w-full p-3">
					<button
						type="button"
						class="truncate text-[#fff] border-2 border-[#ef5465] hover:text-[#da292a] hover:border-[#da292a] font-semibold rounded-full px-8 py-2 text-center text-[15px] ease-out duration-200"
					>
						Log in
					</button>
				</div>

				<div class="w-full mr-8">
					<button
						type="button"
						class="truncate text-[#fff] bg-[#ef5465] hover:bg-[#da292a] font-semibold rounded-full px-8 py-2 text-center text-[15px] ease-out duration-200"
					>
						Sign up
					</button>
				</div>
			</div>

			<!-- 			<div class="flex items-center pr-10">
				<div
					class="mr-4 p-1 hover:bg-[#e2e8f0] dark:hover:bg-gray-600 rounded-full cursor-pointer"
				>
					<Bell class="text-[#334155] dark:text-white" :size="20" />
				</div>
				<img class="rounded-full w-[33px]" src="/images/avatar.jpg" />
			</div> -->
		</div>

		<!-- Side Bar -->
		<aside
			class="fixed flex flex-col top-14 overflow-hidden min-h-screen bg-[#F2F2F2] dark:bg-[#191922] border-r border-r-[#E9E9E9] dark:border-r-[#32323D] ease-out duration-300 max-md:z-[99] max-md:fixed"
			:class="`${is_expanded ? 'w-60' : 'w-16'}`"
		>
			<div
				class="truncate ease-out duration-300 flex items-center justify-end bg-[#a6aaaa] dark:bg-[#141418]"
			>
				<span
					class="font-semibold text-[20px] px-16 my-4 lowercase opacity-30"
					:class="`${is_expanded ? 'inline' : '-left-full'}`"
				>
					sub-menu
				</span>
				<div
					class="flex px-4 my-4 relative ease-out duration-300"
					@click="toggleMenu"
				>
					<button
						class="ease-out duration-300"
						:class="`${
							is_expanded
								? '-rotate-180 hover:-translate-x-2'
								: 'hover:translate-x-2'
						}`"
					>
						<ChevronDoubleRight class="hover:text-[#da292a]" :size="32" />
					</button>
				</div>
			</div>

			<div class="mt-[52px]"></div>

			<div
				class="ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink to="/" class="flex items-center mx-4 py-3">
					<Music :size="28" />
					<span
						class="truncate text-[18px]"
						:class="`${
							is_expanded
								? 'pl-4 opacity-1 ease-out duration-300'
								: 'opacity-0 ease-out duration-300'
						}`"
					>
						Main Page
					</span>
				</RouterLink>
			</div>

			<div
				class="mx-0 ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink to="/artist" class="flex items-center mx-4 py-3">
					<AccountMusic :size="28" />
					<span
						class="text-[18px]"
						:class="`${
							is_expanded
								? 'pl-4 opacity-1 ease-out duration-300'
								: 'opacity-0 ease-out duration-300'
						}`"
					>
						Artists
					</span>
				</RouterLink>
			</div>

			<div
				class="mx-0 ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink to="/playlist" class="flex items-center mx-4 py-3">
					<PlaylistMusic :size="28" />
					<span
						class="text-[18px]"
						:class="`${
							is_expanded
								? 'pl-4 opacity-1 ease-out duration-300'
								: 'opacity-0 ease-out duration-300'
						}`"
					>
						Playlist
					</span>
				</RouterLink>
			</div>

			<div
				class="mx-0 ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink to="/categories" class="flex items-center mx-4 py-3">
					<ViewGridOutline :size="28" />
					<span
						class="text-[18px]"
						:class="`${
							is_expanded
								? 'pl-4 opacity-1 ease-out duration-300'
								: 'opacity-0 ease-out duration-300'
						}`"
					>
						Categories
					</span>
				</RouterLink>
			</div>

			<div class="mt-48"></div>

			<div
				class="mx-0 ease-out duration-300 cursor-pointer hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
				@click="toggleDark()"
			>
				<div class="flex items-center bottom-24 mx-4 py-3">
					<ThemeLightDark :size="28" />

					<span
						class="truncate text-[16px] ease-out duration-300"
						:class="`${is_expanded ? 'pl-4 opacity-1' : ' opacity-0'}`"
					>
						{{ isDark ? 'Dark Mode' : 'Light Mode' }}
					</span>
				</div>
			</div>
		</aside>

		<main
			class="py-16 ease-out duration-300"
			:class="`${is_expanded ? 'pl-60 ' : 'pl-16'}`"
		>
			<RouterView />
		</main>
	</div>
</template>

<style></style>
