# Guía para Cambiar y Administrar las Imágenes de la Web

Esta guía explica de forma muy sencilla cómo puedes cambiar las fotos y logotipos de tu sitio web sin necesidad de tocar el código HTML de las páginas.

---

## Método 1: Reemplazar por Nombre Fijo (Fotos individuales)

Para cambiar las imágenes principales del sitio, **no necesitas editar ningún código**. Simplemente sube tu nueva imagen a la carpeta `assets/` reemplazando el archivo actual (asegúrate de que tenga exactamente el mismo nombre y extensión `.jpg` o `.png`).

Aquí tienes el listado de imágenes y el nombre con el que debes guardarlas:

### 1. Cabecera (Video Principal)
- **Video de fondo:** Guardar como `assets/hero-video.mp4`
- **Imagen de portada (cuando el video no carga/móvil):** Guardar como `assets/extracted_img_1.jpg`

### 2. Tarjetas de Deporte (Sección "Compra por Deporte")
- **Foto de Golf:** Guardar como `assets/card-golf`
- **Foto de Pádel:** Guardar como `assets/card-padel`
- **Foto de Tenis:** Guardar como `assets/card-tenis`

### 3. Simulador de Swing (Sección Promocional)
- **Imagen del simulador:** Guardar como `assets/simulador-golf`

### 4. Destacados del Menú (Megamenús desplegables)
- **Imagen del menú Golf:** Guardar como `assets/destacado-golf`
- **Imagen del menú Pádel:** Guardar como `assets/destacado-padel`
- **Imagen del menú Tenis:** Guardar como `assets/destacado-tenis`

> [!IMPORTANT]
> **Detección Automática de Formato:** ¡Ya no tienes que preocuparte por si la imagen es `.jpg`, `.webp`, `.png` o `.jpeg`! El sistema está programado para **detectar el formato automáticamente**. Solo asegúrate de guardar la imagen con el nombre exacto indicado arriba (ej. `simulador-golf`) y el sitio web encontrará la extensión correcta por sí solo sin que rompa el diseño.

> [!TIP]
> Para lograr el mejor rendimiento y velocidad de carga en la web, se recomienda optimizar el tamaño de las imágenes antes de subirlas (utilizando herramientas gratuitas como *TinyPNG* o guardándolas en formato WebP/JPG progresivo).

---

## Método 2: Carrusel de Marcas (Configuración en JavaScript)

El carrusel de logotipos de marcas que se desliza automáticamente en la página de inicio se carga desde una lista en el archivo `js/config.js`. Esto te permite añadir, quitar o reordenar marcas de forma muy dinámica.

### Pasos para añadir una nueva marca al carrusel:

1. **Sube el logo de la marca** a la carpeta `assets/` (ej. `assets/adidas.png`). Se recomienda que el logo tenga fondo transparente (formato `.png` o `.webp`).
2. **Abre el archivo** [config.js](file:///c:/Users/Home/Documents/tienda-golf/frontend-v2/js/config.js) en un editor de texto.
3. Busca la lista `BRANDS` y añade tu nueva marca al final de la lista respetando el formato:

```javascript
    BRANDS: [
        { name: 'Greg Norman', logo: 'assets/extracted_img_7.png' },
        { name: 'Mizuno', logo: 'assets/extracted_img_8.png' },
        ...
        { name: 'Adidas', logo: 'assets/adidas.png' } // <-- Añade esta línea al final
    ]
```

4. Guarda el archivo y listo. El carrusel se encargará automáticamente de duplicar el logo para que el efecto de marquesina infinita siga funcionando de forma perfecta.

### Pasos para quitar una marca:
Simplemente elimina la línea correspondiente del archivo [config.js](file:///c:/Users/Home/Documents/tienda-golf/frontend-v2/js/config.js) y guarda el archivo.
