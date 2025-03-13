import { Howl } from 'howler';

/**
 * MusicPlayer class for managing the focus music player
 */
export class MusicPlayer {
  constructor(options) {
    this.trackNameElement = options.trackNameElement;
    this.playPauseButton = options.playPauseButton;
    this.nextButton = options.nextButton;
    this.prevButton = options.prevButton;
    this.volumeControl = options.volumeControl;
    
    this.currentTrackIndex = 0;
    this.isPlaying = false;
    this.volume = 0.7; // Default volume (0-1)
    
    this.tracks = [
      {
        title: "Lo-Fi Focus",
        url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
      },
      {
        title: "Ambient Meditation",
        url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6c9e0a1.mp3"
      },
      {
        title: "Deep Concentration",
        url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8e2d3b11a.mp3"
      }
    ];
    
    this.sound = null;
  }
  
  init() {
    this.setupEventListeners();
    this.loadTrack(this.currentTrackIndex);
    this.updateVolumeFromControl();
  }
  
  setupEventListeners() {
    this.playPauseButton.addEventListener('click', () => this.togglePlayPause());
    this.nextButton.addEventListener('click', () => this.nextTrack());
    this.prevButton.addEventListener('click', () => this.prevTrack());
    this.volumeControl.addEventListener('input', () => this.updateVolumeFromControl());
  }
  
  loadTrack(index) {
    // Stop current track if it exists
    if (this.sound) {
      this.sound.stop();
    }
    
    const track = this.tracks[index];
    this.trackNameElement.textContent = track.title;
    
    // Create new Howl instance for the track
    this.sound = new Howl({
      src: [track.url],
      html5: true,
      volume: this.volume,
      onend: () => {
        this.nextTrack();
      }
    });
    
    // Update play/pause button icon
    this.updatePlayPauseButton();
  }
  
  togglePlayPause() {
    if (!this.sound) return;
    
    if (this.isPlaying) {
      this.sound.pause();
    } else {
      this.sound.play();
    }
    
    this.isPlaying = !this.isPlaying;
    this.updatePlayPauseButton();
  }
  
  updatePlayPauseButton() {
    const icon = this.playPauseButton.querySelector('i');
    
    if (this.isPlaying) {
      icon.className = 'fas fa-pause';
    } else {
      icon.className = 'fas fa-play';
    }
  }
  
  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.loadTrack(this.currentTrackIndex);
    
    if (this.isPlaying) {
      this.sound.play();
    }
  }
  
  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.loadTrack(this.currentTrackIndex);
    
    if (this.isPlaying) {
      this.sound.play();
    }
  }
  
  updateVolumeFromControl() {
    this.volume = this.volumeControl.value / 100;
    
    if (this.sound) {
      this.sound.volume(this.volume);
    }
  }
}
