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