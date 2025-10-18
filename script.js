// Initial quotes data
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Inspiration" },
  { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Wisdom" },
  { text: "Do what you can, with what you have, where you are.", category: "Motivation" }
];

// DOM references
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuote");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const categorySelect = document.getElementById("categorySelect");

// Function to extract unique categories and populate dropdown
function updateCategoryOptions() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categorySelect.innerHTML = "";
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

// Function to show a random quote based on selected category
function showRandomQuote() {
  const selectedCategory = categorySelect.value;
  const filteredQuotes = quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>– ${quote.category}</em></p>`;
}

// Function to add a new quote dynamically
function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please enter both quote text and category.");
    return;
  }

  // Add to quotes array
  quotes.push({ text, category });

  // Clear inputs
  newQuoteText.value = "";
  newQuoteCategory.value = "";

  // Update dropdown
  updateCategoryOptions();

  alert("Quote added successfully!");
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addQuote);

// Initialize dropdown on page load
updateCategoryOptions();
showRandomQuote();
