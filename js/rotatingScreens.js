const screens = document.querySelectorAll('.app-screen');
let currentIndex = 0;
const rotationInterval = 3000;

function rotateScreens() {
  screens[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % screens.length;
  screens[currentIndex].classList.add('active');
}

setInterval(rotateScreens, rotationInterval);
