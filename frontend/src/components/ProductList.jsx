/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import QuickView from './QuickView';
import API from '../services/api';
import { getImageUrl } from '../utils/helpers';
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
        const fetchProducts = async () => {
            try {
                const { data } = await API.get('/api/products');
                // Only show a few products on home page, e.g., first 4
                setProducts(data.slice(0, 4));
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
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
                                <img src={getImageUrl(product.image)} alt={product.name} className="product-image" />
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
