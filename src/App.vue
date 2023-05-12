<script setup>
	import { RouterLink, RouterView } from 'vue-router';

	import { ref, onMounted } from 'vue';
	import { initFlowbite } from 'flowbite';

	import Magnify from 'vue-material-design-icons/Magnify.vue';

	import BellOutline from 'vue-material-design-icons/BellOutline.vue';
	import Logout from 'vue-material-design-icons/Logout.vue';
	import MenuDown from 'vue-material-design-icons/MenuDown.vue';
	import OpenInNew from 'vue-material-design-icons/OpenInNew.vue';

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

	const is_opened = ref(false);
	const openProfile = () => {
		is_opened.value = !is_opened.value;
	};

	onMounted(() => {
		initFlowbite();
	});
</script>

<script>
	import { RouterLink } from 'vue-router';

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
					.then((response) => response.json())
					.then((data) => {
						this.user.name = data.display_name;
						this.user.url = data.images.length > 0 ? data.images[0].url : null;
					})
					.catch((error) => (this.errors = error));

				return fetch('https://api.spotify.com/v1/me/playlists?limit=4', {
					method: 'get',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.authCode.accessToken,
					},
				})
					.then((response) => response.json())
					.then((data) => {
						console.log(data.items, 'data');
						if (data) {
							if (data.items.length > 0) {
								return data.items;
								console.log(this.playlists, 'playlist');
							}
						}
					});

				fetch('https://api.spotify.com/v1/me/top/artists?limit=15', {
					method: 'get',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + this.authCode.accessToken,
					},
				})
					.then((response) => response.json())
					.then((data) => {
						if (data.items.length > 0) {
							this.artists = data.items;
						}
					});
				console.log(this.playlists);
			},
			logout: function () {
				localStorage.removeItem('authCode');
				this.$router.replace('/login');
			},
		},
	};
</script>

<template>
	<div
		id="App"
		class="box-border m-0 p-0 flex-1 dark:bg-[#121216] dark:text-[#f3f3f3] ease-out duration-200"
	>
		<div
			id="Header"
			class="fixed flex items-center justify-between h-14 w-screen bg-[#f2f2f2] text-[#e3e3e8] border-b border-b-[#e0e0e0] dark:bg-[#191922] dark:text-[#e3e3e8] dark:border-b-[#32323d] z-50"
		>
			<div id="logo" class="mx-6 cursor-pointer">
				<RouterLink to="/">
					<div
						class="bg-logo-light dark:bg-logo-dark bg-contain h-[54px] w-48 bg-center bg-no-repeat ease-out duration-300"
					></div>
				</RouterLink>
			</div>

			<div class="flex items-center justify-center w-full">
				<Magnify
					class="mt-1 pl-8 pr-2 text-[#7E7E88] dark:text-[#7E7E88]"
					:size="22"
				/>
				<input
					class="p-1 bg-transparent font-[300] outline-none border-b border-[#ccc] dark:border-[#32323D] text-[#eee] placeholder-[#4d4d4d] w-full max-w-xl ease-out duration-300"
					placeholder="Search"
					type="text"
				/>
			</div>

			<div>
				<div v-if="user.url !== null" class="flex items-center">
					<div class="flex items-center pr-4">
						<div
							class="mr-2 p-3 hover:bg-[#e6e6e6] dark:hover:bg-[#2f2f39] rounded-full cursor-pointer ease-out duration-200"
						>
							<BellOutline class="text-[#334155] dark:text-white" :size="20" />
						</div>
					</div>

					<button
						id="dropdownDividerButton"
						data-dropdown-toggle="dropdownDivider"
						class="truncate w-full p-3 mr-8 flex text-black dark:text-white hover:text-[#ef5465] rounded-full bg-[#e6e6e6] hover:bg-[#ccc] dark:bg-[#23232d] dark:hover:bg-[#2f2f39] border-none font-medium text-sm px-4 py-2.5 text-center items-center ease-out duration-200"
						type="button"
						@click="openProfile"
					>
						<span class="text-md font-semibold">{{ user.name }}</span>
						<img :src="user.url" class="rounded-full w-8 ml-2" />

						<div class="flex relative pr-6 ease-out duration-200">
							<MenuDown
								class="ease-out duration-200"
								:class="`${
									is_opened
										? 'rotate-180 hover:-translate-y-0.5'
										: 'hover:translate-y-0.5'
								}`"
								:size="20"
							/>
						</div>
					</button>

					<!-- Dropdown menu -->
					<div
						id="dropdownDivider"
						class="z-10 hidden bg-[#f2f2f2] border border-[#e2e2e2] dark:border-[#32323d] divide-y divide-[#e2e2e2] rounded-2xl w-40 dark:bg-[#191922] dark:divide-[#32323d]"
					>
						<ul
							class="text-sm text-[#262626] dark:text-white"
							aria-labelledby="dropdownDividerButton"
						>
							<li
								class="py-1 rounded-t-2xl hover:bg-[#e6e6e6] dark:hover:bg-[#22222a] hover:text-[#ef5465] ease-out duration-200"
							>
								<a
									href="#"
									class="truncate flex items-center px-4 py-2 border-none border-t"
									>Profile
									<OpenInNew class="pl-16" :size="20" />
								</a>
							</li>
							<li
								class="py-1 hover:bg-[#e6e6e6] dark:hover:bg-[#22222a] hover:text-[#ef5465] ease-out duration-200"
							>
								<a href="#" class="block px-4 py-1.5">Inbox</a>
							</li>
						</ul>
						<div
							class="py-1 hover:bg-[#e6e6e6] rounded-b-2xl dark:hover:bg-[#22222a] text-[#262626] dark:text-white hover:text-[#ef5465] ease-out duration-200"
						>
							<a href="#" class="truncate flex items-center px-4 py-2 text-sm">
								<span>Sign out</span>
								<Logout @click="logout" class="pl-[52px]" :size="20" />
							</a>
						</div>
					</div>
				</div>

				<div v-else class="flex items-center">
					<RouterLink to="/login">
						<div class="w-full p-3">
							<button
								type="button"
								class="truncate text-[#191922] dark:text-[#fff] border-2 border-[#ef5465] hover:text-[#da292a] hover:border-[#da292a] font-semibold rounded-full px-8 py-2 text-center text-[15px] ease-out duration-300"
							>
								Log in
							</button>
						</div>
					</RouterLink>

					<div class="w-full mr-8">
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

		<!-- Side Bar -->
		<aside
			class="fixed flex flex-col top-14 overflow-hidden min-h-screen bg-[#F2F2F2] dark:bg-[#191922] border-r border-r-[#e0e0e0] dark:border-r-[#32323D] ease-out duration-300 max-md:z-[99] max-md:fixed"
			:class="`${is_expanded ? 'w-60' : 'w-16'}`"
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
						<ChevronDoubleRight class="hover:text-[#ef5465]" :size="32" />
					</button>
				</div>
			</div>

			<div class="mt-14"></div>

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
				class="mx-0 ease-out duration-300 cursor-pointer hover:bg-[#e6e6e6] hover:text-[#ef5465] dark:hover:bg-[#2b2b3b]"
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
			:class="`${is_expanded ? 'pl-60' : 'pl-16'}`"
		>
			<RouterView />
		</main>
	</div>
</template>

<style></style>
