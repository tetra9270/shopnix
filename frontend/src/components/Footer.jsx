/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Heart, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer custom-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2 className="title-gradient footer-logo">Shopnix Fox Nuts</h2>
                        <p className="footer-tagline">
                            India's finest Fox Nuts (Makhana) — 100% natural, roasted with love and delivered fresh to your doorstep.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to="/new-arrivals">New Arrivals</Link></li>
                            <li><Link to="/collection/campus-casuals">Classic Salted</Link></li>
                            <li><Link to="/collection/festive-vibes">Peri Peri Spicy</Link></li>
                            <li><Link to="/collection/party-ready">Caramel Sweet</Link></li>
                            <li><Link to="/collection/all">All Flavours</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h3>Help & Support</h3>
                        <ul>
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Shipping & Delivery</a></li>
                            <li><a href="#">Returns & Refunds</a></li>
                            <li><a href="#">Bulk Orders</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h3>Join the Club</h3>
                        <p>Get 10% off your first order and exclusive snack deals straight to your inbox.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="input-group">
                                <Mail className="mail-icon" size={18} />
                                <input type="email" placeholder="Your email address" required />
                            </div>
                            <button type="submit" className="btn btn-subscribe">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} Shopnix Fox Nuts. Crafted with <Heart size={14} className="heart-icon" /> for you.
                    </p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <span className="separator">|</span>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
