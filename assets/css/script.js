const video = document.querySelector('video');

document.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});
