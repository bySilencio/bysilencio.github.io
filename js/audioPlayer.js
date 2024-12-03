document.addEventListener('DOMContentLoaded', async () => {
  // Define language-specific audio files
  const languageAudio = {
    en: {
      file: '/audio/english_sample.aac',
      peaks: '/audio/english_sample.json',
    },
    fr: {
      file: '/audio/french_sample.aac',
      peaks: '/audio/french_sample.json',
    },
  };

  let wavesurfer = null;
  let isPlaying = false;

  const playButton = document.getElementById('play-button');
  const playIcon = document.getElementById('play-icon');

  // Initialize WaveSurfer instance
  const initWaveSurfer = async (file, peaksUrl) => {
    // Destroy existing instance if it exists
    if (wavesurfer) {
      wavesurfer.destroy();
      wavesurfer = null;
    }

    // Fetch the pre-generated waveform data
    const response = await fetch(peaksUrl);
    const peaks = await response.json();

    // Create a new WaveSurfer instance
    wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#fff',
      progressColor: '#FF699F',
      responsive: true,
      backend: 'mediaelement', // Allows streaming playback
      barWidth: 4,
      barGap: 2,
      barRadius: 4,
      height: 55,
    });

    // Load the new audio file with peaks
    wavesurfer.load(file, peaks);

    // Reset play button icon when playback finishes
    wavesurfer.on('finish', () => {
      isPlaying = false;
      playIcon.src = 'images/play-icon.png';
    });
  };

  // Reset audio player to initial state
  const resetAudioPlayer = () => {
    if (wavesurfer) {
      wavesurfer.pause(); // Pause the current audio
      wavesurfer.seekTo(0); // Reset to the beginning
    }
    isPlaying = false; // Ensure playback state is reset
    playIcon.src = 'images/play-icon.png'; // Update button to "Play" icon
  };

  // Update audio based on language
  const updateAudio = async (lang) => {
    const audio = languageAudio[lang] || languageAudio['en']; // Fallback to English
    resetAudioPlayer(); // Reset the player before switching audio
    await initWaveSurfer(audio.file, audio.peaks);
  };

  // Play/Pause functionality
  playButton.addEventListener('click', () => {
    if (isPlaying) {
      wavesurfer.pause();
      playIcon.src = 'images/play-icon.png';
    } else {
      wavesurfer.play();
      playIcon.src = 'images/pause-icon.png';
    }
    isPlaying = !isPlaying;
  });

  // Fetch saved language or default to English
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  await updateAudio(savedLanguage);

  // Update audio when language is switched
  document.getElementById('language-select').addEventListener('change', async (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem('preferredLanguage', selectedLanguage);
    await updateAudio(selectedLanguage);
  });
});
