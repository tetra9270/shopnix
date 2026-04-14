import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, MapPin, Package, Plus, Edit3, Trash2, Check, User, Mail, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import API from '../services/api';
import { getMyOrders } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('addresses');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingAddr, setEditingAddr] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [addrForm, setAddrForm] = useState({
        fullName: '', phone: '', address: '', city: '', postalCode: '', country: 'Pakistan', isDefault: false
    });

    useEffect(() => {
        const info = localStorage.getItem('userInfo');
        if (!info) { navigate('/login'); return; }
        fetchProfile();
        fetchOrders();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await API.get('/api/users/profile');
            setUser(data);
        } catch (e) { console.error(e); }
    };

    const fetchOrders = async () => {
        try {
            const data = await getMyOrders();
            setOrders(data);
        } catch (e) { console.error(e); }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            if (editingAddr) {
                await API.put(`/api/users/address/${editingAddr}`, addrForm);
            } else {
                await API.post('/api/users/address', addrForm);
            }
            fetchProfile();
            resetForm();
        } catch (e) { console.error(e); }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/api/users/address/${id}`);
            fetchProfile();
        } catch (e) { console.error(e); }
    };

    const startEdit = (addr) => {
        setEditingAddr(addr._id);
        setAddrForm({
            fullName: addr.fullName,
            phone: addr.phone,
            address: addr.address,
            city: addr.city,
            postalCode: addr.postalCode,
            country: addr.country,
            isDefault: addr.isDefault
        });
        setShowAddForm(true);
    };

    const resetForm = () => {
        setShowAddForm(false);
        setEditingAddr(null);
        setAddrForm({ fullName: '', phone: '', address: '', city: '', postalCode: '', country: 'Pakistan', isDefault: false });
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
        window.location.reload();
    };

    const statusColor = { Pending: '#e0a020', Confirmed: '#4a90d9', Shipped: '#7a4aaa', Delivered: '#5a9a60', Cancelled: '#d04040' };

    const userInfo = user || JSON.parse(localStorage.getItem('userInfo') || '{}');
    const initials = userInfo?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

    return (
        <div className="profile-page">
            <div className="profile-container">
                {/* Profile Header */}
                <motion.div className="profile-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="profile-avatar">
                        <span>{initials}</span>
                        <div className="avatar-crown"><Crown size={14} /></div>
                    </div>
                    <div className="profile-header-info">
                        <h1 className="profile-name">{userInfo?.name || 'Royal Member'}</h1>
                        <div className="profile-email"><Mail size={14} />{userInfo?.email}</div>
                    </div>
                    <button className="logout-profile-btn" onClick={handleLogout}>
                        <LogOut size={16} /> Logout
                    </button>
                </motion.div>

                {/* Tabs */}
                <div className="profile-tabs">
                    <button className={`profile-tab ${activeTab === 'addresses' ? 'active' : ''}`} onClick={() => setActiveTab('addresses')}>
                        <MapPin size={16} /> Addresses
                    </button>
                    <button className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
                        <Package size={16} /> My Orders {orders.length > 0 && <span className="order-badge">{orders.length}</span>}
                    </button>
                </div>

                {/* ADDRESSES TAB */}
                {activeTab === 'addresses' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="addresses-grid">
                            {(user?.addresses || []).map(addr => (
                                <motion.div key={addr._id} className={`profile-address-card ${addr.isDefault ? 'default' : ''}`} layout>
                                    {addr.isDefault && <div className="default-ribbon">✦ Default</div>}
                                    <div className="prof-addr-body">
                                        <strong>{addr.fullName}</strong>
                                        <span>{addr.phone}</span>
                                        <p>{addr.address}</p>
                                        <p>{addr.city}, {addr.postalCode}</p>
                                        <span className="addr-country-tag">{addr.country}</span>
                                    </div>
                                    <div className="prof-addr-actions">
                                        <button className="addr-edit-btn" onClick={() => startEdit(addr)}><Edit3 size={14} /></button>
                                        <button className="addr-delete-btn" onClick={() => handleDelete(addr._id)}><Trash2 size={14} /></button>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Add New Card */}
                            <motion.div className="add-address-card" onClick={() => { resetForm(); setShowAddForm(true); }} layout>
                                <Plus size={28} />
                                <span>Add New Address</span>
                            </motion.div>
                        </div>

                        {/* Add/Edit Form */}
                        <AnimatePresence>
                            {showAddForm && (
                                <motion.div
                                    className="prof-addr-form-overlay"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={(e) => { if (e.target === e.currentTarget) resetForm(); }}
                                >
                                    <motion.form
                                        className="prof-addr-form"
                                        initial={{ scale: 0.9, y: 20 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0.9, y: 20 }}
                                        onSubmit={handleAddAddress}
                                    >
                                        <h3>{editingAddr ? 'Edit Address' : 'Add New Address'}</h3>
                                        <div className="form-grid">
                                            {[
                                                { label: 'Full Name', key: 'fullName', type: 'text' },
                                                { label: 'Phone', key: 'phone', type: 'tel' },
                                                { label: 'Street Address', key: 'address', type: 'text' },
                                                { label: 'City', key: 'city', type: 'text' },
                                                { label: 'Postal Code', key: 'postalCode', type: 'text' },
                                                { label: 'Country', key: 'country', type: 'text' },
                                            ].map(f => (
                                                <div className="form-field" key={f.key}>
                                                    <label>{f.label}</label>
                                                    <input
                                                        type={f.type}
                                                        required
                                                        value={addrForm[f.key]}
                                                        onChange={e => setAddrForm({ ...addrForm, [f.key]: e.target.value })}
                                                        placeholder={f.label}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <label className="default-check">
                                            <input type="checkbox" checked={addrForm.isDefault} onChange={e => setAddrForm({ ...addrForm, isDefault: e.target.checked })} />
                                            Set as default address
                                        </label>
                                        <div className="prof-form-actions">
                                            <button type="submit" className="save-addr-btn">
                                                <Check size={16} /> {editingAddr ? 'Save Changes' : 'Add Address'}
                                            </button>
                                            <button type="button" className="cancel-btn" onClick={resetForm}>Cancel</button>
                                        </div>
                                    </motion.form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* ORDERS TAB */}
                {activeTab === 'orders' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {orders.length === 0 ? (
                            <div className="no-orders">
                                <Package size={52} strokeWidth={1} />
                                <h3>No orders yet</h3>
                                <p>Your royal purchases will appear here</p>
                                <button className="shop-now-btn" onClick={() => navigate('/')}>Shop Now</button>
                            </div>
                        ) : (
                            <div className="orders-list">
                                {orders.map(order => (
                                    <motion.div key={order._id} className="order-card" layout>
                                        <div className="order-card-header" onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}>
                                            <div className="order-meta">
                                                <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
                                                <span className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            <div className="order-right">
                                                <span className="order-status" style={{ background: `${statusColor[order.status]}20`, color: statusColor[order.status], borderColor: `${statusColor[order.status]}40` }}>
                                                    {order.status}
                                                </span>
                                                <span className="order-total">₹{order.totalPrice?.toLocaleString()}</span>
                                                {expandedOrder === order._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {expandedOrder === order._id && (
                                                <motion.div
                                                    className="order-items-expand"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    {order.orderItems.map((item, i) => (
                                                        <div key={i} className="order-item-row">
                                                            <img src={item.image || '/placeholder.png'} alt={item.name} />
                                                            <div className="oi-info">
                                                                <span className="oi-name">{item.name}</span>
                                                                <span className="oi-qty">Qty: {item.qty}</span>
                                                            </div>
                                                            <span className="oi-price">₹{(item.price * item.qty).toLocaleString()}</span>
                                                        </div>
                                                    ))}
                                                    <div className="order-addr-row">
                                                        <MapPin size={13} />
                                                        <span>{order.shippingAddress?.address}, {order.shippingAddress?.city}</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
