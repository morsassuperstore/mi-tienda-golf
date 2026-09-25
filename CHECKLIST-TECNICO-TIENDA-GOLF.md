# Checklist Técnico y Operativo de Pre-Lanzamiento — Tienda de Golf
> **Estándar de Calidad, Seguridad, Logística y Conversión para eCommerce de Equipamiento, Calzado y Ropa de Golf**
> *Documento técnico aplicable antes de publicar la tienda a internet o iniciar campañas en Meta / WhatsApp.*

---

## 📋 Resumen Ejecutivo
Una tienda online de golf se dirige a un público exigente y técnico (golfistas aficionados, profesionales y clubes). Los productos suelen tener un ticket promedio alto ($30 a $600+) y requieren **precisión en especificaciones (mano diestra/zurda, flex de varilla, loft, tallas de calzado y guante)**.

Este checklist contiene **20 puntos críticos** organizados en 5 pilares para blindar la tienda técnica, legal y comercialmente antes de abrir ventas.

---

## 🛡️ PILAR 1: Seguridad y Protección de Código

- [x] **1. Cero Secretos o Llaves API en el Frontend:**
  - *Estado:* Implementado. Eliminadas dependencias externas con claves API en cliente (CallMeBot) y verificado que `config.js` y demás scripts no expongan credenciales privadas.

- [x] **2. Certificado SSL / HTTPS Obligatorio y HSTS:**
  - *Estado:* Implementado. URLs canonical, OpenGraph, sitemap y llamadas API forzadas a `https://`.

- [x] **3. Protección Anti-Spam en Formularios y Cotizaciones (Honeypot):**
  - *Estado:* Implementado. Campo invisible `website_hp` incorporado en el checkout y validado silenciosamente en JavaScript.

- [x] **4. Validación Rigurosa de Teléfonos y Formato Internacional:**
  - *Estado:* Implementado. Función `isValidPhone()` exigiendo formato internacional (+58, +1, etc.) y descartando números incompletos con mensajes de ayuda específicos.

---

## 🏌️‍♂️ PILAR 2: Especificaciones Técnicas de Golf y Catálogo

- [x] **5. Matriz de Variantes Claras (Sin Ambigüedades):**
  - *Estado:* Implementado. Soporte en catálogo para atributos deportivos (Flex, Loft, Mano diestra/zurda, Tallas) reflejándose en el título de cada ítem del carrito.

- [x] **6. Formateo Preciso del Mensaje de WhatsApp:**
  - *Estado:* Implementado. Generador de mensajes `buildWhatsAppMessage()` estructurado con emojis deportivos (🏌️), lista clara de artículos con especificaciones, desglose de montos, sede/dirección y método de pago.

- [x] **7. Fotos Reales y Compresión WebP (< 120 KB):**
  - *Estado:* Implementado. Compatibilidad y soporte de formatos `.webp` y carga responsive.

- [x] **8. Textos Alternativos (`alt`) Descriptivos para SEO:**
  - *Estado:* Implementado en logos, tarjetas de producto y vistas de detalle.

---

## ⚖️ PILAR 3: Marco Legal y Políticas de Comercio (Aprobación Meta)

- [x] **9. Política de Privacidad y Protección de Datos:**
  - *Estado:* Implementado. Creada página dedicada `politica-privacidad.html` adaptada a Meta Ads y WhatsApp Business API, con declaración de no-venta de datos a terceros y uso exclusivo deportivo.

- [x] **10. Términos de Compra, Cotizaciones y Mostrador:**
  - *Estado:* Implementado. Creada página dedicada `terminos.html` con la cláusula obligatoria de precios referenciales en USD, confirmación vía WhatsApp y condiciones de venta.

- [x] **11. Políticas de Cambio de Tallas y Garantías de Equipamiento:**
  - *Estado:* Implementado. `devoluciones.html` actualizado con política de 15 días para textiles/calzado y especificación clara de cobertura de defectos de fábrica de palos/raquetas vs. exclusión de "sky marks" o golpes fuera de cara.

- [x] **12. Transparencia sobre Cookies y Carrito Local:**
  - *Estado:* Implementado. Notificación en política y footers de que el carrito opera vía `localStorage` sin seguimiento invasivo.

---

## 📱 PILAR 4: Redes Sociales, WhatsApp y Branding

- [x] **13. Tarjeta Open Graph Atractiva para WhatsApp:**
  - *Estado:* Implementado en `index.html`, `tienda.html`, `politica-privacidad.html`, `terminos.html`, `nosotros.html`.

- [x] **14. Favicon y Apple Touch Icon para Acceso Directo:**
  - *Estado:* Implementado en todas las páginas para acceso directo en smartphones.

- [x] **15. Botones de WhatsApp Verificados con Número Internacional:**
  - *Estado:* Implementado y unificado con el canal internacional `+58 412 842 2837`.

---

## ⚡ PILAR 5: Logística, Medios de Pago y Experiencia de Usuario

- [x] **16. Métodos de Pago Claros en el Checkout:**
  - *Estado:* Implementado. Desglose detallado de Zelle, Pago Móvil (tasa BCV), Dólares en efectivo en Pro-Shop/mostrador, Stripe y USDT.

- [x] **17. Opciones de Entrega y Embalaje Especializado:**
  - *Estado:* Implementado. Selección de sede para retiro en Pro-Shop (La Tahona, La Lagunita, Izcaragua) y políticas de embalaje tubular reforzado en `envios.html` y `terminos.html`.

- [x] **18. Velocidad Móvil en Conexión 4G (< 1 Segundo):**
  - *Estado:* Implementado. Código vanilla JS sin librerías pesadas, respuesta inmediata.

- [x] **19. Touch Targets Móviles Cómodos (44x44 px mínimo):**
  - *Estado:* Implementado en botones flotantes, selectores de talla y CTAs de compra.

- [x] **20. Cero Afirmaciones Falsas y Transparencia de Stock:**
  - *Estado:* Implementado. Transparencia sobre confirmación final de apartado e inventario con el asesor de la tienda.

---

## 🚀 Hoja de Ruta de Lanzamiento (Progreso)
1. [x] **Paso A — Auditoría de Código y Head:** OpenGraph, favicons, honeypot y limpieza de credenciales privadas completada.
2. [x] **Paso B — Carga de Catálogo y Variantes:** Mensaje de WhatsApp formateado con matriz de variantes deportivas y validación internacional de teléfonos.
3. [x] **Paso C — Publicación de Políticas:** Páginas de Privacidad, Términos y Garantías activas y enlazadas en todos los pies de página del sitio y sitemap.xml.
