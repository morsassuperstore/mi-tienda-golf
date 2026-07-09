document.addEventListener('DOMContentLoaded', () => {
    
    console.log("Morsa's Proshop: Inicializando animaciones y mejoras de accesibilidad...");

    // 1. CORRECCIONES DE ACCESIBILIDAD Y COMPATIBILIDAD (Console Errors/Warnings)
    
    // a. Botones y Links sin texto (ARIA Labels)
    document.querySelectorAll('.nav-icon-btn').forEach((btn, index) => {
        if (!btn.hasAttribute('aria-label') && !btn.hasAttribute('title')) {
            const labels = ["Buscar", "Usuario", "Favoritos", "Carrito"];
            const label = labels[index] || "Botón";
            btn.setAttribute('aria-label', label);
            btn.setAttribute('title', label);
        }
    });

    document.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.setAttribute('aria-label', 'Añadir a favoritos');
        btn.setAttribute('title', 'Añadir a favoritos');
    });

    document.querySelectorAll('.social-btn').forEach((btn, index) => {
        const networks = ["Instagram", "Facebook", "Twitter", "YouTube"];
        btn.setAttribute('aria-label', networks[index] || "Red social");
    });

    // b. Imágenes sin texto alternativo
    document.querySelectorAll('img:not([alt])').forEach(img => {
        img.setAttribute('alt', "Imagen ilustrativa de Morsa's Proshop");
    });

    // c. Iframes sin nombre accesible
    document.querySelectorAll('iframe:not([title])').forEach(iframe => {
        iframe.setAttribute('title', "Contenido incrustado");
    });

    // d. Inyectar correcciones CSS de compatibilidad (Safari webkit) y estilos nuevos
    const styleFixes = document.createElement('style');
    styleFixes.innerHTML = `
        /* Correcciones de compatibilidad para Safari */
        .hero-stats, .sport-card-bg {
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
        }
        .brand-pill, .cat-tile, .product-add, .product-wishlist {
            -webkit-user-select: none;
            user-select: none;
        }

        /* 2. HEADER GLASSMORPHISM (Efecto Cristal en Scroll) */
        nav {
            transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        nav.nav-scrolled {
            background: rgba(21, 25, 112, 0.97) !important;
            box-shadow: 0 4px 24px rgba(0,0,0,0.2);
        }

        /* 3. ANIMACIONES AL HACER SCROLL (Fade Up) */
        .reveal-up {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: opacity, transform;
        }
        .reveal-up.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* 4. EFECTO ZOOM EN IMÁGENES DE PRODUCTOS */
        .product-img img {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card:hover .product-img img {
            transform: scale(1.08);
        }

        /* WhatsApp Floating Button */
        .whatsapp-float {
            position: fixed !important;
            bottom: 24px !important;
            right: 24px !important;
            width: 56px !important;
            height: 56px !important;
            border-radius: 50% !important;
            background-color: #25D366 !important;
            box-shadow: 0 6px 20px rgba(37,211,102,0.3) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            z-index: 999999 !important;
            transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease !important;
            cursor: pointer !important;
            text-decoration: none !important;
        }
        
        .whatsapp-float:hover {
            transform: scale(1.08) !important;
            box-shadow: 0 8px 24px rgba(37,211,102,0.4) !important;
        }

        @media (max-width: 768px) {
            .whatsapp-float {
                bottom: 16px !important;
                right: 16px !important;
                width: 50px !important;
                height: 50px !important;
            }
            .whatsapp-float svg {
                width: 26px !important;
                height: 26px !important;
            }
        }
    `;
    document.head.appendChild(styleFixes);


    // --- LÓGICA DE INTERACCIONES ---

    // A. Navbar Glassmorphism
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // B. Añadir clases de animación a elementos clave
    const elementsToAnimate = document.querySelectorAll(
        '.product-card, .sport-card, .cat-tile, .feature-card, .promo-banner, .gender-card'
    );
    elementsToAnimate.forEach(el => el.classList.add('reveal-up'));

    // C. Intersection Observer para revelar elementos al hacer scroll
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Pequeño retraso basado en el orden para efecto cascada
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));


});
