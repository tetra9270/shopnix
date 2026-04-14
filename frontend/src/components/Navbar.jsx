import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, LogOut, Crown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const location = useLocation();
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const syncUser = () => {
            const user = localStorage.getItem('userInfo');
            if (user && user !== 'undefined') {
                try {
                    const parsed = JSON.parse(user);
                    if (JSON.stringify(parsed) !== JSON.stringify(userInfo)) {
                        console.log("Navbar - New UserInfo detected:", parsed);
                        setUserInfo(parsed);
                    }
                } catch (e) {
                    setUserInfo(null);
                }
            } else {
                setUserInfo(null);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Initial sync
        syncUser();

        // Check every second for changes (since storage event doesn't fire in same tab)
        const interval = setInterval(syncUser, 1000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, [userInfo, location]);

    // Also sync on window focus to be sure
    useEffect(() => {
        const handleFocus = () => {
            const user = localStorage.getItem('userInfo');
            if (user) {
                try {
                    setUserInfo(JSON.parse(user));
                } catch (e) { }
            }
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        window.location.reload(); // Simple reload to reset app state
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="nav-logo title-gradient">
                    Shopnix.
                </Link>

                <div className="nav-links desktop-only">
                    <Link to="/collection/all">Collections</Link>
                    <Link to="/new-arrivals">New Arrivals</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="nav-actions">
                    {userInfo ? (
                        <div className="user-nav-premium">
                            <div className="user-profile-handle">
                                <div className="user-avatar-mini">
                                    <Crown size={14} />
                                </div>
                                <span className="user-name-premium">
                                    {(() => {
                                        if (userInfo) {
                                            console.log(userInfo)
                                            // Priority: 1. name, 2. user.name, 3. first part of email
                                            const name = userInfo.name || (userInfo.user && userInfo.user.name);
                                            if (name) {
                                                return name.split(' ')[0];
                                            }
                                            if (userInfo.email) {
                                                return userInfo.email.split('@')[0];
                                            }
                                        }
                                        return 'Member';
                                    })()}
                                </span>
                            </div>
                            <button className="logout-btn-minimal" onClick={logoutHandler} title="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="icon-btn" title="Login">
                            <User size={20} />
                        </Link>
                    )}
                    <button className="icon-btn cart-btn" onClick={() => setCartDrawerOpen(true)}>
                        <ShoppingBag size={20} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                    <button className="icon-btn mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu glass-panel">
                    <Link to="/collection/all" onClick={() => setMobileMenuOpen(false)}>Collections</Link>
                    <Link to="/new-arrivals" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
                    <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                </div>
            )}
            <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
        </nav>
    );
};

export default Navbar;
