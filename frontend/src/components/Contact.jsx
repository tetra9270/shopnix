import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Your message has been sent to our campus reps! We'll get back to you shortly.");
    };

    return (
        <div className="contact-page">
            <motion.div
                className="contact-container"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Left Panel: Contact Info */}
                <div className="contact-info">
                    <div className="contact-info-overlay"></div>
                    <div className="contact-info-content">
                        <h2>Get in Touch</h2>
                        <p>Have a question about sizing? Need an outfit for the upcoming campus fest? Our team is always here for you.</p>

                        <div className="contact-details">
                            <div className="contact-detail-item">
                                <MapPin size={24} />
                                <span>123 Fashion Ave, University District, ND</span>
                            </div>
                            <div className="contact-detail-item">
                                <Phone size={24} />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="contact-detail-item">
                                <Mail size={24} />
                                <span>hello@shahiadaa.com</span>
                            </div>
                        </div>

                        <div className="contact-socials">
                            <div className="contact-social-btn"><Instagram size={20} /></div>
                            <div className="contact-social-btn"><Facebook size={20} /></div>
                            <div className="contact-social-btn"><Twitter size={20} /></div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Form */}
                <div className="contact-form-wrapper">
                    <h3>Send us a Message</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" placeholder="Priya Sharma" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="priya.s@university.edu" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" placeholder="Sizing Question" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">How can we help?</label>
                            <textarea id="message" rows="5" placeholder="I absolutely love the Midnight Velvet piece! Do you have it in a size small?" required></textarea>
                        </div>

                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;
