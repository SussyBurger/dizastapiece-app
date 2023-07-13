<template>
	<div
		id="App"
		class="box-border m-0 p-0 flex-1 dark:bg-[#121216] dark:text-[#f3f3f3] ease-out duration-200"
	>
		<div
			id="Header"
			class="fixed flex items-center justify-evenly lg:flex-initial h-14 w-full lg:w-screen bg-[#f2f2f2] text-[#303030] border-b border-b-[#e0e0e0] dark:bg-[#191922] dark:text-[#e3e3e8] dark:border-b-[#32323d] z-50"
		>
			<div class="flex flex-row w-2/3 lg:w-full">
				<div
					id="logo"
					class="hidden mx-6 cursor-pointer lg:block"
				>
					<RouterLink to="/">
						<div
							class="bg-logo-light dark:bg-logo-dark bg-contain h-[54px] w-48 bg-center bg-no-repeat ease-out duration-300"
						></div>
					</RouterLink>
				</div>

				<div class="flex items-center flex-initial w-full">
					<Menu
						class="block lg:hidden mt-1 pl-8 lg:pr-2 text-[#7E7E88] dark:text-[#7E7E88] cursor-pointer"
						:size="28"
						@click="toggleMenu"
					/>
					<!-- 					<Magnify
						class="mt-1 pl-10 lg:pr-2 text-[#7E7E88] dark:text-[#7E7E88]"
						:size="22"
					/>
					<input
						class="w-full p-1 bg-transparent font-[300] outline-none border-b border-[#ccc] dark:border-[#32323D] placeholder-[#4d4d4d] max-w-[calc(100%-80px)] ease-out duration-300"
						placeholder="Search"
						type="text"
					/> -->
				</div>
			</div>

			<div
				id="user"
				class="flex justify-end w-1/3 lg:w-1/3"
			>
				<div
					v-if="user.url !== null"
					class="flex items-center"
				>
					<div class="flex items-center pr-4">
						<div
							class="hidden lg:block mr-2 p-3 hover:bg-[#e6e6e6] dark:hover:bg-[#2f2f39] rounded-full cursor-pointer ease-out duration-200"
						>
							<BellOutline
								class="text-[#334155] dark:text-[#f3f3f3]"
								:size="20"
							/>
						</div>
					</div>

					<div class="items-center justify-center select-none z-100">
						<!-- Profile Button -->
						<button
							class="truncate lg:w-48 flex text-[#444] dark:text-[#f3f3f3] justify-center items-center text-center text-sm p-3 mr-8 gap-2 font-medium hover:text-[#ef5465] dark:hover:text-[#ef5465] rounded-full bg-[#e6e6e6] dark:bg-[#23232d] border-none ease-out duration-200"
							@click="showProfile"
						>
							<span class="hidden flex-1 lg:block text-md px-1.5 font-semibold">
								{{ user.name }}
							</span>
							<img
								:src="user.url"
								class="flex-none w-8 rounded-full"
							/>
							<div
								class="flex relative border-l-[2px] border-[#b3b3b3] dark:border-[#32323d] ml-1.5"
							>
								<MenuDown
									class="ease-out duration-200 ml-1.5"
									:class="`${is_opened ? '-rotate-180 ' : ''}`"
									:size="20"
								/>
							</div>
						</button>

						<!-- Dropdown menu -->
						<div
							v-if="is_opened"
							class="absolute max-w-[176px] bg-[#f2f2f2] dark:bg-[#191922] border border-[#e2e2e2] dark:border-[#32323d] mt-2 -ml-10 lg:ml-3 rounded-2xl z-10 ease-out duration-200"
						>
							<ul class="w-40 text-sm">
								<li
									class="rounded-t-2xl hover:bg-[#e6e6e6] dark:hover:bg-[#22222a] hover:text-[#ef5465] px-4 py-2.5 ease-out duration-200"
								>
									<a>
										<RouterLink
											to="/profile"
											class="flex items-center truncate"
										>
											<span class="flex-1">My Profile</span>
											<OpenInNew
												class="flex-none"
												:size="20"
											/>
										</RouterLink>
									</a>
								</li>
								<li
									class="px-4 py-2.5 cursor-pointer hover:bg-[#e6e6e6] dark:hover:bg-[#22222a] hover:text-[#ef5465] ease-out duration-200"
								>
									<a>
										<RouterLink
											to="/userplaylist"
											class="flex items-center w-full truncate"
											@click="hideProfile"
										>
											<span class="flex-1">My Playlist</span>
											<span class="flex-none"></span>
										</RouterLink>
									</a>
								</li>
								<li
									class="px-4 py-2.5 cursor-pointer rounded-b-2xl border-t border-[#e2e2e2] dark:border-[#32323d] hover:bg-[#e6e6e6] dark:hover:bg-[#22222a] hover:text-[#ef5465] ease-out duration-200"
								>
									<a
										class="flex items-center truncate"
										@click="logout"
									>
										<span class="flex-1">Sign out</span>
										<Logout
											class="flex-none"
											:size="20"
										/>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div
					v-else
					class="flex items-center lg:mx-auto"
				>
					<div class="w-full pr-10 lg:p-3">
						<RouterLink to="/login">
							<button
								type="button"
								class="truncate text-[#191922] dark:text-[#fff] border-2 border-[#ef5465] hover:text-[#da292a] dark:hover:text-[#da292a] hover:border-[#da292a] font-semibold rounded-full py-2 text-center text-[15px] ease-out duration-300"
							>
								<span class="hidden px-8 lg:block">Log in</span>
								<Login
									:size="20"
									class="hidden px-2 max-lg:block"
								/>
							</button>
						</RouterLink>
					</div>

					<div class="hidden w-full lg:block">
						<button
							type="button"
							class="truncate text-[#fff] bg-[#ef5465] hover:bg-[#da292a] font-semibold rounded-full px-8 py-2 text-center text-[15px] ease-out duration-300"
						>
							Sign up
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Side Nav -->
		<aside
			class="fixed hidden font-[600] lg:flex flex-col top-14 overflow-hidden min-h-screen bg-[#F2F2F2] dark:bg-[#191922] border-r border-[#e0e0e0] dark:border-[#32323D] ease-out duration-300 z-50"
			:class="`${is_expanded ? 'w-60 ' : 'w-16'}`"
		>
			<div
				class="truncate ease-out duration-300 flex items-center justify-end bg-[#d9d9d9] dark:bg-[#141418]"
			>
				<span
					class="font-semibold text-[20px] px-16 my-4 lowercase opacity-30"
					:class="`${is_expanded ? 'inline' : '-left-full'}`"
				>
					sub-menu
				</span>
				<div
					class="relative flex px-4 my-4 duration-300 ease-out"
					@click="toggleMenu"
				>
					<button
						class="duration-300 ease-out"
						:class="`${
							is_expanded
								? '-rotate-180 hover:-translate-x-2'
								: 'hover:translate-x-2'
						}`"
					>
						<ChevronDoubleRight
							class="hover:text-[#ef5465]"
							:size="32"
						/>
					</button>
				</div>
			</div>

			<!-- <div class="mt-14"></div> -->

			<div
				class="ease-out duration-300 w-full hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink
					to="/"
					class="flex items-center py-3 mx-4"
				>
					<Home :size="28" />
					<span
						class="truncate text-[18px]"
						:class="`${
							is_expanded
								? ' pl-4 opacity-1 ease-out duration-300'
								: ' opacity-0 ease-out duration-300'
						}`"
					>
						Main Page
					</span>
				</RouterLink>
			</div>

			<div
				class="mx-0 w-full ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink
					to="/search"
					class="flex items-center py-3 mx-4"
				>
					<Magnify :size="28" />
					<span
						class="text-[18px]"
						:class="`${
							is_expanded
								? 'pl-4 opacity-1 ease-out duration-300'
								: 'opacity-0 ease-out duration-300'
						}`"
					>
						Search
					</span>
				</RouterLink>
			</div>

			<div
				class="mx-0 w-full ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink
					to="/toptracks"
					class="flex items-center py-3 mx-4 truncate"
				>
					<Music :size="28" />
					<span
						class="text-[18px]"
						:class="`${
							is_expanded
								? 'pl-4 opacity-1 ease-out duration-300'
								: 'opacity-0 ease-out duration-300'
						}`"
					>
						Trending
					</span>
				</RouterLink>
			</div>

			<div
				class="mx-0 w-full ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink
					to="/categories"
					class="flex items-center py-3 mx-4 truncate"
				>
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

			<div class="mt-14"></div>

			<div
				class="mx-0 ease-out duration-300 cursor-pointer hover:bg-[#e6e6e6] hover:text-[#ef5465] dark:hover:bg-[#2b2b3b]"
				@click="toggleDark()"
			>
				<div class="flex items-center py-3 mx-4 bottom-24">
					<ThemeLightDark :size="28" />

					<span
						class="truncate text-[16px] ease-out duration-300"
						:class="`${is_expanded ? 'pl-4 opacity-1' : 'opacity-0'}`"
					>
						{{ isDark ? 'Dark Mode' : 'Light Mode' }}
					</span>
				</div>
			</div>
		</aside>

		<div
			class="fixed lg:hidden w-full h-screen duration-200 ease-in-out bg-black bg-opacity-70 dark:bg-[#0c0d0d] dark:bg-opacity-60"
			:class="`${is_expanded ? 'z-50 ' : ' hidden'}`"
			@click="toggleMenu"
		></div>

		<aside
			id="sideNavOverlay"
			class="fixed flex font-[600] flex-col lg:hidden min-h-screen bg-[#F2F2F2] dark:bg-[#191922] border-r border-[#e0e0e0] dark:border-[#32323D] ease-out duration-200 z-50"
			:class="`${is_expanded ? 'w-60 ' : '-ml-64'}`"
		>
			<div
				class="truncate ease-out duration-300 flex items-center justify-end bg-[#d9d9d9] dark:bg-[#141418]"
			>
				<span
					class="flex items-center font-semibold text-[20px] mx-4 my-3.5 w-full lowercase"
				>
					<Menu
						:size="28"
						class="opacity-50 cursor-pointer"
						@click="toggleMenu"
					/>
					<RouterLink to="/">
						<div
							class="bg-logo-light dark:bg-logo-dark bg-contain h-[27px] ml-4 w-[154px] bg-center bg-no-repeat ease-out duration-300"
						></div>
						<!-- 	<div
							class="bg-logo-icon block lg:hidden h-[54px] w-[54px] bg-contain bg-center bg-no-repeat z-50"
						></div> -->
					</RouterLink>
				</span>
			</div>

			<!-- <div class="mt-7"></div> -->

			<div
				class="ease-out duration-300 w-full hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink
					to="/"
					class="flex items-center py-3 mx-4"
				>
					<Home :size="28" />
					<span
						class="truncate text-[18px] pl-4 opacity-1 ease-out duration-300"
					>
						Main Page
					</span>
				</RouterLink>
			</div>

			<div
				class="mx-0 w-full ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink
					to="/search"
					class="flex items-center py-3 mx-4 truncate"
				>
					<Magnify :size="28" />
					<span class="text-[18px] pl-4 opacity-1 ease-out duration-300">
						Search
					</span>
				</RouterLink>
			</div>

			<div
				class="mx-0 w-full ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink
					to="/toptracks"
					class="flex items-center py-3 mx-4"
				>
					<Music :size="28" />
					<span class="text-[18px] pl-4 opacity-1 ease-out duration-300">
						Trending
					</span>
				</RouterLink>
			</div>

			<div
				class="mx-0 w-full ease-out duration-300 hover:text-[#ef5465] hover:bg-[#e6e6e6] dark:hover:bg-[#2b2b3b]"
			>
				<RouterLink
					to="/categories"
					class="flex items-center py-3 mx-4"
				>
					<ViewGridOutline :size="28" />
					<span class="text-[18px] pl-4 opacity-1 ease-out duration-300">
						Categories
					</span>
				</RouterLink>
			</div>

			<div class="mt-14"></div>

			<div
				class="mx-0 ease-out duration-300 cursor-pointer hover:bg-[#e6e6e6] hover:text-[#ef5465] dark:hover:bg-[#2b2b3b]"
				@click="toggleDark()"
			>
				<div class="flex items-center py-3 mx-4 bottom-24">
					<ThemeLightDark :size="28" />

					<span
						class="truncate text-[16px] ease-out duration-300 pl-4 opacity-1"
					>
						{{ isDark ? 'Dark Mode' : 'Light Mode' }}
					</span>
				</div>
			</div>
		</aside>

		<main
			class="py-[54px] ease-out duration-300 w-full min-w-[480px]"
			:class="`${is_expanded ? 'lg:pl-60' : 'lg:pl-16'}`"
		>
			<RouterView @click="hideProfile" />
		</main>
	</div>

	<MusicPlayer v-if="currentTrack" />

	<!-- 	<div
		class="w-full h-full"
		@click="hideProfile"
	></div> -->
</template>

<script setup>
	import { ref, onBeforeMount } from 'vue';
	import { RouterLink, RouterView } from 'vue-router';

	import MusicPlayer from './components/MusicPlayer.vue';

	import Magnify from 'vue-material-design-icons/Magnify.vue';
	import BellOutline from 'vue-material-design-icons/BellOutline.vue';
	import Menu from 'vue-material-design-icons/Menu.vue';
	import Login from 'vue-material-design-icons/Login.vue';
	import Logout from 'vue-material-design-icons/Logout.vue';
	import MenuDown from 'vue-material-design-icons/MenuDown.vue';
	import OpenInNew from 'vue-material-design-icons/OpenInNew.vue';

	import ChevronDoubleRight from 'vue-material-design-icons/ChevronDoubleRight.vue';
	import Home from 'vue-material-design-icons/Home.vue';
	import Music from 'vue-material-design-icons/Music.vue';
	import ViewGridOutline from 'vue-material-design-icons/ViewGridOutline.vue';
	import AccountMusic from 'vue-material-design-icons/AccountMusic.vue';
	import PlaylistMusic from 'vue-material-design-icons/PlaylistMusic.vue';
	import ThemeLightDark from 'vue-material-design-icons/ThemeLightDark.vue';

	import { useSongStore } from './stores/song';
	import { storeToRefs } from 'pinia';

	import { useDark, useToggle } from '@vueuse/core';
	const isDark = useDark();
	const toggleDark = useToggle(isDark);

	const is_expanded = ref(false);
	const toggleMenu = () => {
		is_expanded.value = !is_expanded.value;
	};

	const is_opened = ref(false);
	const showProfile = () => {
		is_opened.value = !is_opened.value;
	};
	const hideProfile = () => {
		is_opened.value = false;
	};

	const useSong = useSongStore();
	const { isPlaying, currentTrack, trackTime, hasLyrics } =
		storeToRefs(useSong);

	onBeforeMount(() => {
		isPlaying.value = false;
		hasLyrics.value = false;
		trackTime.value = '0:00';
	});

	let sideNavOverlay = ref(null);
</script>

<script>
	export default {
		async mounted() {
			if (
				!localStorage.getItem('authCode') ||
				localStorage.getItem('authCode').accessToken === null
			) {
				console.log('logout');
				this.localToData();
				this.logout();
			} else {
				console.log('login');
				this.localToData();
				this.playlists = await this.spotCallAPI();
				this.playlists = JSON.parse(JSON.stringify(this.playlists));
				this.newPlayList = JSON.parse(JSON.stringify(this.playlists));
				this.toggle = true;
			}
		},
		components: {
			RouterLink,
		},
		data() {
			return {
				authCode: {
					accessToken: null,
					tokenType: null,
					expiredIn: null,
					state: null,
				},
				toggle: false,
				user: {
					name: null,
					url: null,
				},
				artists: [],
				playlists: [],
				newPlayList: [],
				errors: null,
			};
		},
		watch: {
			errors: function () {
				this.logout();
			},
		},
		methods: {
			localToData: function () {
				const authCode = JSON.parse(localStorage.getItem('authCode'));
				this.authCode.accessToken =
					authCode && authCode.accessToken ? authCode.accessToken : '';
				console.log(authCode, 'authCode');
				this.authCode.tokenType = authCode.tokenType;
				this.authCode.expiredIn = authCode.expiredIn;
				this.authCode.state = authCode.state;
			},
			spotCallAPI: function () {
				function handleErrors(response) {
					if (!response.ok) throw new Error(response.status);
					return response;
				}
				fetch('https://api.spotify.com/v1/me', {
					method: 'get',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.authCode.accessToken,
					},
				})
					.then(handleErrors)
					.then((res) => res.json())
					.then((data) => {
						this.user.name = data.display_name;
						this.user.url = data.images.length > 0 ? data.images[0].url : null;
					})
					.catch((error) => (this.errors = error));
			},
			logout: function () {
				localStorage.removeItem('authCode');
				this.$router.replace('/login');
			},
		},
	};
</script>
