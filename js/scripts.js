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

document.getElementById("subscribe-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  const subscribeButton = document.querySelector(".notify-btn");

  // Use built-in validation
  if (!emailInput.checkValidity()) {
    alert("Please enter a valid email.");
    return;
  }

  // Replace button text with spinner (button size remains fixed)
  subscribeButton.classList.add("loading");
  subscribeButton.innerHTML = '<span class="spinner"></span>';
  subscribeButton.disabled = true;

  try {
    const response = await fetch(
      "https://9vpx1a5sb3.execute-api.eu-north-1.amazonaws.com/prod/subscribe",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const result = await response.json();
    if (response.ok) {
      setTimeout(() => {
        subscribeButton.innerHTML = '<span class="checkmark"></span>';
      }, 500); // Small delay for a smooth experience
    } else {
      setTimeout(() => {
        subscribeButton.innerText = "Subscribe";
        subscribeButton.disabled = false;
        alert(`Error: ${result.message || 'Unknown error occurred'}`);
      }, 500);
    }
  } catch (error) {
    setTimeout(() => {
      subscribeButton.innerText = "Subscribe";
      subscribeButton.disabled = false;
      alert("Failed to connect to server.");
    }, 500);
  }
});
