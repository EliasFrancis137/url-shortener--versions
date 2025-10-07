const shortenBtn = document.getElementById("shortenBtn");
const longUrlInput = document.getElementById("longUrl");
const resultDiv = document.getElementById("result");
const shortUrlInput = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");
const linksList = document.getElementById("linksList");

const baseURL = "https://short.ly/"; // Fake base for demo

// Generate random 6-character code
function generateShortCode() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Load saved links from LocalStorage
function loadSavedLinks() {
  const saved = JSON.parse(localStorage.getItem("urls")) || [];
  linksList.innerHTML = "";
  saved.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${item.long}" target="_blank">${item.short}</a>`;
    linksList.appendChild(li);
  });
}

shortenBtn.addEventListener("click", () => {
  const longUrl = longUrlInput.value.trim();
  if (!longUrl) return alert("Please enter a URL!");

  const shortCode = generateShortCode();
  const shortUrl = baseURL + shortCode;

  shortUrlInput.value = shortUrl;
  resultDiv.classList.remove("hidden");

  // Save in LocalStorage
  const saved = JSON.parse(localStorage.getItem("urls")) || [];
  saved.push({ long: longUrl, short: shortUrl });
  localStorage.setItem("urls", JSON.stringify(saved));

  loadSavedLinks();
  longUrlInput.value = "";
});

copyBtn.addEventListener("click", () => {
  shortUrlInput.select();
  document.execCommand("copy");
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
});

// Initial load
loadSavedLinks();
