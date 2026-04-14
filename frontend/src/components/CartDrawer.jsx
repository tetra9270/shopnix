import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Crown, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQty, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="cart-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                    >
                        {/* Header */}
                        <div className="cart-drawer-header">
                            <div className="cart-drawer-title">
                                <Crown size={18} />
                                <span>Royal Bag</span>
                                {cartCount > 0 && (
                                    <span className="cart-count-badge">{cartCount}</span>
                                )}
                            </div>
                            <button className="cart-close-btn" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="cart-divider" />

                        {/* Empty State */}
                        {cartItems.length === 0 ? (
                            <div className="cart-empty">
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                >
                                    <ShoppingBag size={56} strokeWidth={1} />
                                </motion.div>
                                <h3>Your bag is empty</h3>
                                <p>Add some royal pieces to begin your journey</p>
                                <button className="cart-shop-btn" onClick={onClose}>
                                    Start Shopping
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Items */}
                                <div className="cart-items-list">
                                    <AnimatePresence>
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.itemKey}
                                                className="cart-item"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                                                layout
                                            >
                                                {/* Product Image */}
                                                <div className="cart-item-img">
                                                    <img src={item.image || '/placeholder.png'} alt={item.name} />
                                                </div>

                                                {/* Product Info */}
                                                <div className="cart-item-details">
                                                    <h4 className="cart-item-name">{item.name}</h4>
                                                    <div className="cart-item-meta">
                                                        {item.size && <span className="cart-tag">Size: {item.size}</span>}
                                                        {item.color && <span className="cart-tag">{item.color}</span>}
                                                    </div>
                                                    <div className="cart-item-bottom">
                                                        {/* Qty Controls */}
                                                        <div className="cart-qty-controls">
                                                            <button
                                                                className="qty-btn"
                                                                onClick={() => updateQty(item.itemKey, item.qty - 1)}
                                                            >
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="qty-value">{item.qty}</span>
                                                            <button
                                                                className="qty-btn"
                                                                onClick={() => updateQty(item.itemKey, item.qty + 1)}
                                                            >
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>
                                                        {/* Price */}
                                                        <span className="cart-item-price">
                                                            ₹{(item.price * item.qty).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    className="cart-remove-btn"
                                                    onClick={() => removeFromCart(item.itemKey)}
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Footer */}
                                <div className="cart-drawer-footer">
                                    <div className="cart-total-row">
                                        <span>Total</span>
                                        <span className="cart-total-amount">₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <p className="cart-shipping-note">✦ Free delivery on orders above ₹999</p>
                                    <button className="cart-checkout-btn" onClick={() => { onClose(); navigate('/checkout'); }}>
                                        <Crown size={16} />
                                        Proceed to Checkout
                                        <ArrowRight size={16} />
                                    </button>
                                    <button className="cart-continue-btn" onClick={onClose}>
                                        Continue Shopping
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
