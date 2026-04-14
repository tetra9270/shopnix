import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './QuickView.css';

const QuickView = ({ product, isOpen, onClose }) => {
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(0);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const colorName = colors[selectedColor]?.name || '';
        addToCart({ ...product, id: product._id || product.id }, 1, selectedSize, colorName);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    // Mock colors for the swatch feature
    const colors = [
        { name: 'Original', hex: 'transparent', current: true }, // The original image color
        { name: 'Rose', hex: '#d49a89', current: false },
        { name: 'Plum', hex: '#4a2c40', current: false }
    ];

    if (!isOpen || !product) return null;

    return (
        <AnimatePresence>
            <div className="quick-view-overlay" onClick={onClose}>
                <motion.div
                    className="quick-view-modal"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="quick-view-close" onClick={onClose} aria-label="Close">
                        <X size={20} />
                    </button>

                    <div className="quick-view-image-column">
                        <img src={product.image} alt={product.name} />
                    </div>

                    <div className="quick-view-info-column">
                        <span className="quick-view-category">{product.category || 'Premium Collection'}</span>
                        <h2 className="quick-view-title">{product.name}</h2>

                        <div className="quick-view-price-container">
                            <span className="quick-view-price">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="quick-view-original-price">₹{product.originalPrice}</span>
                            )}
                        </div>

                        <p className="quick-view-description">
                            Experience the perfect blend of comfort and elegance. Crafted with premium, breathable fabric designed specifically for all-day wear on campus or at festive celebrations. Features reinforced stitching for durability.
                        </p>

                        <div className="quick-view-options">
                            <h4 className="quick-view-section-title">Color: {colors[selectedColor].name}</h4>
                            <div className="color-swatches">
                                {colors.map((color, idx) => (
                                    <div
                                        key={idx}
                                        className={`color-swatch ${selectedColor === idx ? 'active' : ''}`}
                                        style={{
                                            backgroundColor: color.hex === 'transparent' ? '#f4eee9' : color.hex,
                                            backgroundImage: color.hex === 'transparent' ? `url(${product.image})` : 'none',
                                            backgroundSize: 'cover'
                                        }}
                                        onClick={() => setSelectedColor(idx)}
                                        title={color.name}
                                    />
                                ))}
                            </div>

                            <h4 className="quick-view-section-title">Size</h4>
                            <div className="size-selector">
                                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="quick-view-actions">
                            <button className="btn" onClick={handleAddToCart} style={{ background: added ? '#5a7a5a' : '' }}>
                                {added
                                    ? <><Check size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Added!</>
                                    : <><ShoppingBag size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Add to Bag</>
                                }
                            </button>
                            <button className="btn btn-outline" style={{ padding: '0 20px' }}>
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickView;
