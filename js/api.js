/**
 * Servicios de comunicación con la API de WooCommerce
 */
const API = {
    // Obtener productos
    getProducts: async (category = null) => {
        let url = `${CONFIG.API_URL}${CONFIG.WC_STORE_API}/products?per_page=100`;
        if (category) {
            // Nota: Para filtrar por categoría, WooCommerce Store API usa ?category=ID
            // Por simplicidad en la demo, podríamos cargar todos y filtrar en el frontend,
            // o mapear el slug de categoría a su ID.
            url += `&category=${category}`;
        }
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error al cargar productos');
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return [];
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
