import React, { createContext, useContext, useState, useEffect } from 'react';
import LoginPrompt from '../components/LoginPrompt';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('shahiAdaaCart');
        return saved ? JSON.parse(saved) : [];
    });
    const [loginPromptOpen, setLoginPromptOpen] = useState(false);

    // Persist cart to localStorage
    useEffect(() => {
        localStorage.setItem('shahiAdaaCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, qty = 1, size = '', color = '') => {
        // 🔐 Check if user is logged in first
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo || userInfo === 'undefined') {
            // Show beautiful login prompt popup
            setLoginPromptOpen(true);
            return;
        }

        const itemKey = `${product.id || product._id}-${size}-${color}`;

        setCartItems(prev => {
            const existingItem = prev.find(item => item.itemKey === itemKey);
            if (existingItem) {
                return prev.map(item =>
                    item.itemKey === itemKey
                        ? { ...item, qty: item.qty + qty }
                        : item
                );
            }
            return [...prev, {
                itemKey,
                product: product.id || product._id || String(product.id),
                name: product.name || product.title,
                image: product.image || product.images?.[0] || '',
                price: parseFloat(String(product.price).replace(/[^0-9.]/g, '')),
                qty,
                size,
                color
            }];
        });
    };

    const removeFromCart = (itemKey) => {
        setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
    };

    const updateQty = (itemKey, qty) => {
        if (qty <= 0) {
            removeFromCart(itemKey);
            return;
        }
        setCartItems(prev =>
            prev.map(item => item.itemKey === itemKey ? { ...item, qty } : item)
        );
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('shahiAdaaCart');
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQty,
            clearCart,
            cartTotal,
            cartCount,
            loginPromptOpen,
            setLoginPromptOpen
        }}>
            {children}
            <LoginPrompt
                isOpen={loginPromptOpen}
                onClose={() => setLoginPromptOpen(false)}
            />
        </CartContext.Provider>
    );
};
