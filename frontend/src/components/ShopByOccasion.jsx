/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ShopByOccasion.css';

const occasions = [
    {
        id: "campus-casuals",
        title: "Classic Salted",
        subtitle: "Light & Crunchy",
        image: "/images/img1.jpeg"
    },
    {
        id: "festive-vibes",
        title: "Peri Peri Spicy",
        subtitle: "Bold & Flavourful",
        image: "/images/img2.jpeg"
    },
    {
        id: "party-ready",
        title: "Caramel Sweet",
        subtitle: "Rich & Indulgent",
        image: "/images/img3.jpeg"
    }
];

const ShopByOccasion = () => {
    return (
        <section className="occasion-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="title-gradient">Shop By Flavour</h2>
                    <p>Handcrafted fox nut flavours for every craving and mood.</p>
                </div>

                <div className="occasion-grid">
                    {occasions.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="occasion-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <Link to={`/collection/${item.id}`} style={{ display: 'block', height: '100%', textDecoration: 'none' }}>
                                <img src={item.image} alt={item.title} className="occasion-image" />
                                <div className="occasion-overlay">
                                    <div className="occasion-content">
                                        <h3>{item.title}</h3>
                                        <p>{item.subtitle}</p>
                                        <button className="btn outline-btn-white">Shop Now</button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShopByOccasion;
