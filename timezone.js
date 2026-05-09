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

// --- MODAL POP-UP LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('subscribe-modal');
    const openBtns = document.querySelectorAll('.open-subscribe-modal');
    const closeBtn = document.getElementById('close-subscribe-modal');

    // Make sure elements exist on the page before adding listeners
    if(modal && closeBtn) {
        // Open modal when ANY of the target buttons are clicked
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Stops the page from jumping to the top
                modal.style.display = 'flex';
            });
        });

        // Close modal when clicking the 'X'
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking on the dark background outside the box
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});