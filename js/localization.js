// Define language-specific image sets
const languageImages = {
  en: [
    'images/english_screen1.png',
    'images/english_screen2.png',
    'images/english_screen3.png'
  ],
  fr: [
    'images/french_screen1.png',
    'images/french_screen2.png',
    'images/french_screen3.png'
  ]
};

// Function to update images based on language
const loadImagesForLanguage = (lang) => {
  const images = languageImages[lang] || languageImages['en']; // Fallback to English if language not found
  const screenElements = document.querySelectorAll('.app-screen');
  
  screenElements.forEach((screen, index) => {
    if (images[index]) {
      screen.src = images[index];
    }
  });
};

// Fetch and apply language strings from the JSON file
const loadLanguage = async (lang) => {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load ${lang}.json: ${response.statusText}`);
    
    const strings = await response.json();
    document.querySelectorAll('[data-locale]').forEach(element => {
      const key = element.getAttribute('data-locale');
      if (strings[key]) {
        element.textContent = strings[key];
      }
    });

    // Update the language select dropdown
    document.getElementById('language-select').value = lang;

    // Load language-specific images
    loadImagesForLanguage(lang);

  } catch (error) {
    console.error("Error loading language file:", error);
  }
};

// Save language preference and load language without reloading the page
const switchLanguage = (lang) => {
  localStorage.setItem('preferredLanguage', lang);
  loadLanguage(lang);
};

document.getElementById('language-select').addEventListener('change', (event) => {
  switchLanguage(event.target.value);
});

// Default to saved language or English if none is saved
const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
loadLanguage(savedLanguage);
