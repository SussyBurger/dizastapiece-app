<script setup>
	import Facebook from 'vue-material-design-icons/Facebook.vue';
</script>

<script>
	import { TOKEN_USER } from '../../main.js';
	export default {
		async mounted() {
			this.getUserProfile();
		},

		data() {
			return {
				userProfile: null,
				userDetail: null,
			};
		},
		methods: {
			async getUserProfile() {
				const res = await fetch('https://api.spotify.com/v1/me', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + TOKEN_USER,
					},
				});
				const finalRes = await res.json();
				this.userProfile = finalRes;
				console.log(this.userProfile, 'Sample Text');
			},
		},
	};
</script>

<template>
	<div class="max-w-[875px] mx-8 lg:mx-40 lg:max-w-6xl">
		<div class="flex items-center mx-auto">
			<img
				:src="`${this.userProfile ? this.userProfile.images[0].url : ''}`"
				class="flex-none rounded-full"
				width="150"
			/>
			<div class="flex-auto ml-8">
				<span class="text-2xl font-bold font-primary">
					{{ this.userProfile ? this.userProfile.display_name : '' }}
				</span>
				<p class="pt-1">You're enjoying Dizastapiece Free.</p>
			</div>

			<div class="justify-end flex-1">
				<button
					type="button"
					class="truncate bg-[#d1d1d6] dark:bg-[#52525d] hover:bg-[#808080] dark:hover:bg-[#808080] text-[#151515] hover:text-[#1a1a1a] dark:text-[#f3f3f3] dark:hover:text-[#dadadd] font-semibold rounded-full py-2 text-center text-[15px] ease-out duration-300"
				>
					<span class="px-8">Manage my subscription</span>
				</button>
			</div>
		</div>

		<div class="py-4"></div>

		<div
			class="ease-out duration-200 border-b border-b-[#e9e9e9] dark:border-b-[#302d2d]"
		></div>

		<section
			class="pt-8 px-20 items-center justify-center text-[#444] dark:text-[#f3f3f3]"
		>
			<div class="py-4">
				<div class="py-2 text-lg font-medium font-primary">User ID</div>
				<div
					class="py-1.5 pl-4 border-2 border-[#e0e0e0] bg-[#f2f2f2] dark:border-[#32323d] dark:bg-[#191922]"
				>
					{{ this.userProfile ? this.userProfile.id : '' }}
				</div>
			</div>

			<div class="py-4">
				<div class="py-2 text-lg font-medium font-primary">Email</div>
				<div
					class="py-1.5 pl-4 border-2 border-[#e0e0e0] bg-[#f2f2f2] dark:border-[#32323d] dark:bg-[#191922]"
				>
					{{ this.userProfile ? this.userProfile.email : '' }}
				</div>
			</div>

			<div class="py-4">
				<div class="py-2 text-lg font-medium font-primary">Country</div>
				<div
					class="py-1.5 pl-4 border-2 border-[#e0e0e0] bg-[#f2f2f2] dark:border-[#32323d] dark:bg-[#191922]"
				>
					{{ this.userProfile ? this.userProfile.country : '' }}
				</div>
			</div>

			<div class="py-2"></div>

			<div class="items-center justify-between md:flex">
				<div class="md:flex-none">
					<button
						class="flex items-center gap-1 rounded-full px-4 py-2 bg-[#4267b2] text-white uppercase"
					>
						<Facebook :size="20" />
						<span class="text-sm font-semibold uppercase truncate">
							Connected with Facebook
						</span>
					</button>
				</div>

				<div class="md:flex-initial">
					<button
						class="flex items-center gap-1 rounded-full px-4 py-2 bg-[#d1d1d6] dark:bg-[#303036] text-[#1a1a1a] dark:text-[#f3f3f3]"
					>
						<img src="/images/google.png" class="w-5" />
						<span class="text-sm font-semibold uppercase truncate">
							Connected with Google
						</span>
					</button>
				</div>
			</div>
		</section>
	</div>
</template>

<style></style>
