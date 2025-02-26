document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.querySelector('.navlist');
    const sections = document.querySelectorAll('section');
    
    let lastScrollTop = 0;
    let navTimeout;
    let isHomePage = false;
    
    menuIcon.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-icon') && !e.target.closest('.navlist')) {
            navList.classList.remove('active');
        }
    });
    
    function checkHomePage() {
        const scrollPosition = window.scrollY;
        
        if (sections[0] && scrollPosition < sections[0].offsetHeight) {
            isHomePage = true;
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
        } else {
            isHomePage = false;
           
            if (!navTimeout) {
                header.style.opacity = '0';
                header.style.pointerEvents = 'none';
            }
        }
    }
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.scrollY;
        
        checkHomePage();
        
        if (currentScrollTop < lastScrollTop && !isHomePage) {
            header.style.opacity = '1';
            header.style.pointerEvents = 'auto';
              
            clearTimeout(navTimeout);
            
            navTimeout = setTimeout(() => {
                if (!isHomePage) {
                    header.style.opacity = '0';
                    header.style.pointerEvents = 'none';
                }
                navTimeout = null;
            }, 3000);
        }
        
        lastScrollTop = currentScrollTop;
    });
    
    checkHomePage();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                navList.classList.remove('active');
            }
        });
    });
    
    // Update active navigation item based on scroll position
    function updateActiveNavItem() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.navlist a').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Update active menu item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
    
    // CV download handler
    const downloadBtn = document.getElementById('DownloadBtn');
    downloadBtn?.addEventListener('click', function(e) {
        e.preventDefault();
        window.open('/resume/VinodPatgar_Resume.pdf', '_blank');
    });
    
    // Form Submission Handler (Using Netlify Forms)
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        fetch("/", {
            method: "POST",
            body: new FormData(contactForm),
        })
        .then(() => {
            alert("Message Sent Successfully!");
            contactForm.reset(); // Clear the form
        })
        .catch(error => {
            alert("Failed to send message. Please try again.");
            console.error("Form Submission Error:", error);
        });
    });
});