/**
 * Renderizado dinámico del menú de navegación (Desktop & Mobile)
 */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/menu.json?v=' + Date.now());
        if (!response.ok) return;
        const menuData = await response.json();

        // 1. Actualizar cinta de anuncio superior
        const announceTextEl = document.getElementById('announcement-text');
        if (announceTextEl && menuData.announcement_text) {
            announceTextEl.textContent = menuData.announcement_text;
        }

        // 2. Renderizar menú de escritorio (.nav-links)
        const desktopNavContainer = document.querySelector('.nav-links');
        if (desktopNavContainer && Array.isArray(menuData.items)) {
            desktopNavContainer.innerHTML = menuData.items.map(item => renderDesktopItem(item)).join('');
        }

        // 3. Renderizar menú móvil (.mobile-links)
        const mobileNavContainer = document.querySelector('.mobile-links');
        if (mobileNavContainer && Array.isArray(menuData.items)) {
            let mobileHtml = menuData.items.map(item => renderMobileItem(item)).join('');
            mobileHtml += `<li><a href="nosotros.html" class="mobile-direct-link" onclick="toggleMobileMenu()">Sobre Nosotros</a></li>`;
            mobileNavContainer.innerHTML = mobileHtml;
        }
    } catch (err) {
        console.error('Error cargando el menú dinámico:', err);
    }
});

/**
 * Renderiza un ítem del menú principal de escritorio
 */
function renderDesktopItem(item) {
    if (item.type === 'mega' && Array.isArray(item.columns)) {
        const numCols = item.columns.length;
        const gridTemplate = `grid-template-columns: ${'1fr '.repeat(numCols)}220px; gap:0;`;
        
        const colsHtml = item.columns.map(col => `
            <div class="mega-col">
                <div class="mega-col-title">${escapeHtml(col.title)}</div>
                ${Array.isArray(col.links) ? col.links.map(l => `<a href="${l.url}">${escapeHtml(l.text)}</a>`).join('') : ''}
            </div>
        `).join('');

        let featuredHtml = '';
        if (item.featured && item.featured.title) {
            featuredHtml = `
                <div class="mega-col" style="border-right:none;padding-right:0;">
                    <div class="mega-featured">
                        <img src="${item.featured.image || 'assets/logo morsas 2026.png'}" loading="lazy" alt="${escapeHtml(item.featured.title)}">
                        ${item.featured.label ? `<div class="mega-featured-label">${escapeHtml(item.featured.label)}</div>` : ''}
                        <div class="mega-featured-title">${escapeHtml(item.featured.title)}</div>
                        <a href="${item.featured.url || '#'}" class="mega-featured-btn">Ver ahora →</a>
                    </div>
                </div>
            `;
        }

        return `
            <li class="dropdown">
                <a href="${item.url}">${escapeHtml(item.title)}</a>
                <div class="mega-menu">
                    <div class="mega-grid" style="${gridTemplate}">
                        ${colsHtml}
                        ${featuredHtml}
                    </div>
                </div>
            </li>
        `;
    } else if (item.type === 'simple') {
        const linksHtml = Array.isArray(item.links) 
            ? item.links.map(l => `<a href="${l.url}">${escapeHtml(l.text)}</a>`).join('')
            : '';

        return `
            <li class="dropdown" style="position: relative;">
                <a href="${item.url}">${escapeHtml(item.title)}</a>
                <div class="dropdown-menu">
                    ${item.section_title ? `<div class="dd-section">${escapeHtml(item.section_title)}</div>` : ''}
                    ${linksHtml}
                </div>
            </li>
        `;
    }
    return `<li><a href="${item.url}">${escapeHtml(item.title)}</a></li>`;
}

/**
 * Renderiza un ítem del menú móvil
 */
function renderMobileItem(item) {
    let subLinks = [];
    if (item.type === 'mega' && Array.isArray(item.columns)) {
        subLinks.push({ text: `Ver todo ${item.title}`, url: item.url });
        item.columns.forEach(col => {
            if (Array.isArray(col.links)) {
                subLinks.push(...col.links);
            }
        });
    } else if (item.type === 'simple' && Array.isArray(item.links)) {
        subLinks.push({ text: `Ver todo ${item.title}`, url: item.url });
        subLinks.push(...item.links);
    }

    if (subLinks.length > 0) {
        const subLinksHtml = subLinks.map(l => `<a href="${l.url}" onclick="toggleMobileMenu()">${escapeHtml(l.text)}</a>`).join('');
        return `
            <li>
                <button class="mobile-accordion-btn" onclick="toggleAccordion(this)">${escapeHtml(item.title)} <span>+</span></button>
                <div class="mobile-accordion-content">
                    ${subLinksHtml}
                </div>
            </li>
        `;
    }

    return `<li><a href="${item.url}" class="mobile-direct-link" onclick="toggleMobileMenu()">${escapeHtml(item.title)}</a></li>`;
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
