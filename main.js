document.addEventListener("DOMContentLoaded", function() {

    /**
     * Fetches HTML content from a file and inserts it into a placeholder element.
     * @param {string} url - The URL of the component file (e.g., 'header.html').
     * @param {string} placeholderId - The ID of the div where the content will be inserted.
     * @returns {Promise} - A promise that resolves when the component is loaded.
     */
    const loadComponent = (url, placeholderId) => {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = data;
                } else {
                    console.error(`Placeholder with id '${placeholderId}' not found.`);
                }
            })
            .catch(error => console.error(`Error loading component from ${url}:`, error));
    };

    /**
     * Sets the active state for navigation links based on the current page.
     */
    const setActiveNavLink = () => {
        const currentPage = window.location.pathname.split("/").pop() || 'index.html';
        const navLinks = document.querySelectorAll('#header a'); // Select all links within the header

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('nav-active');
                link.classList.add('font-bold');
                link.classList.remove('text-gray-600');
            }
        });
    };

    /**
     * Sets up the event listener for the mobile menu toggle button.
     */
    const setupMobileMenu = () => {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    };

    // Load header, then set up its interactive elements (menu and active links)
    loadComponent('header.html', 'header-placeholder').then(() => {
        setupMobileMenu();
        setActiveNavLink();
    });

    // Load footer
    loadComponent('footer.html', 'footer-placeholder');

});

