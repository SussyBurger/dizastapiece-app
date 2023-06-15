<script lang="js">
	export default {
	  async mounted() {
	    if (
				!localStorage.getItem('authCode') ||
				localStorage.getItem('authCode').accessToken === null
			) {
				this.logout();
			} else {
				this.localToData();
				this.playlists = await this.spotCallAPI();
				this.playlists = JSON.parse(JSON.stringify(this.playlists));
				this.newPlayList = JSON.parse(JSON.stringify(this.playlists));
				this.toggle = true;
			}
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
			track:[],
			errors: null,
	    }
	  },
	  watch: {
	    'errors': function () {
	      this.logout()
	    }
	  },
	  methods: {
	    localToData: function(){
	      const authCode = JSON.parse(localStorage.getItem('authCode'))
	      this.authCode.accessToken = authCode.accessToken
	      this.authCode.tokenType = authCode.tokenType
	      this.authCode.expiredIn = authCode.expiredIn
	      this.authCode.state = authCode.state
	    },
	    spotCallAPI: function(){
	      function handleErrors(response) {
	        if (!response.ok) throw new Error(response.status);
	        return response;
	      }
	        fetch('https://api.spotify.com/v1/me', {
	          method: 'get',
	          headers: {
	            'Content-Type': 'application/json',
	            'Authorization': 'Bearer '+this.authCode.accessToken,
	          },
	        })
	          .then(handleErrors)
	          .then((response) => response.json())
	          .then((data) => {
	            this.user.name = data.display_name
	            this.user.url = data.images.length > 0 ? data.images[0].url : null
	          })
	          .catch(error => this.errors=error)

	      return fetch('https://api.spotify.com/v1/me/playlists?limit=4', {
	        method: 'get',
	        headers: {
	          'Content-Type': 'application/json',
	          'Authorization': 'Bearer '+this.authCode.accessToken,
	        },
	      })
	        .then((response) => response.json())
	        .then((data) => {
	          console.log(data.items, 'playlist');
	          if(data){
	            if(data.items.length > 0) {
	              return data.items;
	            }
	          }
	        })

			fetch(' https://api.spotify.com/v1/playlists/{{playlist_id}}/tracks?limit=20', {
	        method: 'get',
	        headers: {
	          'Content-Type': 'application/json',
	          'Authorization': 'Bearer '+this.authCode.accessToken,
	        },
	      })
	        .then((response) => response.json())
	        .then((data) => {
	          console.log(data.items, 'tracks');
	          if(data){
	            if(data.items.length>0) {
	              return playlist.items;
	              console.log(this.tracks, 'tracks')
	            }
	          }
	        })


	      fetch('https://api.spotify.com/v1/me/following', {
	        method: 'get',
	        headers: {
	          'Content-Type': 'application/json',
	          'Authorization': 'Bearer '+this.authCode.accessToken,
	        },
	      })
	        .then((response) => response.json())
	        .then((data) => {
	          if(data.items.length>0){
	            this.artist = data.items
	          }
	        })
	       console.log(this.artists)
	    },
	    logout: function(){
	      localStorage.removeItem('authCode')
	      this.$router.replace('/login')
	    }
	  },
	}
</script>

<template>
	<main class="min-h-screen">
		<div
			v-if="toggle === true"
			class="container absolute w-full px-2 mx-auto top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 md:w-1/2 lg:w-1/3"
		>
			<div>
				<h2
					class="font-primary text-xl text-[#121216] dark:text-[#f9f9f9] pb-3"
				>
					{{ user.name }}'s Favorite Artists
				</h2>
			</div>

			<div
				v-if="artists.length > 0"
				class="flex justify-evenly"
			>
				<div
					v-for="playlist in newPlayList"
					:key="playlist"
					class="flex flex-wrap"
				>
					<div class="w-20">
						<img
							:src="playlist.images[0].url"
							alt=""
							class="w-20 h-20"
						/>
						<div class="flex flex-col">
							<span class="text-[#121216] dark:text-[#f9f9f9] truncate text-md">
								{{ playlist.name }}
							</span>
							<span class="text-xs text-[#121216] dark:text-[#f9f9f9] truncate">
								{{ 'Song: ' + playlist.tracks.total }}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col w-full py-3">
				<h2 class="font-primary text-xl text-[#121216] dark:text-[#f9f9f9]">
					{{ user.name }}'s Playlist
				</h2>
			</div>

			<div
				v-if="newPlayList.length > 0"
				class="flex justify-evenly"
			>
				<div
					v-for="playlist in newPlayList"
					:key="playlist"
					class="flex flex-wrap"
				>
					<div class="w-20">
						<img
							:src="playlist.images[0].url"
							alt=""
							class="w-20 h-20"
						/>
						<div class="flex flex-col">
							<span class="text-[#121216] dark:text-[#f9f9f9] truncate text-md">
								{{ playlist.name }}
							</span>
							<span class="text-xs text-[#121216] dark:text-[#f9f9f9] truncate">
								{{ 'Song: ' + playlist.tracks.total }}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div
				v-else
				class="text-xs text-gray-300 font-primary"
			>
				Playlist not Found
			</div>
		</div>
	</main>
</template>

<style></style>
