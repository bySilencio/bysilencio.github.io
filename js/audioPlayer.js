document.addEventListener('DOMContentLoaded', async () => {
  const playButton = document.getElementById('play-button');
  const playIcon = document.getElementById('play-icon');
  let isPlaying = false;

  // Fetch the pre-generated waveform data from JSON
  const response = await fetch('/silencio-sample.json');
  const peaks = await response.json();

  const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#fff',
    progressColor: '#FF699F',
    responsive: true,
    backend: 'mediaelement',  // Allows for streaming playback
    barWidth: 4,
    barGap: 2,
    barRadius: 4,
    height: 55,
  });

  // Load the audio file with the pre-generated peaks for faster rendering
  wavesurfer.load('/silencio-sample.aac', peaks);

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

  wavesurfer.on('finish', () => {
    isPlaying = false;
    playIcon.src = 'images/play-icon.png';
  });
});
