// Default quotes
let quotes = [
  { text: "The best way to predict the future is to invent it.", category: "Motivation" },
  { text: "Do or do not. There is no try.", category: "Wisdom" },
  { text: "Stay hungry, stay foolish.", category: "Inspiration" }
];

// Load quotes from localStorage if available
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><p><em>Category: ${quote.category}</em></p>`;
}

  // Save last viewed quote to session storage
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Display last viewed quote on load if available
function showLastViewedQuote() {
  const lastQuote = sessionStorage.getItem('lastQuote');
  if (lastQuote) {
    const quote = JSON.parse(lastQuote);
    document.getElementById('quoteDisplay').textContent = `"${quote.text}" - ${quote.category}`;
  } else {
    showRandomQuote();
  }
}

// Add a new quote
function addQuote() {
  const text = document.getElementById('newQuoteText').value.trim();
  const category = document.getElementById('newQuoteCategory').value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // Update local storage
    alert('Quote added successfully!');
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert('Please fill in both fields.');
  }
}

// Export quotes as JSON
function exportToJsonFile() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid file format.');
      }
    } catch {
      alert('Error reading JSON file.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  showLastViewedQuote();
  populateCategories();
filterQuotes();

  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
  document.getElementById('exportBtn').addEventListener('click', exportToJsonFile);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
});
function createAddQuoteForm() {
  const formContainer = document.createElement('div');

  // Create input fields
  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';

  // Create add button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;

  // Append all elements to the form container
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Finally, append to the body (or another container)
  document.body.appendChild(formContainer);
}
// Populate the category dropdown dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  if (!categoryFilter) return; // safety check

  // get unique categories
  const categories = [...new Set(quotes.map(q => q.category))];

  // clear old options and add default
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  // add each category
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // restore last selected filter
  const lastFilter = localStorage.getItem('selectedCategory');
  if (lastFilter) {
    categoryFilter.value = lastFilter;
    filterQuotes();
  }
}

// Filter quotes based on selected category
function filterQuotes() {
  const categoryFilter = document.getElementById('categoryFilter');
  const selected = categoryFilter.value;
  localStorage.setItem('selectedCategory', selected);

  const filtered = selected === 'all'
    ? quotes
    : quotes.filter(q => q.category === selected);

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = filtered.length
    ? filtered.map(q => `<p>"${q.text}"</p><p><em>Category: ${q.category}</em></p>`).join('<hr>')
    : `<p>No quotes found in this category.</p>`;
}
// Populate the category dropdown dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  if (!categoryFilter) return; // in case the element doesn't exist

  // Extract all unique categories from your quotes array
  const categories = [...new Set(quotes.map(q => q.category))];

  // Reset dropdown and add the default option
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  // Add each unique category to the dropdown
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes based on the selected category
function filterQuotes() {
  const categoryFilter = document.getElementById('categoryFilter');
  const selected = categoryFilter.value;

  // Filter quotes depending on selected category
  const filteredQuotes = selected === 'all'
    ? quotes
    : quotes.filter(q => q.category === selected);

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = filteredQuotes.length
    ? filteredQuotes.map(q => `<p>"${q.text}" - <em>${q.category}</em></p>`).join('<hr>')
    : `<p>No quotes found in this category.</p>`;
}
