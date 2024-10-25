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

    document.getElementById('language-select').value = lang;
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
