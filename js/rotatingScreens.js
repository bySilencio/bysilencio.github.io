let screens = document.querySelectorAll('.app-screen');
let currentIndex = 0;
const rotationInterval = 4000;
let rotationIntervalId;

// Function to rotate screens
function rotateScreens() {
  screens[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % screens.length;
  screens[currentIndex].classList.add('active');
}

// Function to start or restart the rotation interval
function startRotation() {
  // Clear any existing interval to avoid multiple instances
  clearInterval(rotationIntervalId);

  // Update screens in case the language has changed
  screens = document.querySelectorAll('.app-screen');
  
  // Reset index to start rotation from the first image
  currentIndex = 0;

  // Initialize the rotation interval
  rotationIntervalId = setInterval(rotateScreens, rotationInterval);
}

// Start the initial rotation
startRotation();
