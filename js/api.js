/**
 * Servicios de comunicación con la API de WooCommerce
 */
const API = {
    // Helper para obtener URL de imagen de tarjeta nítida pero optimizada (~600px para Retina en vez del original 1500px+)
    getCardImageUrl: (imgObj) => {
        if (!imgObj) return 'https://via.placeholder.com/400';
        if (imgObj.srcset) {
            const parts = imgObj.srcset.split(',').map(s => s.trim());
            const match600 = parts.find(p => p.includes('600w'));
            if (match600) return match600.split(' ')[0];
            const match768 = parts.find(p => p.includes('768w'));
            if (match768) return match768.split(' ')[0];
        }
        return imgObj.src || 'https://via.placeholder.com/400';
    },

    // Obtener productos (con caché en sessionStorage por 5 minutos)
    getProducts: async (category = null, forceRefresh = false) => {
        let url = `${CONFIG.API_URL}${CONFIG.WC_STORE_API}/products?per_page=100`;
        if (category) {
            url += `&category=${category}`;
        }

        const cacheKey = `morsa_products_${category || 'all'}`;
        const cacheTimeKey = `${cacheKey}_time`;
        const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

        if (!forceRefresh) {
            try {
                const cachedData = sessionStorage.getItem(cacheKey);
                const cachedTime = sessionStorage.getItem(cacheTimeKey);
                if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime, 10) < CACHE_TTL_MS)) {
                    return JSON.parse(cachedData);
                }
            } catch (e) {
                // Fallback silencioso si sessionStorage está bloqueado
            }
        }
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al cargar productos');
            const data = await response.json();
            try {
                if (Array.isArray(data) && data.length > 0) {
                    sessionStorage.setItem(cacheKey, JSON.stringify(data));
                    sessionStorage.setItem(cacheTimeKey, Date.now().toString());
                }
            } catch (e) {}
            return data;
        } catch (error) {
            console.error('API Error:', error);
            try {
                const stale = sessionStorage.getItem(cacheKey);
                if (stale) return JSON.parse(stale);
            } catch (e) {}
            return { error: true, message: 'No se pudo conectar con el servidor de la tienda.' };
        }
    },

    // Crear pedido y generar link de pago (o procesar pago manual)
    submitCheckout: async (checkoutData) => {
        const url = `${CONFIG.API_URL}${CONFIG.MORSA_API}/checkout-link`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkoutData)
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error en el checkout');
            return data;
        } catch (error) {
            console.error('Checkout Error:', error);
            throw error;
        }
    }
};
