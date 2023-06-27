import { defineStore } from 'pinia';

export const useMusicStore = defineStore({
	id: 'music',
	state: () => ({
		tracks: [],
		selectedTrack: null,
		isTrackPlaying: false,
		playbackTime: 0,
		audioPlayer: null, // Thêm tham chiếu vào store
	}),
	actions: {
		setAudioPlayer(ref) {
			this.audioPlayer = ref;
		},
		playTrack(track) {
			if (!this.audioPlayer) {
				console.warn('audioPlayer is not available');
				return;
			}

			if (this.selectedTrack === track.preview_url && this.audioPlayer.paused) {
				this.audioPlayer.play();
				this.isTrackPlaying = true;
			} else if (
				this.selectedTrack === track.preview_url &&
				!this.audioPlayer.paused
			) {
				this.audioPlayer.pause();
				this.isTrackPlaying = false;
			} else {
				this.audioPlayer.src = track.preview_url;
				this.audioPlayer.load();
				this.audioPlayer.play();
				this.isTrackPlaying = true;
				this.selectedTrack = track.preview_url;
			}
		},
	},
});
