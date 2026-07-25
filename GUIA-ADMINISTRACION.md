# 📘 Guía de Administración Visual (Decap CMS) — Morsa's Proshop

Esta guía explica paso a paso cómo administrar las imágenes, textos, promociones, sucursales y datos de pago de la página web de **Morsa's Proshop** de forma fácil, segura y visual sin necesidad de programar ni tocar código.

---

## 1. Cómo acceder al Panel de Administración

1. Entra a la ruta de administración de tu sitio web:
   * **Entorno de Pruebas:** `https://dev.morsasgolf.com/admin/`
   * **Producción:** `https://morsasgolf.com/admin/`
2. Haz clic en el botón **"Login with GitHub"**.
3. Inicia sesión con la cuenta autorizada. ¡Listo! Se abrirá el panel visual.

---

## 2. ¿Qué puedes modificar desde el Panel Visual?

Dentro del panel encontrarás la sección **"Página de Inicio"**. Al hacer clic, podrás editar los siguientes bloques:

### 📢 A. Barra de Anuncio Superior
* **Uso:** Cambiar la cinta de texto que aparece en la parte superior de toda la web.
* **Ejemplo:** `Envío gratis en pedidos mayores de Ref.100 · Usa el código MORSA10 para 10% de descuento`.

### 🖼️ B. Banners Principales (Carrusel Hero)
* **Uso:** Cambiar las imágenes promocionales grandes de la portada.
* **Campos:**
  * `Imagen de Banner`: Foto principal para computadoras.
  * `Imagen para Móviles`: (Opcional) Foto optimizada en formato vertical/cuadrado para teléfonos.
  * `Enlace`: A qué página o categoría lleva cuando el cliente hace clic (ej. `tienda.html`).

### 🎾 C. Sección "Compra por Deporte"
* **Uso:** Cambiar las fotos de portada y textos de los bloques de **Golf**, **Pádel** y **Tenis**.
* **Ejemplo:** Editar `200+ productos · Equipos y Ropa` o subir la nueva foto promocional de Pádel.

### 🏌️ D. Sección Simulador de Swing
* **Uso:** Actualizar la foto del simulador en La Tahona, los títulos, la descripción y el enlace de reserva de WhatsApp.

### 📍 E. Sucursales (¿Dónde Estamos?)
* **Uso:** Administrar la información de las sedes (La Tahona, La Lagunita, Izcaragua).
* **Campos:** Nombre, dirección, horario de atención, enlace a Google Maps y mapa interactivo.

### 💳 F. Configuración de Pagos (Zelle)
* **Uso:** Modificar la dirección de correo electrónico de Zelle para que se actualice instantáneamente en la pantalla final de pago del carrito.

### 🍔 G. Destacados del Menú Desplegable
* **Uso:** Cambiar la imagen, el título y el producto promocional que se muestra dentro de los menús navegables de Golf, Pádel y Tenis.

### 🏷️ H. Logotipos de Marcas (Loop Infinito)
* **Uso:** Administrar el listado de marcas patrocinadas/distribuidas en el banner de logotipos que se desliza continuamente en la portada y en "Sobre Nosotros". Puedes añadir nuevas marcas, reordenarlas arrastrándolas, editarlas o borrarlas.
* **Campos:** Nombre de la marca y Logotipo de la marca (se recomienda imagen en formato `.png` o `.webp` con fondo transparente).

### 👫 I. Sección "Colecciones por Género"
* **Uso:** Cambiar las imágenes de portada de las tarjetas de **Caballeros** y **Damas** de la página de inicio.
* **Campos:** Imagen de portada Caballeros e Imagen de portada Damas (se recomiendan fotos verticales o cuadradas).

---

## 3. Consejos para Subir Imágenes (Recomendaciones de Formato)

Para mantener la página web rápida y con excelente calidad visual:

1. **Formatos soportados:** Puedes subir fotos en `.webp`, `.png`, `.jpg` o `.jpeg`. (Se recomienda `.webp` o `.jpg`).
2. **Tamaño de archivo:** Procura que las fotos no pesen más de **300 KB**. Puedes optimizarlas gratis antes de subirlas en [TinyPNG.com](https://tinypng.com).
3. **Fondo transparente:** Para los logos de marcas o imágenes como el simulador, se recomienda usar formato `.png` o `.webp` con fondo transparente.

4. **Enlaces de WhatsApp:** En el campo de enlace para reservar el simulador (o cualquier botón de contacto), puedes escribir el texto del mensaje con **espacios normales y acentos** (ej: `https://wa.me/584128422837?text=Hola, me gustaría agendar un turno`). No es necesario escribir `%20` ni códigos complejos; el navegador del usuario se encargará de traducirlos automáticamente al hacer clic. *Nota: Asegúrate de que el enlace comience correctamente con `https://` y no tenga textos basura adelante (como `ulador.https://...`)*.

---

## 4. Método Alternativo / Respaldo Manual (Vía cPanel o FTP)

Si por alguna razón no tienes acceso al panel visual o necesitas hacer un cambio técnico masivo:

1. **Vía Datos (`data/home.json`):**
   Todos los datos editables del panel se guardan en un solo archivo plano: `frontend-v2/data/home.json`. Puedes abrirlo con cualquier editor de texto o desde el Administrador de Archivos de cPanel para modificar valores directamente.

2. **Vía Reemplazo Directo de Fotos (`assets/`):**
   Las imágenes principales también mantienen nombres estándar en la carpeta `assets/` como respaldo:
   * `card-golf` / `card-padel` / `card-tenis`
   * `destacado-golf` / `destacado-padel` / `destacado-tenis`
   * `simulador-golf`
   * `gender-men` / `gender-women`

---

## 5. Cómo cambiar el Símbolo de Moneda (Configuración)

Tanto el sitio web (Front-End) como el conector de WordPress (Back-End) están preparados para que puedas cambiar el símbolo de moneda de forma centralizada sin tener que buscar e ir alterando código manual en las plantillas HTML:

### A. Cambiar en el Front-End (Sitio Web)
1. Abre el archivo `frontend-v2/js/config.js` en tu editor o administrador de archivos de cPanel.
2. Localiza la propiedad `CURRENCY_SYMBOL` en el objeto `CONFIG` (por ejemplo, en la línea 5):
   ```javascript
   CURRENCY_SYMBOL: 'Ref.',
   ```
3. Cambia `'Ref.'` por el nuevo símbolo que desees (ej: `'€'` o `'$'`) y guarda el archivo. Todos los productos, el carrito y los cálculos usarán el nuevo símbolo de forma automática.

### B. Cambiar en el Back-End (WordPress / WooCommerce)
1. Abre el archivo de plugin `morsa-headless-connector/morsa-headless-connector.php` en tu cPanel.
2. Al final del archivo verás la sección de configuración de moneda. Modifica las siguientes constantes según lo requieras:
   ```php
   // Símbolo personalizado a mostrar (Ej: 'Ref.', '€', '$')
   define( 'MORSA_CUSTOM_SYMBOL', 'Ref.' );

   // ¿Forzar este símbolo en todas las monedas de WooCommerce?
   // true  = Muestra MORSA_CUSTOM_SYMBOL siempre (ej: muestra "Ref." aunque WooCommerce esté configurado internamente en Euros).
   // false = Usa el símbolo de WooCommerce normal según la moneda activa en tu panel de WordPress.
   define( 'MORSA_FORCE_CUSTOM_SYMBOL', true );
   ```
3. Guarda el archivo. Si cambiaste la opción de forzar a `false`, puedes ir al panel de WordPress, a **WooCommerce -> Ajustes -> General**, y elegir la moneda nativa de tu preferencia (Euro, USD, o la moneda personalizada "Referencia" que este plugin registra automáticamente).
4. Recuerda limpiar la caché de WordPress (como LiteSpeed Cache) y de tu navegador para que los cambios se hagan visibles.

---

*Desarrollado para Morsa's Proshop — 2026*
