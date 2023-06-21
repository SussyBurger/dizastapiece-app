<script lang="js">
	export default {
	  mounted() {
	    const tokenValid = localStorage.getItem('tokenCode')
	    if(tokenValid!=='null'){this.$router.replace('/')}
	  },
	  data() {
	    return {
	      authUrl: null,
	    }
	  },
	  mounted (){
	    const clientId = '6c596d9413a74cc2b2d96308d41c3c8b';
	    const redirect_uri = encodeURI('http://127.0.0.1:5173/callback');
	    const state = this.generateString(16);
	    const scope = 'user-read-email playlist-read-private playlist-modify-public user-read-private user-top-read';
		const endcodeScope = encodeURIComponent(scope)
	    let authUrl = 'https://accounts.spotify.com/authorize?response_type=token&redirect_uri='+redirect_uri+'&client_id='+clientId+'&state='+state+'&scope=playlist-modify-public'
	    console.log(authUrl, 'auth')
		this.authUrl = authUrl.replace(' ', '')
	  },
	  methods: {
	    generateString: function(length) {
	      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	      let result = ' ';
	      const charactersLength = characters.length;
	      for ( let i = 0; i < length; i++ ) {
	        result += characters.charAt(Math.floor(Math.random() * charactersLength));
	      }
	      console.log(result, 'result');
	      return result;
	    },
	    testBtn: function() {
	      window.location.href=this.authUrl
	    }
	  },
	}
</script>

<template>
	<main class="container min-h-screen mx-auto">
		<div
			class="absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-1/2"
		>
			<div
				class="auth mx-auto flex max-w-sm overflow-hidden bg-[#f2f2f2] rounded-lg shadow-lg lg:max-w-4xl dark:bg-[#191922] dark:text-[#f3f3f3] border border-[#e0e0e0] dark:border-[#32323d]"
			>
				<div
					class="hidden bg-cover lg:block lg:w-1/2 lg:p-1/2"
					style="background-image: url('images/album-cover.jpg')"
				></div>
				<div
					class="flex flex-col justify-between w-full px-6 py-8 md:px-8 lg:w-1/2"
				>
					<div>
						<h2
							class="text-2xl font-semibold text-center text-[#191922] dark:text-[#e6ffff] up font-primary"
						>
							dizastapiece
						</h2>
						<p class="text-xl text-center text-gray-600 font-primary">
							Start listening with a free account
						</p>
					</div>
					<div class="flex flex-col">
						<button
							class="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-200 ease-out transform border border-[#e0e0e0] dark:border-[#32323d] rounded-lg hover:bg-[#e6e6e6] dark:hover:bg-[#20202c]"
							@click="testBtn"
						>
							<div class="px-4 py-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									fill="#1DB954"
									class="bi bi-spotify"
									viewBox="0 0 16 16"
								>
									<path
										d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"
									/>
								</svg>
							</div>
							<span
								class="w-5/6 px-3.5 py-3 font-bold text-center hover:text-[#ef5465] duration-200 ease-out"
							>
								Sign in with Spotify
							</span>
						</button>
						<p class="mt-3 text-xs text-center text-gray-600">
							We do not save your account credential
						</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style></style>
