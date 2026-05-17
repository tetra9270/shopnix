/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './FoxnutsShowcase.css';

const FoxnutsShowcase = () => {
    return (
        <section className="foxnuts-showcase">
            <div className="foxnuts-showcase-inner">

                {/* Left: Image */}
                <motion.div
                    className="foxnuts-img-wrap"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                >
                    <motion.img
                        src="/images/foxnuts-hero.png"
                        alt="Premium Shopnix Foxnuts Makhana"
                        className="foxnuts-main-img"
                        animate={{ y: [-12, 12, -12] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    />
                    {/* Glow behind image */}
                    <div className="foxnuts-glow" />
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    className="foxnuts-content"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                >
                    <motion.span
                        className="foxnuts-badge"
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        🌿 100% Natural &amp; Preservative-Free
                    </motion.span>

                    <h2 className="foxnuts-title">
                        India's Finest<br />
                        <span className="foxnuts-title-accent">Fox Nuts (Makhana)</span>
                    </h2>

                    <p className="foxnuts-desc">
                        Sourced straight from the lotus farms of <strong>Bihar</strong> — roasted in small batches for
                        maximum crunch, freshness, and flavour. Our premium Makhana is light, airy, and bursting with
                        natural goodness in every single bite.
                    </p>

                    <div className="foxnuts-stats">
                        <motion.div
                            className="foxnuts-stat"
                            whileHover={{ scale: 1.07 }}
                        >
                            <span className="stat-number">Low</span>
                            <span className="stat-label">Calories</span>
                        </motion.div>
                        <motion.div
                            className="foxnuts-stat"
                            whileHover={{ scale: 1.07 }}
                        >
                            <span className="stat-number">High</span>
                            <span className="stat-label">Protein</span>
                        </motion.div>
                        <motion.div
                            className="foxnuts-stat"
                            whileHover={{ scale: 1.07 }}
                        >
                            <span className="stat-number">Zero</span>
                            <span className="stat-label">Preservatives</span>
                        </motion.div>
                        <motion.div
                            className="foxnuts-stat"
                            whileHover={{ scale: 1.07 }}
                        >
                            <span className="stat-number">Rich</span>
                            <span className="stat-label">Antioxidants</span>
                        </motion.div>
                    </div>

                    <div className="foxnuts-actions">
                        <Link to="/collection/all" className="foxnuts-btn-primary">
                            Shop Now 🛒
                        </Link>
                        <Link to="/about" className="foxnuts-btn-outline">
                            Our Story
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Background decorations */}
            <div className="showcase-bg-circle c1" />
            <div className="showcase-bg-circle c2" />
        </section>
    );
};

export default FoxnutsShowcase;
