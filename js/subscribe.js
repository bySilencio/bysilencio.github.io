document.getElementById("subscribe-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const email = emailInput.value;
  const subscribeButton = document.querySelector(".notify-btn");

  if (!emailInput.checkValidity()) {
    alert("Please enter a valid email.");
    return;
  }

  // Loading spinner displayed while waiting for a response
  subscribeButton.classList.add("loading");
  subscribeButton.innerHTML = '<span class="spinner"></span>';
  subscribeButton.disabled = true;

  try {
    const response = await fetch(
      "https://8fx941lll1.execute-api.eu-north-1.amazonaws.com/submit",
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
      }, 500); // Added delay for smoother UX
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
