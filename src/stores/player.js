import { defineStore } from 'pinia';

export const usePlayerStore = defineStore({
	state: () => ({
		isTrackPlaying: false,
		selectedTrack: null,
		playbackTime: 0,
		audio: null,
		currentVolume: 50,
	}),
	actions: {
		playTrack(track) {
			const elmAudio = document.getElementById('audio-play');
			if (elmAudio.src === track && !elmAudio.paused) {
				this.playbackTime = elmAudio.currentTime;
				elmAudio.pause();
				this.isTrackPlaying = false;
			} else {
				elmAudio.src = track;
				elmAudio.currentTime = this.playbackTime;
				elmAudio.play();
				this.isTrackPlaying = true;
				this.selectedTrack = track;
			}
			// add event listener to toggle the play/pause button when track finishes
			elmAudio.addEventListener('ended', () => {
				this.isTrackPlaying = false;
			});
		},
	},
});
