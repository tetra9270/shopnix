import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, ChevronRight, SlidersHorizontal, ChevronDown, Search, Truck, ShieldCheck } from 'lucide-react';
import QuickView from './QuickView';
import API from '../services/api';
import { getImageUrl } from '../utils/helpers';
import './ProductList.css';
import './CollectionPage.css';
import './CollectionExtras.css';

const collectionData = {
    'campus-casuals': {
        title: "Campus Casuals",
        description: "Breezy & Comfortable everyday wear for lectures, library runs, and hostel life.",
        products: [] // Inherited from 'all'
    },
    'festive-vibes': {
        title: "Festive Vibes",
        description: "Rich, traditional kurtis with intricate detailing for pujas and celebrations.",
        products: []
    },
    'party-ready': {
        title: "Party Ready",
        description: "Chic, modern silhouettes perfect for a night out or weekend dinners.",
        products: []
    },
    'all': {
        title: "All Flavours",
        description: "Explore our entire range of premium roasted fox nuts — from classic salted to bold spicy and sweet indulgences.",
        products: []
    }
};

const CollectionPage = () => {
    const { collectionId } = useParams();
    const [collection, setCollection] = useState(null);
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    // Filtering and Sorting State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOption, setSortOption] = useState('featured');

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProducts = async () => {
            try {
                const { data } = await API.get('/api/products');
                const id = collectionId || 'all';
                const baseData = { ...collectionData[id] } || { ...collectionData['all'] };
                
                let filteredProducts = data;
                if (id === 'campus-casuals') filteredProducts = data.filter(p => (p.discountPrice > 0 ? p.discountPrice : p.price) < 350);
                if (id === 'festive-vibes') filteredProducts = data.filter(p => (p.discountPrice > 0 ? p.discountPrice : p.price) >= 350);
                if (id === 'party-ready') filteredProducts = data.filter(p => p.category === 'Premium' || p.category === 'Sweet');

                setCollection({
                    ...baseData,
                    products: filteredProducts
                });
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();

        // Reset filters when collection changes
        setSearchQuery('');
        setSelectedCategory('All');
        setSortOption('featured');
    }, [collectionId]);

    // Derived State for filtering and sorting
    const processedProducts = useMemo(() => {
        if (!collection) return [];

        let result = [...collection.products];

        // 1. Search filter
        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // 2. Category filter
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // 3. Sorting
        if (sortOption === 'price-low') {
            result.sort((a, b) => (a.discountPrice > 0 ? a.discountPrice : a.price) - (b.discountPrice > 0 ? b.discountPrice : b.price));
        } else if (sortOption === 'price-high') {
            result.sort((a, b) => (b.discountPrice > 0 ? b.discountPrice : b.price) - (a.discountPrice > 0 ? a.discountPrice : a.price));
        }

        return result;
    }, [collection, searchQuery, selectedCategory, sortOption]);

    if (!collection) return <div className="container" style={{ paddingTop: '120px' }}>Loading...</div>;

    const categories = ['All', 'Classic', 'Spicy', 'Sweet', 'Premium', 'Gourmet'];

    return (
        <div className="collection-page">
            {/* Attractive Top Sale Banner */}
            <div className="collection-sale-banner">
                <motion.div
                    className="sale-content container"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="sale-tag">Hostel Special</span>
                    <h2>End of Month Flash Sale</h2>
                    <p>Up to 40% Off on select fox nut flavours. Free shipping on orders above ₹499!</p>
                </motion.div>
            </div>

            <div className="container">
                {/* Elegant Breadcrumbs */}
                <nav className="breadcrumbs">
                    <Link to="/">Home</Link>
                    <ChevronRight className="breadcrumb-separator" size={14} />
                    <Link to="/collection/all">Collections</Link>
                    <ChevronRight className="breadcrumb-separator" size={14} />
                    <span className="breadcrumb-current">{collection.title}</span>
                </nav>

                {/* Trending Categories Bubbles */}
                <motion.div
                    className="trending-categories-section" style={{ marginBottom: '40px' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <h3 style={{ marginBottom: '20px', fontSize: '1.8rem', textAlign: 'center', fontFamily: "'Playfair Display', serif" }}>Trending Flavours This Week</h3>
                    <div className="trending-categories-wrapper">
                        <div className="trending-categories">
                            {/* Original Set */}
                            <div className="trending-category-card" onClick={() => setSelectedCategory('Classic')}>
                                <img src="/images/img1.jpeg" alt="Classic" />
                                <div className="trending-category-overlay"><span>Classic</span></div>
                            </div>
                            <div className="trending-category-card" onClick={() => setSelectedCategory('Spicy')}>
                                <img src="/images/img2.jpeg" alt="Spicy" />
                                <div className="trending-category-overlay"><span>Spicy</span></div>
                            </div>
                            <div className="trending-category-card" onClick={() => setSelectedCategory('Sweet')}>
                                <img src="/images/img3.jpeg" alt="Sweet" />
                                <div className="trending-category-overlay"><span>Sweet</span></div>
                            </div>
                            <div className="trending-category-card" onClick={() => setSelectedCategory('Premium')}>
                                <img src="/images/img4.jpeg" alt="Premium" />
                                <div className="trending-category-overlay"><span>Premium</span></div>
                            </div>
                            <div className="trending-category-card" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                                <img src="/images/img5.jpeg" alt="View All" />
                                <div className="trending-category-overlay"><span>View All</span></div>
                            </div>

                            {/* Duplicated Set for Infinite Marquee effect */}
                            <div className="trending-category-card" onClick={() => setSelectedCategory('Classic')}>
                                <img src="/images/img1.jpeg" alt="Classic" />
                                <div className="trending-category-overlay"><span>Classic</span></div>
                            </div>
                            <div className="trending-category-card" onClick={() => setSelectedCategory('Spicy')}>
                                <img src="/images/img2.jpeg" alt="Spicy" />
                                <div className="trending-category-overlay"><span>Spicy</span></div>
                            </div>
                            <div className="trending-category-card" onClick={() => setSelectedCategory('Sweet')}>
                                <img src="/images/img3.jpeg" alt="Sweet" />
                                <div className="trending-category-overlay"><span>Sweet</span></div>
                            </div>
                            <div className="trending-category-card" onClick={() => setSelectedCategory('Premium')}>
                                <img src="/images/img4.jpeg" alt="Premium" />
                                <div className="trending-category-overlay"><span>Premium</span></div>
                            </div>
                            <div className="trending-category-card" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                                <img src="/images/img5.jpeg" alt="View All" />
                                <div className="trending-category-overlay"><span>View All</span></div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="section-header" style={{ textAlign: 'left', marginBottom: '30px' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="title-gradient collection-title">{collection.title}</h1>
                    <p className="collection-description">{collection.description}</p>
                </motion.div>

                {/* Shopping Toolbar (Filter, Search & Sort) */}
                <motion.div
                    className="collection-toolbar" style={{ flexWrap: 'wrap', gap: '15px' }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="toolbar-info">
                        Showing {processedProducts.length} delicious flavours
                    </div>

                    <div className="toolbar-search" style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
                        <Search size={18} style={{ position: 'absolute', top: '10px', left: '15px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search fox nut flavours..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '10px 15px 10px 45px', borderRadius: '20px', border: '1px solid rgba(212, 154, 137, 0.3)', background: 'transparent', color: 'var(--text-main)', outline: 'none' }}
                        />
                    </div>

                    <div className="toolbar-actions" style={{ flexWrap: 'wrap' }}>
                        <select
                            className="toolbar-btn"
                            style={{ appearance: 'none', paddingRight: '30px', backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map(cat => <option key={cat} value={cat}>Category: {cat}</option>)}
                        </select>

                        <select
                            className="toolbar-btn"
                            style={{ appearance: 'none', paddingRight: '30px', backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="featured">Sort by: Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </motion.div>

                {/* Stunning Parallax Promo Banner */}
                <motion.div
                    className="parallax-promo-banner"
                    initial={{ opacity: 0 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="parallax-overlay"></div>
                    <div className="parallax-content">
                        <h2>Elevate Your Snacking Game</h2>
                        <p>Discover bold flavours and premium quality roasted fox nuts, crafted exclusively for health-conscious snackers. Try our latest drop today.</p>
                        <button className="btn primary-btn" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                            Explore The Drop
                        </button>
                    </div>
                </motion.div>

                {processedProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-muted)' }}>
                        <h3>No products found matching your criteria.</h3>
                        <button className="btn outline-btn" style={{ marginTop: '20px' }} onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>Clear Filters</button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {processedProducts.map((product, index) => (
                            <motion.div
                                key={product._id}
                                className="product-card glass-panel"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                whileHover={{ y: -5 }}
                                onClick={() => setQuickViewProduct(product)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="product-image-container">
                                    {/* Dynamic Product Badges */}
                                    {product.badge && (
                                        <div className={`product - badge badge - ${product.badge} `}>
                                            {product.badge === 'sale' ? 'Sale' : product.badge === 'new' ? 'New Arrival' : 'Bestseller'}
                                        </div>
                                    )}

                                    <img src={getImageUrl(product.image)} alt={product.name} className="product-image main-image" />
                                    {product.images && product.images.length > 0 && (
                                        <img src={getImageUrl(product.images[0])} alt={`${product.name} alternate`} className="product-image hover-image" />
                                    )}

                                    <div className="overlay-actions" onClick={(e) => e.stopPropagation()}>
                                        <button className="icon-btn-round" aria-label="Add to Cart"><ShoppingCart size={18} /></button>
                                        <button className="icon-btn-round" aria-label="Quick View" onClick={() => setQuickViewProduct(product)}><Eye size={18} /></button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    {product.category && <span className="product-category">{product.category}</span>}
                                    <h3>{product.name}</h3>
                                    <div className="price-container" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
                                        <span className="product-price">₹{product.discountPrice > 0 ? product.discountPrice : product.price}</span>
                                        {product.discountPrice > 0 && (
                                            <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '0.9rem' }}>₹{product.price}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Shopnix Premium Promise */}
                <motion.div
                    className="style-promise-banner"
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="style-promise-content">
                        <h3>The Shopnix Promise</h3>
                        <p>We slow-roast every batch of fox nuts with care — using real spices, zero preservatives, and 100% natural ingredients. Freshness sealed in every pack, delivered fast to your door.</p>

                        <div className="promise-features">
                            <div className="promise-feature">
                                <div className="promise-feature-icon"><ShieldCheck size={20} /></div>
                                Premium Quality
                            </div>
                            <div className="promise-feature">
                                <div className="promise-feature-icon"><Truck size={20} /></div>
                                Fast Delivery
                            </div>
                        </div>
                    </div>
                    <div className="style-promise-image">
                        <img src="/images/img5.jpeg" alt="Premium Product Detail" />
                    </div>
                </motion.div>

            </div>

            {/* Quick View Modal */}
            <QuickView
                isOpen={!!quickViewProduct}
                product={quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </div>
    );
};

export default CollectionPage;
