document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('play-button');
  const playIcon = document.getElementById('play-icon');
  let isPlaying = false;

  const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#fff',
    progressColor: '#FF699F',
    responsive: true,
    backend: 'mediaelement',
    barWidth: 4,
    barGap: 2,
    barRadius: 4,
    height: 55,
  });

  wavesurfer.load('/silencio-sample.m4a');

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
