<script lang="js">
		import axios from 'axios';
		import VueAxios from 'vue-axios';
		export default {
			name: 'TrackList',
			data(){
				return {list:undefined}
			},
			mounted() {
				axios.get("https://api.spotify.com/v1/playlists/13OVAUOD1Jh1wgoiVKD0nz/tracks"
	)
				.then((resp) => {
					this.list=resp.data.data
					console.warn(resp.data.data);
				});
			},
		};
</script>
<template>
	<div>1</div>
	<table>
		<tr></tr>
		<tr
			v-for="item in list"
			v-bind:key="item.id"
		></tr>
		<tr>
			{{
				tracks.name
			}}
		</tr>
	</table>
</template>

<style></style>
