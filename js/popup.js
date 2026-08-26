/**
 * Morsa's Proshop - Módulo de Popup Promocional Dinámico
 * Carga la configuración desde data/popup_promo.json (administrado por el CMS)
 */
(function() {
  document.addEventListener('DOMContentLoaded', initPromoPopup);

  async function initPromoPopup() {
    try {
      const res = await fetch('data/popup_promo.json?v=' + Date.now());
      if (!res.ok) return;
      const data = await res.json();

      // Si está desactivado en el CMS, no hacer nada
      if (!data || !data.enabled) return;

      // Verificar si el usuario ya cerró este popup en la sesión actual
      const sessionKey = 'morsa_popup_closed_' + (data.coupon_code || data.title || 'promo').replace(/\s+/g, '_');
      if (sessionStorage.getItem(sessionKey)) {
        return;
      }

      const delayMs = (parseInt(data.delay_seconds) || 3) * 1000;

      setTimeout(() => {
        renderPopup(data, sessionKey);
      }, delayMs);

    } catch (err) {
      console.log('Popup promo inactivo o no configurado:', err);
    }
  }

  function renderPopup(data, sessionKey) {
    // Inyectar estilos CSS del popup si no existen
    if (!document.getElementById('morsa-popup-styles')) {
      const style = document.createElement('style');
      style.id = 'morsa-popup-styles';
      style.innerHTML = `
        .morsa-popup-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 12, 60, 0.75);
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.35s ease, visibility 0.35s ease;
        }
        .morsa-popup-backdrop.active {
          opacity: 1;
          visibility: visible;
        }
        .morsa-popup-card {
          background: #ffffff;
          border-radius: 18px;
          max-width: 680px;
          width: 100%;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(245, 166, 35, 0.25);
          position: relative;
          transform: scale(0.92) translateY(20px);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: grid;
          grid-template-columns: ${data.image ? '1fr 1.2fr' : '1fr'};
        }
        .morsa-popup-backdrop.active .morsa-popup-card {
          transform: scale(1) translateY(0);
        }
        .morsa-popup-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(10, 12, 60, 0.08);
          border: none;
          color: #151970;
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background 0.2s, transform 0.2s, color 0.2s;
        }
        .morsa-popup-close:hover {
          background: #151970;
          color: #F5A623;
          transform: scale(1.08);
        }
        .morsa-popup-media {
          background: #0E1A60;
          position: relative;
          min-height: 240px;
          overflow: hidden;
        }
        .morsa-popup-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .morsa-popup-content {
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }
        .morsa-popup-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #F5A623;
          margin-bottom: 8px;
          display: inline-block;
        }
        .morsa-popup-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(32px, 4vw, 42px);
          line-height: 1;
          color: #151970;
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }
        .morsa-popup-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13.5px;
          color: #555555;
          line-height: 1.55;
          margin-bottom: 20px;
        }
        .morsa-coupon-box {
          background: #FFF8E7;
          border: 1.5px dashed #F5A623;
          border-radius: 10px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 10px;
        }
        .morsa-coupon-info {
          display: flex;
          flex-direction: column;
        }
        .morsa-coupon-lbl {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #8A5A00;
        }
        .morsa-coupon-code {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #151970;
          letter-spacing: 0.08em;
        }
        .morsa-coupon-btn {
          background: #F5A623;
          color: #151970;
          border: none;
          border-radius: 6px;
          padding: 6px 14px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s;
        }
        .morsa-coupon-btn:hover {
          background: #FBBF47;
          transform: translateY(-1px);
        }
        .morsa-popup-cta {
          background: #151970;
          color: #F5A623;
          border: none;
          border-radius: 8px;
          padding: 14px 24px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(21, 25, 112, 0.25);
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .morsa-popup-cta:hover {
          background: #1E2280;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(21, 25, 112, 0.35);
        }
        @media (max-width: 650px) {
          .morsa-popup-card {
            grid-template-columns: 1fr;
            max-height: 90vh;
            overflow-y: auto;
          }
          .morsa-popup-media {
            min-height: 180px;
            max-height: 220px;
          }
          .morsa-popup-content {
            padding: 24px 20px;
          }
          .morsa-popup-title {
            font-size: 30px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Crear el elemento DOM del popup
    const backdrop = document.createElement('div');
    backdrop.className = 'morsa-popup-backdrop';
    backdrop.id = 'morsaPromoPopup';

    const imageHtml = data.image ? `
      <div class="morsa-popup-media">
        <img class="morsa-popup-img" src="${data.image}" alt="${data.title || 'Promoción'}">
      </div>
    ` : '';

    const couponHtml = data.coupon_code ? `
      <div class="morsa-coupon-box">
        <div class="morsa-coupon-info">
          <span class="morsa-coupon-lbl">CUPÓN DE DESCUENTO:</span>
          <span class="morsa-coupon-code" id="morsaPromoCode">${data.coupon_code}</span>
        </div>
        <button class="morsa-coupon-btn" id="morsaCopyCouponBtn" onclick="copyPromoCoupon('${data.coupon_code}', this)">
          Copiar
        </button>
      </div>
    ` : '';

    backdrop.innerHTML = `
      <div class="morsa-popup-card" role="dialog" aria-modal="true">
        <button class="morsa-popup-close" id="morsaPopupCloseBtn" aria-label="Cerrar ventana">×</button>
        ${imageHtml}
        <div class="morsa-popup-content">
          ${data.eyebrow ? `<div class="morsa-popup-eyebrow">${data.eyebrow}</div>` : ''}
          <h2 class="morsa-popup-title">${data.title}</h2>
          ${data.desc ? `<p class="morsa-popup-desc">${data.desc}</p>` : ''}
          ${couponHtml}
          ${data.btn_text && data.btn_link ? `
            <a href="${data.btn_link}" class="morsa-popup-cta" id="morsaPopupActionBtn">
              ${data.btn_text} →
            </a>
          ` : ''}
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    // Función de cierre
    const closePopup = () => {
      backdrop.classList.remove('active');
      sessionStorage.setItem(sessionKey, '1');
      setTimeout(() => {
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      }, 400);
    };

    // Eventos
    document.getElementById('morsaPopupCloseBtn')?.addEventListener('click', closePopup);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closePopup();
    });

    const actionBtn = document.getElementById('morsaPopupActionBtn');
    if (actionBtn) {
      actionBtn.addEventListener('click', () => {
        sessionStorage.setItem(sessionKey, '1');
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('active')) {
        closePopup();
      }
    });

    // Activar animación
    requestAnimationFrame(() => {
      backdrop.classList.add('active');
    });
  }

  // Función global para copiar el cupón
  window.copyPromoCoupon = function(code, btn) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = '✓ Copiado';
        btn.style.background = '#27ae60';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.textContent = 'Copiar';
          btn.style.background = '';
          btn.style.color = '';
        }, 2000);
      });
    }
  };
})();
