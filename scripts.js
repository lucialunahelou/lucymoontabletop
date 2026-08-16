document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle Logic ---
    const toggleThemeBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme immediately on load
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let theme = document.documentElement.getAttribute('data-theme');
            
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- 2. Drawer Navbar Logic ---
    const drawerOpenBtn = document.getElementById('drawer-open');
    const drawerCloseBtn = document.getElementById('drawer-close');
    const navDrawer = document.getElementById('nav-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');

    function toggleDrawer() {
        navDrawer.classList.toggle('active');
        drawerOverlay.classList.toggle('active');
        
        // Prevent background scrolling when drawer is open
        if (navDrawer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (drawerOpenBtn && drawerCloseBtn && navDrawer && drawerOverlay) {
        drawerOpenBtn.addEventListener('click', toggleDrawer);
        drawerCloseBtn.addEventListener('click', toggleDrawer);
        drawerOverlay.addEventListener('click', toggleDrawer);
    }

    // --- 3. Currency Toggle Logic ---
    const currencyBtns = document.querySelectorAll('.currency-btn');
    const priceElements = document.querySelectorAll('.card-price');

    if (currencyBtns.length > 0) {
        currencyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                currencyBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Fetch selected currency string
                const selectedCurrency = btn.getAttribute('data-currency');
                
                // Update all price elements
                priceElements.forEach(price => {
                    price.innerText = price.getAttribute(`data-${selectedCurrency}`);
                });
            });
        });
    }
});

// --- 4. Typewriter Effect Logic ---
    const words = ["GREAT", "WONDERFUL", "HEROIC", "TRAGIC???", "FANTASTIC", "UNFORGETTABLE"];
    const typewriterElement = document.getElementById('typewriter-text');
    
    if (typewriterElement) {
        let wordIndex = 0;
        let letterIndex = 0;
        let isDeleting = false;
        let typingDelay = 150;
        let deletingDelay = 100;
        let newWordDelay = 2000;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, letterIndex - 1);
                letterIndex--;
            } else {
                typewriterElement.textContent = currentWord.substring(0, letterIndex + 1);
                letterIndex++;
            }

            let setTimeoutDelay = isDeleting ? deletingDelay : typingDelay;

            // Natural typing variance
            if (!isDeleting) {
                setTimeoutDelay -= Math.random() * 50;
            }

            if (!isDeleting && letterIndex === currentWord.length) {
                setTimeoutDelay = newWordDelay;
                isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeoutDelay = 500;
            }

            setTimeout(type, setTimeoutDelay);
        }

        setTimeout(type, 1000);
    }

    // --- 5. Waitlist Modal & Make.com Webhook Logic ---
    const waitlistModal = document.getElementById('waitlist-modal');
    const closeWaitlistBtn = document.getElementById('close-waitlist-modal');
    const waitlistForm = document.getElementById('waitlist-form');
    const contactPref = document.getElementById('contact-preference');
    const handleContainer = document.getElementById('handle-container');
    const playerHandle = document.getElementById('player-handle');
    const statusText = document.getElementById('form-status');

    // Replace this string with your Make.com Webhook URL after completing Step 4
    const MAKE_WEBHOOK_URL = 'https://hook.eu1.make.com/h97ypwtbd597faqedqhisxx8ecvk8bl1';

    // Toggle handle input visibility based on platform selection
    if (contactPref) {
        contactPref.addEventListener('change', (e) => {
            if (e.target.value === 'Discord' || e.target.value === 'Telegram') {
                handleContainer.style.display = 'block';
                playerHandle.required = true;
            } else {
                handleContainer.style.display = 'none';
                playerHandle.required = false;
            }
        });
    }

    // Open modal and set campaign data
    document.querySelectorAll('.open-waitlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const campaignName = btn.getAttribute('data-campaign');
            document.getElementById('waitlist-campaign-name').innerText = campaignName;
            document.getElementById('campaign-id').value = campaignName;
            waitlistModal.style.display = 'flex';
        });
    });

    // Close modal
    if (closeWaitlistBtn) {
        closeWaitlistBtn.addEventListener('click', () => {
            waitlistModal.style.display = 'none';
            statusText.style.display = 'none';
            waitlistForm.reset();
            handleContainer.style.display = 'none';
        });
    }

    // Form Submission Payload
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = waitlistForm.querySelector('button[type="submit"]');
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const payload = {
                campaign: document.getElementById('campaign-id').value,
                name: document.getElementById('player-name').value,
                email: document.getElementById('player-email').value,
                preference: contactPref.value,
                handle: playerHandle.value || 'N/A',
                timestamp: new Date().toISOString()
            };

            try {
                const response = await fetch(MAKE_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    waitlistForm.style.display = 'none';
                    statusText.innerText = 'Waitlist request received successfully.';
                    statusText.style.color = 'var(--accent-primary)';
                    statusText.style.display = 'block';
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                statusText.innerText = 'Error submitting request. Please try again or email directly.';
                statusText.style.color = '#8B0000';
                statusText.style.display = 'block';
                submitBtn.innerText = 'Submit Request';
                submitBtn.disabled = false;
            }
        });
    }