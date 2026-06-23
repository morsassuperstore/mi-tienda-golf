/**
 * Gestión del carrito de compras en LocalStorage
 */
const Cart = {
    items: [],

    init: () => {
        const stored = localStorage.getItem('morsa_cart');
        if (stored) {
            Cart.items = JSON.parse(stored);
        }
        Cart.updateBadge();
    },

    save: () => {
        localStorage.setItem('morsa_cart', JSON.stringify(Cart.items));
        Cart.updateBadge();
    },

    add: (product_id, title, price, image, variation_id = 0, attributes = {}) => {
        // Buscar si ya existe en el carrito
        const index = Cart.items.findIndex(i => i.product_id === product_id && i.variation_id === variation_id);
        
        if (index > -1) {
            Cart.items[index].quantity += 1;
        } else {
            Cart.items.push({
                product_id,
                variation_id,
                title,
                price: parseFloat(price),
                image,
                attributes,
                quantity: 1
            });
        }
        Cart.save();
        alert('¡Agregado al carrito!');
    },

    remove: (product_id, variation_id = 0) => {
        Cart.items = Cart.items.filter(i => !(i.product_id === product_id && i.variation_id === variation_id));
        Cart.save();
    },

    updateQuantity: (product_id, variation_id, quantity) => {
        const item = Cart.items.find(i => i.product_id === product_id && i.variation_id === variation_id);
        if (item) {
            item.quantity = Math.max(1, parseInt(quantity));
            Cart.save();
        }
    },

    getTotal: () => {
        return Cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    clear: () => {
        Cart.items = [];
        Cart.save();
    },

    updateBadge: () => {
        const badges = document.querySelectorAll('.cart-badge');
        const count = Cart.items.reduce((total, item) => total + item.quantity, 0);
        badges.forEach(b => {
            b.innerText = count;
            b.style.display = count > 0 ? 'flex' : 'none';
        });
    }
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', Cart.init);
