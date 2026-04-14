import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Instagram, Check } from 'lucide-react';
import QuickView from './QuickView';
import './NewArrivals.css'; // Requires custom styles for the masonry lookbook
import './CollectionPage.css'; // Reusing some base styles

const newArrivalsData = [
    {
        _id: 'na1',
        name: 'Classic Himalayan Salted',
        price: 299,
        category: 'Bestseller',
        image: '/images/img1.jpeg',
        hoverImage: '/images/img2.jpeg',
        description: 'Lightly roasted fox nuts with a perfect sprinkle of Himalayan pink salt. Clean, crunchy, and absolutely addictive.',
        isLarge: true
    },
    {
        _id: 'na2',
        name: 'Peri Peri Spicy Fox Nuts',
        price: 329,
        category: 'Spicy',
        image: '/images/img2.jpeg',
        hoverImage: '/images/img3.jpeg'
    },
    {
        _id: 'na3',
        name: 'Butter & Herbs Fox Nuts',
        price: 349,
        category: 'Premium',
        image: '/images/img3.jpeg',
        hoverImage: '/images/img4.jpeg'
    },
    {
        _id: 'na4',
        name: 'Caramel Bliss Fox Nuts',
        price: 379,
        category: 'Sweet',
        image: '/images/img4.jpeg',
        hoverImage: '/images/img5.jpeg'
    },
    {
        _id: 'na5',
        name: 'Cheese & Onion Fox Nuts',
        price: 349,
        category: 'Savory',
        image: '/images/img5.jpeg',
        hoverImage: '/images/img1.jpeg'
    }
];

const NewArrivals = () => {
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="new-arrivals-page">
            {/* Cinematic Hero Header */}
            <div className="new-arrivals-hero">
                <motion.div
                    className="new-arrivals-header-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1>Fresh Drop</h1>
                    <p>NEW FLAVOURS | LIMITED STOCK</p>
                </motion.div>
            </div>

            <div className="container" style={{ paddingBottom: '80px' }}>
                <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '20px' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'var(--text-main)' }}>Freshly Roasted. Just For You.</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '15px auto' }}>Be the first to try our latest fox nut flavours. Small batch, big taste. Limited quantities available.</p>
                </div>

                {/* Magazine-Style Lookbook Grid */}
                <div className="lookbook-grid">
                    {newArrivalsData.map((product, index) => (
                        <motion.div
                            key={product._id}
                            className="lookbook-item"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onClick={() => setQuickViewProduct(product)}
                        >
                            <img src={product.image} alt={product.name} />
                            <div className="lookbook-overlay">
                                <h3>{product.name}</h3>
                                <span className="price">₹{product.price}</span>
                                <button className="shop-btn">
                                    <ShoppingBag size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'text-bottom' }} />
                                    Quick Shop
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Premium Fabric Spotlight Section */}
            <div className="fabric-spotlight">
                <motion.div
                    className="fabric-content"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h3>Why Fox Nuts?</h3>
                    <p>Fox Nuts (Makhana) are India's ancient superfood, now reimagined as a modern premium snack. We source the finest lotus seeds from Bihar, slow-roast them in small batches, and season them with bold, exciting flavours.</p>

                    <div className="fabric-features">
                        <div className="fabric-feature-item"><Check color="#F8E7CD" /> 100% Natural & Preservative Free</div>
                        <div className="fabric-feature-item"><Check color="#F8E7CD" /> High Protein, Low Calorie Superfood</div>
                        <div className="fabric-feature-item"><Check color="#F8E7CD" /> Gluten Free & Vegan Friendly</div>
                    </div>
                </motion.div>

                <motion.div
                    className="fabric-images"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="fabric-img-wrap">
                        <img src="/images/img4.jpeg" alt="Fashion Texture" />
                    </div>
                    <div className="fabric-img-wrap offset">
                        <img src="/images/img5.jpeg" alt="Premium Fabric" />
                    </div>
                </motion.div>
            </div>

            {/* Spotted on Campus (Instagram Feed) */}
            <div className="spotted-section">
                <div className="container">
                    <motion.div
                        className="spotted-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3>Spotted on Instagram</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Snack lovers sharing their #Shopnix fox nut moments. Tag us to be featured on our page!</p>
                    </motion.div>

                    <div className="spotted-grid">
                        {[
                            '/images/img1.jpeg',
                            '/images/img2.jpeg',
                            '/images/img3.jpeg',
                            '/images/img4.jpeg'
                        ].map((imgUrl, idx) => (
                            <motion.div
                                key={idx}
                                className="spotted-item"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <img src={imgUrl} alt="Shopnix fox nuts" />
                                <div className="spotted-overlay">
                                    <Instagram size={32} className="spotted-icon" />
                                    <span style={{ fontWeight: '600', letterSpacing: '1px' }}>SHOP THIS FLAVOUR</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <QuickView
                isOpen={!!quickViewProduct}
                product={quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </div>
    );
};

export default NewArrivals;
