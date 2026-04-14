/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuickView from './QuickView';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quickViewOpen, setQuickViewOpen] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart({ ...product, id: product._id }, 1);
    };

    const openQuickView = (product) => {
        setSelectedProduct(product);
        setQuickViewOpen(true);
    };

    useEffect(() => {
        // Placeholder fetching data. We will fetch from backend later.
        const demoProducts = [
            { _id: '1', name: 'Classic Himalayan Salted', price: 299, category: 'Classic', image: '/images/img1.jpeg' },
            { _id: '2', name: 'Peri Peri Spicy Fox Nuts', price: 329, category: 'Spicy', image: '/images/img2.jpeg' },
            { _id: '3', name: 'Butter & Herbs Fox Nuts', price: 349, category: 'Premium', image: '/images/img3.jpeg' },
            { _id: '4', name: 'Caramel Bliss Fox Nuts', price: 379, category: 'Sweet', image: '/images/img4.jpeg' },
        ];
        setProducts(demoProducts);
    }, []);

    return (
        <section className="products-section" id="collections">
            <div className="container">
                <div className="section-header">
                    <h2 className="title-gradient">Our Best Flavours</h2>
                    <p>Roasted in small batches. Packed with goodness. Loved by all.</p>
                </div>

                <div className="products-grid">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            className="product-card glass-panel"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="overlay-actions">
                                    <button className="icon-btn-round" onClick={() => handleAddToCart(product)} title="Add to Cart"><ShoppingCart size={18} /></button>
                                    <button className="icon-btn-round" onClick={() => openQuickView(product)} title="Quick View"><Eye size={18} /></button>
                                </div>
                            </div>
                            <div className="product-info">
                                <span className="product-category">{product.category}</span>
                                <h3>{product.name}</h3>
                                <p className="product-price">₹{product.price}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <QuickView
                product={selectedProduct}
                isOpen={quickViewOpen}
                onClose={() => setQuickViewOpen(false)}
            />
        </section>
    );
};

export default ProductList;
