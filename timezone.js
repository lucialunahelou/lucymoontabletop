document.addEventListener("DOMContentLoaded", () => {
    // Find every element on the page with the class 'local-time'
    const timeElements = document.querySelectorAll('.local-time');

    timeElements.forEach(el => {
        const utcTimeString = el.getAttribute('data-time');
        if (!utcTimeString) return;

        // Convert the UTC string into a real Date object
        const date = new Date(utcTimeString);

        // Format it nicely based on the user's browser language and local timezone
        const options = { 
            weekday: 'long', 
            hour: 'numeric', 
            minute: '2-digit', 
            timeZoneName: 'short' // e.g., EDT, BST, AEST
        };
        
        let localTimeString = new Intl.DateTimeFormat(navigator.language, options).format(date);

        // If it's a weekly game, add an 's' to the day (e.g., "Wednesday" -> "Wednesdays")
        if (el.getAttribute('data-format') === 'weekly') {
            // A quick trick to pluralize the first word (the day of the week) in English
            const parts = localTimeString.split(',');
            if (parts.length > 1) {
                parts[0] = parts[0] + 's';
                localTimeString = parts.join(',');
            }
        }

        // Replace the static text with their converted local time!
        el.textContent = localTimeString + " (Your Time)";
        el.style.color = "var(--forest-green)"; // Keeps it looking sharp
        el.style.fontWeight = "bold";
    });
});


// --- CURRENCY TOGGLE SCRIPT ---
document.addEventListener("DOMContentLoaded", () => {
    const currencyBtns = document.querySelectorAll('.currency-btn');
    const prices = document.querySelectorAll('.card-price');

    currencyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 1. Remove 'active' class from all buttons
            currencyBtns.forEach(b => b.classList.remove('active'));
            
            // 2. Add 'active' class to the clicked button
            e.target.classList.add('active');
            
            // 3. Get the currency they clicked (eur, usd, or aud)
            const selectedCurrency = e.target.getAttribute('data-currency');
            
            // 4. Update all the prices on the page
            prices.forEach(priceEl => {
                const newPrice = priceEl.getAttribute(`data-${selectedCurrency}`);
                if (newPrice) {
                    priceEl.textContent = newPrice;
                }
            });
        });
    });
});