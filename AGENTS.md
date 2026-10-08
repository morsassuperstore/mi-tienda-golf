# 🤖 Guía Maestra para Agentes de IA — Workspace Morsa's Proshop

> **Propósito de este archivo (`AGENTS.md`):**  
> Este documento proporciona contexto técnico, arquitectónico, de negocio y operativo a cualquier Agente de Inteligencia Artificial que trabaje en este repositorio. Léelo completamente antes de sugerir o realizar modificaciones en el código.

---

## 📌 1. Visión General del Proyecto

* **Nombre Comercial:** **Morsa's Proshop** (Sitio web oficial: `morsasgolf.com` / Entorno de desarrollo: `dev.morsasgolf.com` / Admin: `admin-dev.morsasgolf.com`).
* **Nicho:** eCommerce y Pro-Shop de alta gama especializado en **Golf**, **Pádel** y **Tenis**.
* **Ubicación y Operaciones:** Caracas, Venezuela.
  * **Sede Principal:** C.C. La Tahona (Tienda física + Simulador de Swing de Golf).
  * **Pro-Shops Aliados en Clubes:** La Lagunita Country Club e Izcaragua Country Club.
  * **Despachos:** Delivery en Caracas y Envíos Nacionales asegurados (MRW, Tealca, Zoom) con embalaje tubular reforzado para palos y bolsas.
* **Modelo de Venta:** Catálogo web *headless* con carrito local + finalización de pedidos y atención personalizada por **WhatsApp** y pasarelas de pago (Zelle, Pago Móvil a tasa BCV, Dólares en efectivo en mostrador, Stripe, USDT).

---

## 🗂️ 2. Mapa del Repositorio y Arquitectura

```text
tienda-golf/
├── AGENTS.md                          # <-- Este archivo: guía para agentes de IA
├── CHECKLIST-TECNICO-TIENDA-GOLF.md   # Auditoría de 20 puntos técnicos, legales y operativos
├── docker-compose.yml                 # Entorno local (WordPress + MySQL en puerto 8080)
├── test_order.js                      # Script Node.js para probar el endpoint de checkout
│
├── frontend-v2/                       # 🟢 [ACTIVO / PRODUCCIÓN] Frontend Headless
│   ├── index.html                     # Portada principal con carrusel, deportes, marcas
│   ├── tienda.html                    # Catálogo dinámico con filtros y modal de producto
│   ├── carrito.html                   # Carrito de 4 pasos (Carrito, Envío, Pago, Confirmación)
│   ├── nosotros.html                  # Historia de la empresa y mapa de sedes
│   ├── envios.html                    # Política de envíos, embalaje y tiempos
│   ├── devoluciones.html              # Garantías oficiales y cambios (15 días)
│   ├── guia-tallas.html               # Guía de tallas para ropa, calzado y guantes
│   ├── politica-privacidad.html       # Política de privacidad (Aprobación Meta Ads / WA API)
│   ├── terminos.html                  # Términos comerciales y precios referenciales
│   ├── sitemap.xml & robots.txt       # SEO e indexación
│   ├── admin/                         # Panel de administración visual con Decap CMS
│   │   ├── index.html                 # Interfaz web de Decap CMS
│   │   └── config.yml                 # Esquema de colecciones para editar data/*.json
│   ├── assets/                        # Imágenes, logotipos (.webp, .png)
│   ├── data/                          # Archivos JSON consumidos por el frontend y Decap CMS
│   │   ├── home.json                  # Banners, textos de portada, Zelle email, sucursales
│   │   ├── menu.json                  # Mega menús y cinta de anuncios
│   │   ├── popup_promo.json           # Configuración del popup de ofertas y cupones
│   │   ├── envios.json                # Textos editables de la página de envíos
│   │   ├── devoluciones.json          # Textos editables de la página de devoluciones
│   │   ├── guia-tallas.json           # Datos editables de la guía de tallas
│   │   └── store_config.json          # Datos de pago móvil, Zelle y tasas
│   └── js/                            # JavaScript modular
│       ├── config.js                  # URLs de API (`API_URL`), marcas y símbolo 'Ref.'
│       ├── api.js                     # Clientes de consumo WooCommerce y Checkout
│       ├── cart.js                    # Manejo del carrito en localStorage
│       ├── menu.js                    # Renderizado del mega menú dinámico
│       ├── popup.js                   # Lógica de memoria y display del popup
│       └── animations.js              # Efectos visuales de interfaz
│
├── frontend/                          # 🔴 [LEGACY / DEPRECADOR] Primer prototipo estático
│                                      # ⚠️ ¡NO MODIFICAR! El activo es frontend-v2
│
├── morsas_woo/                        # 🔄 Sincronizador OSPOS (POS físico) ↔ WooCommerce
│   ├── index.php                      # Dashboard web "WooPublisher"
│   ├── config/                        # Conexiones a DB MySQL de OSPOS y WooCommerce
│   ├── api/                           # Endpoints PHP para sincronizar inventario, variantes
│   │                                  # y generación de descripciones/SEO por IA (OpenRouter)
│   └── .env                           # Credenciales de base de datos y llaves API
│
└── morsa-headless-connector/          # 🔌 Plugin personalizado para WordPress
    ├── morsa-headless-connector.php   # Inicializador, CORS, Application Passwords
    └── includes/
        ├── class-cors.php             # Cabeceras CORS para dev y producción
        ├── class-checkout-api.php     # Endpoint REST /morsa/v1/checkout-link
        └── class-products-api.php     # Optimización de payloads de productos
```

---

## ⚙️ 3. Reglas Técnicas y Estándares de Desarrollo

### A. Frontend (`frontend-v2/`)
1. **Pila Tecnológica:** **Vanilla HTML5, CSS3 y JavaScript moderno.**
   * **Prohibido:** NO añadir frameworks como React, Vue, Next.js, ni librerías CSS pesadas como Tailwind en `frontend-v2/`.
   * **Razón:** La tienda está diseñada para cargar en **< 1 segundo en redes móviles 4G** (situación típica de golfistas en campo o clubhouse) y desplegarse directamente vía **FTP a cPanel con GitHub Actions** sin pasos de compilación (`build`).
2. **Sistema de Diseño y Estética:**
   * **Paleta Oficial:**
     * Azul Principal: `--navy: #2A2FA8` | `--navy-dark: #1E2280` | `--navy-deeper: #151970`
     * Dorado / Oro: `--gold: #F5A623` | `--gold-light: #FBBF47` | `--gold-pale: #FFF3D6`
     * Fondos: `--off-white: #F8F7F4` | `--white: #FFFFFF` | `--light-gray: #E2E8F0`
     * Texto: `--text-dark: #0E1050` | `--text-mid: #555555`
   * **Tipografía:**
     * Títulos / Impacto: `'Bebas Neue', sans-serif`
     * Botones, badges, etiquetas: `'Barlow Condensed', sans-serif` (uppercase, bold)
     * Texto de cuerpo: `'Plus Jakarta Sans', sans-serif`
3. **Moneda y Precios:**
   * La tienda utiliza **`Ref.`** (Dólares referenciales en Venezuela).
   * Nunca utilices el símbolo `$` solo sin contexto. La función global estándar es `formatPrice(monto)` en `frontend-v2/js/config.js`.
4. **Integración con Decap CMS:**
   * El cliente administra textos, banners, cupones y datos de Zelle desde `/admin/`.
   * Estos cambios se persisten en archivos JSON dentro de `frontend-v2/data/`.
   * Si agregas o modificas campos en `data/*.json`, **debes actualizar correspondientemente `frontend-v2/admin/config.yml`** para no romper el panel visual.

---

## 🏌️ 4. Reglas del Catálogo Deportivo (Golf, Pádel, Tenis)

El público de golf y deportes de raqueta es exigente y técnico. Un producto mal especificado genera rechazo o confusión en WhatsApp:

1. **Palos de Golf:**
   * **Orientación:** Diestro (*Right Hand*) / Zurdo (*Left Hand*).
   * **Flex de Varilla:** Regular (R), Stiff (S), Extra Stiff (XS), Senior / Lite (A), Ladies (L).
   * **Loft:** Grados exactos (ej. 9.0°, 10.5°, 12°, 52°, 56°, 60°).
2. **Guantes de Golf:**
   * **Mano:** Mano Izquierda (para jugador diestro) / Mano Derecha (para jugador zurdo).
   * **Tallas:** S, M, ML, L, XL, Cadet.
3. **Bolas de Golf:**
   * **Formato:** Docena x12, Sleeve x3, o Grado A/Mint en reacondicionadas.
4. **Garantías Especiales:**
   * **Prendas y Calzado:** 15 días continuos para cambio de talla (sin uso en campo, con etiquetas intactas).
   * **Palos de Golf y Raquetas:** Garantía oficial contra defectos de fábrica (desprendimiento de cabeza, falla de epoxy/resina, fallas de soldadura). **Excluye expresamente** marcas de impacto en la corona o parte superior (*sky marks*), roturas por golpe contra el suelo o impactos fuera de ranuras.

---

## 🔒 5. Seguridad y Cumplimiento Legal

1. **Cero Secretos en el Frontend:**
   * Nunca incluyas claves privadas, contraseñas de cPanel, tokens de Stripe secretos ni Consumer Secrets de WooCommerce en archivos `.js` o `.html`.
   * La comunicación de pedidos debe pasar por el backend (`/morsa/v1/checkout-link`) o redirigir al enlace cliente de WhatsApp (`wa.me`).
2. **Protección Anti-Spam (Honeypot):**
   * En todo formulario existe un campo oculto: `<input type="text" name="website_hp" id="website_hp" style="display:none !important;" tabindex="-1" autocomplete="off">`.
   * Si este campo contiene algún valor al enviar, el script debe abortar el envío en silencio (trampa para bots).
3. **Validación de Teléfonos:**
   * Se exige formato internacional con código de área (ej: `+58 412...` o `+1...`) mediante `isValidPhone()` antes de permitir el avance al pago en `carrito.html`.
4. **Marco Legal para Meta Ads y WhatsApp Business:**
   * Los enlaces a `politica-privacidad.html`, `terminos.html`, `devoluciones.html` y `envios.html` deben mantenerse visibles y funcionales en todos los pies de página (*footers*).
   * No elimines la cláusula de precios referenciales ni la declaración de no-venta de datos personales a terceros.

---

## 🚫 6. Lo que un Agente NUNCA Debe Hacer (Anti-Patrones)

* ❌ **NO toques la carpeta `frontend/`:** Cualquier cambio a la tienda debe hacerse estrictamente dentro de `frontend-v2/`.
* ❌ **NO instales dependencias npm en `frontend-v2/`:** No uses `npm install` ni crees un pipeline con Webpack/Vite a menos que el usuario lo solicite explícitamente.
* ❌ **NO modifiques los esquemas de `frontend-v2/data/` sin actualizar `frontend-v2/admin/config.yml`:** Romperás el CMS visual del cliente.
* ❌ **NO expongas llaves API de servicios de mensajería (como CallMeBot):** Siempre usa el enlace nativo de WhatsApp con codificación URI (`https://wa.me/584128422837?text=...`).
* ❌ **NO subas archivos pesados (videos .mp4, imágenes > 500 KB o archivos temporales) al repositorio Git:** Usa WebP optimizado y mantén el repositorio liviano para que los deploys por FTP sean rápidos.
* ❌ **NO modifiques `morsas_woo/.env` sin precaución:** Contiene credenciales activas del punto de venta físico OSPOS y WooCommerce.

---

## 📲 7. Mensaje Estándar de Pedido por WhatsApp

Cuando el carrito en [`frontend-v2/carrito.html`](file:///c:/Users/Home/Documents/tienda-golf/frontend-v2/carrito.html) genera el mensaje hacia el asesor, debe mantener esta estructura exacta:

```text
🏌️ *Nuevo Pedido — Morsa's Proshop*
━━━━━━━━━━━━━━━━━━━━
📦 Orden: *#MP-123456*

🛒 *Productos:*
  • 1x Driver TaylorMade Qi10 (Diestro | Stiff 10.5°) — Ref. 549.00
  • 2x Bolas Titleist Pro V1 (Blanco) — Ref. 110.00
-------------------------------------------
💰 Subtotal: Ref. 659.00
🚚 Envío: Gratis / Ref. 3.00
✅ *Total Estimado: Ref. 659.00*

👤 *Cliente:* Nombre Apellido
📱 *Teléfono:* +58 412 1234567
📬 *Entrega:* Retiro en Pro-Shop / Delivery Caracas
📍 *Sede / Dirección:* C.C. La Tahona / Las Mercedes, Baruta
💳 *Método de Pago:* Zelle / Pago Móvil / Efectivo Divisas USD
━━━━━━━━━━━━━━━━━━━━
💬 _Enviado desde el catálogo digital de Morsa's Proshop_
```

---

## 🚀 8. Flujo de Trabajo Recomendado para Agentes

1. **Para Cambios Visuales o Textos:** Revisa primero si el dato reside en `frontend-v2/data/` antes de editar directamente el HTML.
2. **Para Nuevas Páginas:** Asegúrate de incluir:
   * Favicon y Apple Touch Icon en `<head>`.
   * Tarjetas Open Graph completas (`og:title`, `og:image`, `og:url`, `og:description`).
   * Footer oficial con los enlaces legales (`politica-privacidad.html`, `terminos.html`, etc.).
   * Inclusión en `frontend-v2/sitemap.xml`.
3. **Para Cambios en Sincronización POS/Woo:** Trabajar dentro de `morsas_woo/api/` probando con `test_order.js` o scripts aislados en `scratch/`.
4. **Al Hacer Commit:** Usar mensajes semánticos (`feat:`, `fix:`, `style:`, `docs:`) en el repositorio Git de `frontend-v2/` (`morsassuperstore/mi-tienda-golf`).
