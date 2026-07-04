const CONFIG = {
    API_URL: 'http://localhost:8080/wp-json',
    WC_STORE_API: '/wc/store/v1',
    MORSA_API: '/morsa/v1',
    // Las credenciales OAuth ya no son estrictamente necesarias para leer productos si usamos el Store API,
    // pero las dejamos por si las necesitas para endpoints de admin en el futuro.

    // Listado de marcas en el carrusel de inicio.
    // Para agregar una marca, sube el logo a 'assets/' y añádela aquí.
    BRANDS: [
        { name: 'Greg Norman', logo: 'assets/extracted_img_7.png' },
        { name: 'Mizuno', logo: 'assets/extracted_img_8.png' },
        { name: 'Callaway', logo: 'assets/extracted_img_9.png' },
        { name: 'Wilson', logo: 'assets/extracted_img_10.webp' },
        { name: 'New Balance', logo: 'assets/extracted_img_11.png' },
        { name: 'Ping', logo: 'assets/extracted_img_12.jpg' },
        { name: 'Nippon Shaft', logo: 'assets/extracted_img_13.jpg' },
        { name: 'Big Max', logo: 'assets/bigmax.png' }
    ]
};
