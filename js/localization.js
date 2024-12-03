// Define language-specific resources
const languageResources = {
  en: {
    images: [
      'images/english_screen1.png',
      'images/english_screen2.png',
      'images/english_screen3.png',
    ],
    audio: {
      file: '/audio/english_sample.aac',
      peaks: '/audio/english_sample.json',
    },
  },
  fr: {
    images: [
      'images/french_screen1.png',
      'images/french_screen2.png',
      'images/french_screen3.png',
    ],
    audio: {
      file: '/audio/french_sample.aac',
      peaks: '/audio/french_sample.json',
    },
  },
};

// Function to update images based on language
const loadImagesForLanguage = (lang) => {
  const images = languageResources[lang]?.images || languageResources['en'].images; // Fallback to English
  const screenElements = document.querySelectorAll('.app-screen');

  screenElements.forEach((screen, index) => {
    if (images[index]) {
      screen.src = images[index];
    }
  });
};

// Fetch and apply language strings from the JSON file
const loadLanguageStrings = async (lang) => {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load ${lang}.json: ${response.statusText}`);

    const strings = await response.json();
    document.querySelectorAll('[data-locale]').forEach((element) => {
      const key = element.getAttribute('data-locale');
      if (strings[key]) {
        element.textContent = strings[key];
      }
    });
  } catch (error) {
    console.error('Error loading language file:', error);
  }
};

// Function to load audio for the selected language
const loadAudioForLanguage = async (lang) => {
  const audio = languageResources[lang]?.audio || languageResources['en'].audio; // Fallback to English
  const audioPlayerScript = document.querySelector('script[src="js/audioPlayer.js"]');
  if (audioPlayerScript) {
    audioPlayerScript.remove(); // Remove existing script to reload
  }

  // Reload audio player
  const newScript = document.createElement('script');
  newScript.src = 'js/audioPlayer.js';
  document.body.appendChild(newScript);

  // Update audio dynamically in the player
  if (window.updateAudio) {
    await window.updateAudio(lang);
  }
};

// Save language preference and load language without reloading the page
const switchLanguage = async (lang) => {
  localStorage.setItem('preferredLanguage', lang);

  // Update text content
  await loadLanguageStrings(lang);

  // Update images
  loadImagesForLanguage(lang);

  // Update audio
  await loadAudioForLanguage(lang);

  // Update the language select dropdown
  document.getElementById('language-select').value = lang;
};

// Event listener for language change
document.getElementById('language-select').addEventListener('change', async (event) => {
  const selectedLanguage = event.target.value;
  await switchLanguage(selectedLanguage);
});

// Load the saved language or default to English
const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
switchLanguage(savedLanguage);
