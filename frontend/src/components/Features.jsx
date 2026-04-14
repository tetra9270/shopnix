/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import './Features.css';

const features = [
    {
        icon: <Sparkles size={32} />,
        title: "Premium Fabrics",
        description: "Breathable, high-quality materials that feel like a second skin, perfect for long days."
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Flawless Fit Guarantee",
        description: "Tailored to perfection. We understand that every woman's body is unique and beautiful."
    },
    {
        icon: <Truck size={32} />,
        title: "Hostel-Friendly Delivery",
        description: "Fast, discreet, and reliable delivery directly to your campus or hostel gate."
    },
    {
        icon: <RotateCcw size={32} />,
        title: "Hassle-Free Returns",
        description: "Not 100% in love? Return it easily within 7 days, no questions asked."
    }
];

const Features = () => {
    return (
        <section className="features-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="title-gradient">The Shahi Adaa Promise</h2>
                    <p>Why thousands of girls choose us for their daily wardrobe.</p>
                </motion.div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="feature-card glass-panel"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ scale: 1.03, rotate: [-1, 1, 0] }}
                        >
                            <motion.div
                                className="feature-icon"
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
