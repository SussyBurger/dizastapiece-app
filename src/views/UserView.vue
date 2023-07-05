<template>
	<div>
		<header class="flex justify-between pt-6 h-14 min-w-[650px]">
			<ul
				id="navbar"
				class="flex items-center justify-start w-full text-gray-400 h-9"
			>
				<li class="pl-20">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-in-out duration-200 text-[#0d0d0d] hover:font-normal border-b-transparent hover:border-b-[#121216] dark:text-[#f2f2f2] dark:hover:text-[#f3f3f3] dark:hover:border-b-[#f3f3f3]"
					>
						<RouterLink to="/profile">Account</RouterLink>
					</button>
				</li>
				<li class="text-[#121216] dark:text-[#f3f3f3] pl-10">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-in-out duration-200 text-[#0d0d0d] hover:font-normal border-b-transparent hover:border-b-[#121216] dark:text-[#f2f2f2] dark:hover:text-[#f3f3f3] dark:hover:border-b-[#f3f3f3]"
					>
						<RouterLink to="/settings"> Notification preferences </RouterLink>
					</button>
				</li>
				<li class="pl-10">
					<button
						class="font-light cursor-pointer border-b-2 pb-2 ease-in-out duration-200 text-[#0d0d0d] hover:font-normal border-b-transparent hover:border-b-[#121216] dark:text-[#f2f2f2] dark:hover:text-[#f3f3f3] dark:hover:border-b-[#f3f3f3]"
					>
						<RouterLink to="/devices"> My connected devices </RouterLink>
					</button>
				</li>
			</ul>
		</header>

		<div class="pt-[3px]"></div>

		<div
			class="border-b border-b-[#e9e9e9] dark:border-b-[#302d2d] ease-out duration-200"
		></div>

		<main class="py-16 ease-out duration-300 w-full min-w-[480px]">
			<RouterView />
		</main>
	</div>
</template>

<script></script>
