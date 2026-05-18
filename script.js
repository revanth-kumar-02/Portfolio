document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Scroll Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Copy to Clipboard Functionality
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find the adjacent target element
            const listItem = e.target.closest('li');
            const targetEl = listItem.querySelector('.copy-target');
            
            if (targetEl) {
                const textToCopy = targetEl.getAttribute('data-value');
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = btn.innerText;
                    btn.innerText = '[copied!]';
                    btn.style.color = '#ededed';
                    
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                    btn.innerText = '[error]';
                });
            }
        });
    });

    // 4. Terminal Window Controls (Visual only)
    const closeBtns = document.querySelectorAll('.btn.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const terminal = e.target.closest('.terminal-window');
            if (terminal) {
                terminal.style.opacity = '0.5';
                setTimeout(() => {
                    terminal.style.opacity = '1';
                }, 500);
            }
        });
    });

});
