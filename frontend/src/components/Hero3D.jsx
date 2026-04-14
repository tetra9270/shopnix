/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero3D.css';

const slides = [
    {
        id: 1,
        tagline: "Nature's Superfood.",
        subtitle: "Discover our premium Fox Nuts (Makhana) — 100% natural, roasted to perfection. The healthiest snack you'll ever love.",
        image: "/images/img1.jpeg",
        btnText: "Shop Now",
        link: "/collection/all"
    },
    {
        id: 2,
        tagline: "Guilt-Free Snacking.",
        subtitle: "Low calorie, high protein, and incredibly crunchy. Our fox nuts are the perfect snack for every health-conscious foodie.",
        image: "/images/img2.jpeg",
        btnText: "View Flavours",
        link: "/collection/campus-casuals"
    },
    {
        id: 3,
        tagline: "Rich in Goodness.",
        subtitle: "Packed with antioxidants, calcium, and magnesium. Every handful of our fox nuts fuels your body and delights your taste buds.",
        image: "/images/img3.jpeg",
        btnText: "Shop Classic",
        link: "/collection/festive-vibes"
    },
    {
        id: 4,
        tagline: "Bold New Flavours.",
        subtitle: "From tangy peri-peri to buttery caramel — explore our exciting range of flavoured fox nuts crafted for adventurous snackers.",
        image: "/images/img4.jpeg",
        btnText: "Explore Flavours",
        link: "/collection/party-ready"
    }
];

const Hero3D = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance the slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slide = slides[currentSlide];

    return (
        <section className="hero-section">
            <div className="container hero-container">
                <div className="hero-content">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="title-gradient">{slide.tagline}</h1>
                            <p className="hero-subtitle">{slide.subtitle}</p>
                            <div className="hero-actions">
                                <Link to={slide.link} className="btn" style={{ textDecoration: 'none' }}>{slide.btnText}</Link>
                                <Link to="/collection/all" className="btn btn-outline" style={{ textDecoration: 'none' }}>View Catalog</Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div className="slider-dots">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={`img-${slide.id}`}
                            src={slide.image}
                            alt={slide.tagline}
                            className="hero-animated-image glass-panel"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [-10, 10, -10],
                            }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{
                                opacity: { duration: 0.6 },
                                scale: { duration: 0.6 },
                                y: {
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "easeInOut"
                                }
                            }}
                        />
                    </AnimatePresence>
                </div>
            </div>

            <div className="hero-bg-glow"></div>
        </section>
    );
};

export default Hero3D;
