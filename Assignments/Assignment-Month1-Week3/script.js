const quoteButton = document.getElementById("quote-btn");
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const loadingElement = document.getElementById("loading");

async function getQuote() {
    try {
        // Show loading state
        loadingElement.textContent = "Loading...";
        quoteButton.disabled = true;

        // Fetch quote from public API
        const response = await fetch(
            "//RANDOM PUBLIC API CALL"
        );

        // Check if request was successful
        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        // Convert response to JSON
        const data = await response.json();

        // Display quote
        quoteElement.textContent = `"${data.content}"`;
        authorElement.textContent = `— ${data.author}`;

    } catch (error) {
        quoteElement.textContent = "Unable to load quote.";
        authorElement.textContent = "";
        console.error(error);

    } finally {
        // Remove loading state
        loadingElement.textContent = "";
        quoteButton.disabled = false;
    }
}

quoteButton.addEventListener("click", getQuote);
