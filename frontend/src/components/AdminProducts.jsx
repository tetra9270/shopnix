import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    Search, 
    Image as ImageIcon,
    Check,
    X,
    Box,
    Tag
} from 'lucide-react';
import API from '../services/api';
import './AdminProducts.css';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', price: 0, image: '', category: '', brand: '', countInStock: 0, description: '', modelData: 'default-kurti'
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/api/products');
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product._id);
            setFormData({
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                brand: product.brand,
                countInStock: product.countInStock || 0,
                description: product.description,
                modelData: product.modelData || 'default-kurti'
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '', price: 0, image: '', category: '', brand: '', countInStock: 0, description: '', modelData: 'default-kurti'
            });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await API.put(`/api/products/${editingProduct}`, formData);
            } else {
                await API.post('/api/products', formData);
            }
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            alert('Failed to save product: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this royal piece?')) {
            try {
                await API.delete(`/api/products/${id}`);
                fetchProducts();
            } catch (error) {
                alert('Failed to delete: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-products">
            <header className="page-header">
                <div>
                    <h1 className="page-title">Catalog Curating</h1>
                    <p className="subtitle">Manage your premium product inventory</p>
                </div>
                <button className="add-btn premium-btn" onClick={() => handleOpenModal()}>
                    <Plus size={20} />
                    <span>Add New Piece</span>
                </button>
            </header>

            <div className="table-controls">
                <div className="search-box glass-panel">
                    <Search size={18} />
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="admin-loading">Assembling product gallery...</div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <motion.div 
                            key={product._id} 
                            className="product-admin-card glass-panel"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="prod-img-container">
                                <img src={product.image} alt={product.name} />
                                <div className="prod-badge">{product.category}</div>
                            </div>
                            <div className="prod-content">
                                <h3 className="prod-name">{product.name}</h3>
                                <div className="prod-meta">
                                    <span className="prod-price">₹{product.price.toLocaleString()}</span>
                                    <span className={`prod-stock ${product.countInStock > 0 ? '' : 'low'}`}>
                                        {product.countInStock} in stock
                                    </span>
                                </div>
                                <div className="prod-actions">
                                    <button className="edit-btn" onClick={() => handleOpenModal(product)}><Edit2 size={16} /></button>
                                    <button className="delete-btn" onClick={() => handleDelete(product._id)}><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {!filteredProducts.length && (
                        <div className="no-data">No products found in the collection</div>
                    )}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="modal-content glass-panel"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <div className="modal-header">
                                <h2>{editingProduct ? 'Refine Product' : 'New Collection Piece'}</h2>
                                <button className="close-btn" onClick={() => setShowModal(false)}><X size={24} /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="product-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input 
                                            type="text" required 
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Price (₹)</label>
                                        <input 
                                            type="number" required 
                                            value={formData.price}
                                            onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL</label>
                                        <div className="input-with-icon">
                                            <ImageIcon size={18} />
                                            <input 
                                                type="text" required 
                                                value={formData.image}
                                                onChange={(e) => setFormData({...formData, image: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <input 
                                            type="text" required 
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <input 
                                            type="text" required 
                                            value={formData.brand}
                                            onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Stock Count</label>
                                        <input 
                                            type="number" required 
                                            value={formData.countInStock}
                                            onChange={(e) => setFormData({...formData, countInStock: Number(e.target.value)})}
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Description</label>
                                        <textarea 
                                            required rows="4"
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="cancel-pill" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="save-pill premium-btn">
                                        <Check size={18} /> {editingProduct ? 'Update Piece' : 'Add to Collection'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminProducts;
