import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Check, Star, Package, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/helpers';
import './QuickView.css';

const QuickView = ({ product, isOpen, onClose }) => {
    const [selectedQty, setSelectedQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [activeImg, setActiveImg] = useState(0);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ ...product, id: product._id || product.id }, selectedQty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (!isOpen || !product) return null;

    // Build the image gallery from product.images[] or fall back to product.image
    const allImages = (product.images && product.images.length > 0)
        ? product.images
        : [product.image].filter(Boolean);

    const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
    const hasDiscount = product.discountPrice > 0 && product.discountPrice < product.price;
    const discountPct = hasDiscount
        ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
        : 0;

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

                    {/* Image Column */}
                    <div className="quick-view-image-column">
                        <div className="quick-view-main-img">
                            <img
                                src={getImageUrl(allImages[activeImg])}
                                alt={product.name}
                            />
                            {hasDiscount && (
                                <div className="qv-discount-badge">-{discountPct}%</div>
                            )}
                        </div>
                        {allImages.length > 1 && (
                            <div className="quick-view-thumbs">
                                {allImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={getImageUrl(img)}
                                        alt={`${product.name} ${idx + 1}`}
                                        className={`qv-thumb ${activeImg === idx ? 'active' : ''}`}
                                        onClick={() => setActiveImg(idx)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Column */}
                    <div className="quick-view-info-column">
                        <span className="quick-view-category">{product.category || 'Premium Makhana'}</span>
                        <h2 className="quick-view-title">{product.name}</h2>

                        {/* Stars */}
                        <div className="qv-stars">
                            {[1,2,3,4,5].map(s => (
                                <Star key={s} size={14} fill={s <= 4 ? 'var(--primary-color)' : 'none'} color="var(--primary-color)" />
                            ))}
                            <span className="qv-rating-text">4.0 (128 reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="quick-view-price-container">
                            <span className="quick-view-price">₹{displayPrice?.toLocaleString()}</span>
                            {hasDiscount && (
                                <span className="quick-view-original-price">₹{product.price?.toLocaleString()}</span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="quick-view-description">
                            {product.description || 'A premium quality Makhana product, slow-roasted in small batches with natural spices and zero preservatives. A healthy, delicious snack for the whole family.'}
                        </p>

                        {/* Stock info */}
                        <div className="qv-stock-row">
                            <Package size={15} />
                            {product.countInStock > 0
                                ? <span className="qv-in-stock">In Stock ({product.countInStock} available)</span>
                                : <span className="qv-out-stock">Out of Stock</span>
                            }
                        </div>

                        {/* Key Benefits */}
                        <div className="qv-benefits">
                            <div className="qv-benefit"><Leaf size={14} /> 100% Natural</div>
                            <div className="qv-benefit"><Leaf size={14} /> Zero Preservatives</div>
                            <div className="qv-benefit"><Leaf size={14} /> Slow Roasted</div>
                        </div>

                        {/* Quantity */}
                        <div className="qv-qty-row">
                            <span className="qv-qty-label">Quantity:</span>
                            <div className="qv-qty-controls">
                                <button
                                    className="qv-qty-btn"
                                    onClick={() => setSelectedQty(q => Math.max(1, q - 1))}
                                >−</button>
                                <span className="qv-qty-val">{selectedQty}</span>
                                <button
                                    className="qv-qty-btn"
                                    onClick={() => setSelectedQty(q => Math.min(product.countInStock || 10, q + 1))}
                                >+</button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="quick-view-actions">
                            <button
                                className="btn qv-add-btn"
                                onClick={handleAddToCart}
                                disabled={product.countInStock === 0}
                                style={{ background: added ? '#5a7a5a' : '' }}
                            >
                                {added
                                    ? <><Check size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Added!</>
                                    : <><ShoppingBag size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />Add to Bag</>
                                }
                            </button>
                            <button className="btn btn-outline qv-wish-btn">
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
