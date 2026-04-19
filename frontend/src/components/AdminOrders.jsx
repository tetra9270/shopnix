import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Search, 
    ChevronDown, 
    ChevronUp, 
    Package, 
    MapPin, 
    User,
    Calendar,
    RefreshCw,
    Filter
} from 'lucide-react';
import API from '../services/api';
import './AdminOrders.css';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/api/orders/admin/all');
            setOrders(data || []);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await API.put(`/api/orders/${orderId}/status`, { status: newStatus });
            // Update local state to reflect change immediately
            setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus, isDelivered: newStatus === 'Delivered' } : o));
        } catch (error) {
            alert('Failed to update status: ' + (error.response?.data?.message || error.message));
        }
    };

    const statusColors = {
        'Pending': '#e0a020',
        'Confirmed': '#4a90d9',
        'Shipped': '#7a4aaa',
        'Delivered': '#5a9a60',
        'Cancelled': '#d04040'
    };

    const filteredOrders = orders.filter(o => {
        const matchesSearch = o._id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = statusFilter === 'All' || o.status === statusFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="admin-orders">
            <header className="page-header">
                <h1 className="page-title">Order Logistics</h1>
                <div className="header-controls">
                    <div className="search-box glass-panel">
                        <Search size={18} />
                        <input 
                            type="text" 
                            placeholder="Search Order ID or Customer..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="refresh-btn" onClick={fetchOrders} title="Refresh Data">
                        <RefreshCw size={20} className={loading ? 'spinning' : ''} />
                    </button>
                </div>
            </header>

            <div className="filter-bar">
                {['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                    <button 
                        key={s} 
                        className={`filter-tab ${statusFilter === s ? 'active' : ''}`}
                        onClick={() => setStatusFilter(s)}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {loading && !orders.length ? (
                <div className="admin-loading">Synchronizing with Royal Vault...</div>
            ) : (
                <div className="orders-table-container glass-panel">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <React.Fragment key={order._id}>
                                    <tr className={`order-row ${expandedOrder === order._id ? 'expanded' : ''}`}>
                                        <td className="id-cell">#{order._id.slice(-8).toUpperCase()}</td>
                                        <td className="user-cell">
                                            <div className="user-info">
                                                <User size={14} />
                                                <span>{order.user?.name || 'Guest User'}</span>
                                            </div>
                                        </td>
                                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="price-cell">₹{order.totalPrice?.toLocaleString()}</td>
                                        <td>
                                            <span 
                                                className="status-pill"
                                                style={{ background: `${statusColors[order.status]}20`, color: statusColors[order.status], borderColor: `${statusColors[order.status]}40` }}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <select 
                                                className="status-select"
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button 
                                                className="expand-btn"
                                                onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                                            >
                                                {expandedOrder === order._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </button>
                                        </td>
                                    </tr>
                                    <AnimatePresence>
                                        {expandedOrder === order._id && (
                                            <tr className="detail-row">
                                                <td colSpan="7">
                                                    <motion.div 
                                                        className="order-details-pane"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                    >
                                                        <div className="details-grid">
                                                            <div className="details-col">
                                                                <h4><Package size={16} /> Order Items</h4>
                                                                <div className="items-list">
                                                                    {order.orderItems.map((item, idx) => (
                                                                        <div key={idx} className="order-item-mini">
                                                                            <img src={item.image} alt={item.name} />
                                                                            <div>
                                                                                <p className="item-name">{item.name}</p>
                                                                                <p className="item-meta">Qty: {item.qty} | ₹{item.price}</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="details-col">
                                                                <h4><MapPin size={16} /> Shipping Logistics</h4>
                                                                <div className="shipping-info">
                                                                    <p><strong>{order.shippingAddress?.fullName}</strong></p>
                                                                    <p>{order.shippingAddress?.address}</p>
                                                                    <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                                                                    <p>{order.shippingAddress?.phone}</p>
                                                                </div>
                                                                <div className="payment-method-tag">
                                                                    Method: {order.paymentMethod}
                                                                </div>
                                                            </div>
                                                            <div className="details-col">
                                                                <h4><Calendar size={16} /> Timeline</h4>
                                                                <div className="timeline-info">
                                                                    <div className="timeline-item">
                                                                        <span>Ordered</span>
                                                                        <span>{new Date(order.createdAt).toLocaleString()}</span>
                                                                    </div>
                                                                    {order.isPaid && (
                                                                        <div className="timeline-item paid">
                                                                            <span>Paid</span>
                                                                            <span>{new Date(order.paidAt).toLocaleString()}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </td>
                                            </tr>
                                        )}
                                    </AnimatePresence>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    {!filteredOrders.length && (
                        <div className="no-results">No orders matched your royal query</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
