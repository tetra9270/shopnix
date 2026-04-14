import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Crown, HeartHandshake, Leaf } from 'lucide-react';
import './About.css';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page">
            {/* Cinematic Hero */}
            <div className="about-hero">
                <div className="about-hero-overlay"></div>
                <motion.div
                    className="about-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1>Shopnix</h1>
                    <p>India's Premium Fox Nut Brand</p>
                </motion.div>
            </div>

            {/* The Story */}
            <div className="story-section">
                <motion.div
                    className="story-text"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Our Story</h2>
                    <p>Born from a love for healthy snacking, Shopnix was created to bring India's finest Fox Nuts (Makhana) to every doorstep. We believe snacking should never be a compromise between taste and health.</p>
                    <p>We source the purest lotus seeds directly from the farms of Bihar — the heartland of makhana cultivation — and slow-roast them in small batches to ensure maximum crunch and freshness in every bag.</p>
                    <p>"Shopnix" stands for smart snacking — bringing you superfood snacks that are as bold in flavour as they are rich in nutrition, delivered fresh and fast to your door.</p>
                </motion.div>

                <motion.div
                    className="story-image"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img src="/images/img1.jpeg" alt="Shopnix Heritage" />
                </motion.div>
            </div>

            {/* Craftsmanship Section */}
            <div className="craftsmanship-section">
                <motion.div
                    className="craftsmanship-image"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <img src="/images/img2.jpeg" alt="Shopnix Craftsmanship" />
                </motion.div>

                <motion.div
                    className="story-text craftsmanship-text"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2>Our Roasting Process</h2>
                    <p>Every batch of Shopnix fox nuts goes through a careful slow-roasting process at controlled temperatures to achieve that signature light, airy crunch — never oily, never stale.</p>
                    <p>Our seasoning blends are crafted in-house using real spices and natural flavour extracts. No artificial colours, no hidden preservatives — just honest, wholesome snacking that you can feel good about.</p>
                </motion.div>
            </div>

            {/* Meet Our Farmer Section */}
            <motion.div
                className="farmer-section"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
            >
                <div className="farmer-image-wrap">
                    <img src="/images/farmer.jpeg" alt="Ahmad - Makhana Farmer from Bihar" className="farmer-img" />
                </div>
                <div className="farmer-info">
                    <div className="farmer-badge">🌿 Direct From Farm</div>
                    <h2>Meet Ahmad</h2>
                    <p className="farmer-location">📍 Darbhanga, Bihar — Heartland of Makhana</p>
                    <p className="farmer-desc">Hi! I am Ahmad, a Makhana (Fox Nuts) farmer from Darbhanga, Bihar. I deal in <strong>Export Quality Makhana</strong> — sourced directly from my farm with no middlemen involved.</p>

                    <ul className="farmer-features">
                        <li>✅ No Middleman — Directly from Farm</li>
                        <li>✅ Top Quality at Best Rates</li>
                        <li>✅ Bulk Supply Available</li>
                        <li>✅ Fresh Makhana, Roasted with Care</li>
                    </ul>

                    <div className="farmer-contact">
                        <span>📞 Interested? Contact Ahmad:</span>
                        <a href="tel:9934144089" className="farmer-phone">9934144089</a>
                    </div>
                </div>
            </motion.div>

            {/* Core Values */}
            <div className="values-section">
                <motion.div
                    className="values-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>The Three Pillars</h2>
                </motion.div>

                <div className="values-grid">
                    <motion.div className="value-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                        <div className="value-icon"><Crown size={30} /></div>
                        <h3>Premium Quality</h3>
                        <p>We source Grade A lotus seeds directly from Bihar's finest farms. Every batch is tested for freshness, size, and crunch before it reaches your hands.</p>
                    </motion.div>

                    <motion.div className="value-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <div className="value-icon"><HeartHandshake size={30} /></div>
                        <h3>Health First</h3>
                        <p>Our fox nuts are low in calories, high in protein, and packed with antioxidants. A guilt-free snack that nourishes your body with every bite.</p>
                    </motion.div>

                    <motion.div className="value-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                        <div className="value-icon"><Leaf size={30} /></div>
                        <h3>100% Natural</h3>
                        <p>No artificial colours, no preservatives, no compromise. Just pure roasted fox nuts seasoned with real spices and natural flavours.</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
