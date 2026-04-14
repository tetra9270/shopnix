/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
    {
        id: 1,
        name: "Priya S.",
        college: "Delhi University",
        text: "The fabric is incredibly soft! I wore the Anarkali to my college fest and got so many compliments. Shahi Adaa is my new favorite.",
        rating: 5
    },
    {
        id: 2,
        name: "Ananya M.",
        college: "NIFT Mumbai",
        text: "Finally, a brand that understands hostel life. The delivery was super quick to my campus, and the fit was absolutely flawless.",
        rating: 5
    },
    {
        id: 3,
        name: "Sneha V.",
        college: "Christ University",
        text: "Obsessed with the rose gold detailing. It's so elegant and high quality for the price. I've already ordered three more casual kurtis!",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="title-gradient">Love Letters</h2>
                    <p>Don't just take our word for it. Hear from the girls who love Shahi Adaa.</p>
                </motion.div>

                <div className="testimonials-grid">
                    {testimonials.map((review, index) => (
                        <motion.div
                            key={review.id}
                            className="testimonial-card glass-panel"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: index * 0.2, type: "spring", bounce: 0.4 }}
                            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(212, 154, 137, 0.2)" }}
                        >
                            <motion.div
                                initial={{ rotate: 0 }}
                                whileInView={{ rotate: [-10, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                <Quote className="quote-icon" size={32} />
                            </motion.div>
                            <motion.div
                                className="rating"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    visible: { transition: { staggerChildren: 0.1 } }
                                }}
                            >
                                {[...Array(review.rating)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0 },
                                            visible: { opacity: 1, scale: 1 }
                                        }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <Star size={16} className="star-icon" fill="currentColor" />
                                    </motion.div>
                                ))}
                            </motion.div>
                            <p className="review-text">"{review.text}"</p>
                            <div className="reviewer-info">
                                <h4>{review.name}</h4>
                                <span>{review.college}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
