import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, Heart, Lock, X, Sparkles } from 'lucide-react';
import './LoginPrompt.css';

const LoginPrompt = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="lp-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="lp-card glass-panel"
                    initial={{ scale: 0.8, y: 30, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 30, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button className="lp-close" onClick={onClose}>
                        <X size={18} />
                    </button>

                    {/* Icon Stack */}
                    <div className="lp-icon-stack">
                        <motion.div
                            className="lp-icon-bg"
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        >
                            <Crown size={32} />
                        </motion.div>
                        <motion.div
                            className="lp-sparkle lp-sparkle-1"
                            animate={{ rotate: 360, opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Sparkles size={16} />
                        </motion.div>
                        <motion.div
                            className="lp-sparkle lp-sparkle-2"
                            animate={{ rotate: -360, opacity: [1, 0.6, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Heart size={14} fill="#e4a096" color="#e4a096" />
                        </motion.div>
                    </div>

                    {/* Text */}
                    <div className="lp-badge">
                        <Lock size={12} />
                        <span>Members Only</span>
                    </div>
                    <h2 className="lp-title">Royal Access Required</h2>
                    <p className="lp-subtitle">
                        Sign in to your Shahi Adaa account to add pieces to your royal collection.
                    </p>

                    {/* Divider */}
                    <div className="lp-divider">
                        <span>✦</span>
                    </div>

                    {/* Actions */}
                    <div className="lp-actions">
                        <Link to="/login" className="lp-btn-primary" onClick={onClose}>
                            <Crown size={16} />
                            Sign In to Shop
                        </Link>
                        <Link to="/login?mode=signup" className="lp-btn-secondary" onClick={onClose}>
                            Create Royal Account
                        </Link>
                    </div>

                    <p className="lp-footer">
                        Join thousands of queens who shop with Shahi Adaa ✨
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LoginPrompt;
