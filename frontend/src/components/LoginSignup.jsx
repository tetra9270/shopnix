import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Heart, Sparkles, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/userService';
import './LoginSignup.css';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Check if already logged in
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/');
        }
    }, [navigate]);

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            let data;
            if (isLogin) {
                data = await loginUser(email, password);
            } else {
                data = await registerUser(name, email, password);
            }

            localStorage.setItem('userInfo', JSON.stringify(data));
            setShowSuccess(true);

            // Navigate and reload after 1.8 seconds
            setTimeout(() => {
                navigate('/');
                window.location.reload();
            }, 1800);

        } catch (err) {
            setError(err.response && err.response.data.message
                ? err.response.data.message
                : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        className="auth-success-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="auth-success-card glass-panel"
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: "spring", damping: 15 }}
                        >
                            <div className="success-icon-wrap">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                >
                                    <Heart size={48} fill="#e4a096" color="#b57a70" />
                                </motion.div>
                                <motion.div
                                    className="sparkle-1"
                                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Sparkles size={24} color="#d4af37" />
                                </motion.div>
                            </div>
                            <h2>Regal Welcome!</h2>
                            <p>Your journey with Shopnix has begun. Redirecting you to the store...</p>
                            <div className="success-loader">
                                <motion.div
                                    className="loader-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2 }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="auth-background">
                <div className="auth-blob auth-blob-1"></div>
                <div className="auth-blob auth-blob-2"></div>
                <div className="auth-blob auth-blob-3"></div>
            </div>

            <motion.div
                className="auth-card-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="auth-card glass-panel">
                    {/* Left Side - Visual/Marketing */}
                    <div className="auth-visual">
                        <div className="auth-visual-overlay"></div>
                        <div className="auth-visual-content">
                            <motion.h2
                                key={isLogin ? 'login-h2' : 'signup-h2'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {isLogin ? 'Welcome Back, Queen.' : 'Join The Royalty.'}
                            </motion.h2>
                            <motion.p
                                key={isLogin ? 'login-p' : 'signup-p'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {isLogin
                                    ? 'Your collection is waiting for you. Sign in to continue your journey with Shopnix.'
                                    : 'Start your journey of style and savings. Exclusive perks await you inside.'}
                            </motion.p>

                            <div className="auth-benefits">
                                <div className="benefit-item">
                                    <div className="benefit-icon"><Sparkles size={16} /></div>
                                    <span>Exclusive Campus Collections</span>
                                </div>
                                <div className="benefit-item">
                                    <div className="benefit-icon"><Sparkles size={16} /></div>
                                    <span>Fast Student Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="auth-form-side">
                        <div className="auth-form-header">
                            <div className="regal-badge">
                                <Heart size={16} fill="var(--primary-color)" />
                                <span>Premium Access</span>
                            </div>
                            <h1>Shopnix<span>.</span></h1>
                            <p>{isLogin ? 'Sign in to your account' : 'Create your royal account'}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {error && (
                                <motion.div
                                    className="auth-error-msg"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            <AnimatePresence mode='wait'>
                                {!isLogin && (
                                    <motion.div
                                        className="form-group-premium"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="input-wrapper">
                                            <User className="input-icon" size={18} />
                                            <input
                                                type="text"
                                                placeholder="Your Full Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required={!isLogin}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="form-group-premium">
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={18} />
                                    <input
                                        type="email"
                                        placeholder="University Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group-premium">
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={18} />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {isLogin && (
                                <div className="forgot-password">
                                    <a href="#">Forgot password?</a>
                                </div>
                            )}

                            <button type="submit" className="auth-btn-premium" disabled={loading}>
                                {loading ? (
                                    <Loader2 className="spinner" size={20} />
                                ) : (
                                    <>
                                        <span>{isLogin ? 'Login' : 'Create Account'}</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <div className="auth-toggle">
                                {isLogin ? (
                                    <p>Don't have an account? <span onClick={toggleMode}>Sign up now</span></p>
                                ) : (
                                    <p>Already a member? <span onClick={toggleMode}>Sign in here</span></p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginSignup;
