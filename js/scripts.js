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

    // Set the dropdown value to the current language
    document.getElementById('language-select').value = lang;
  } catch (error) {
    console.error("Error loading language file:", error);
  }
};

// Function to switch language and save user preference
const switchLanguage = (lang) => {
  localStorage.setItem('preferredLanguage', lang);      // Save language preference
  loadLanguage(lang);                                   // Load the selected language without changing URL
};

// Add event listener to the language dropdown
document.getElementById('language-select').addEventListener('change', (event) => {
  switchLanguage(event.target.value);
});

// Check for a saved language preference or default to English
const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';

// Load the appropriate language on page load
loadLanguage(savedLanguage);
