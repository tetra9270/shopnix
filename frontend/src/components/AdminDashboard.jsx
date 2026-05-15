import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    ShoppingBag, 
    Users, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight,
    Package,
    IndianRupee,
    AlertTriangle,
    Clock
} from 'lucide-react';
import API from '../services/api';
import './AdminDashboard.css';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <motion.div 
        className="stat-card glass-panel"
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
    >
        <div className="stat-card-header">
            <div className={`stat-icon-wrapper ${color}`}>
                <Icon size={22} />
            </div>
            {trend && (
                <div className={`stat-trend ${trend > 0 ? 'up' : 'down'}`}>
                    {trend > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span>{Math.abs(trend)}%</span>
                </div>
            )}
        </div>
        <div className="stat-card-content">
            <h3 className="stat-value">{value}</h3>
            <p className="stat-title">{title}</p>
        </div>
    </motion.div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalSales: 0,
        totalUsers: 0,
        totalProducts: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch all data
                const [ordersRes, usersRes, productsRes] = await Promise.all([
                    API.get('/api/orders/admin/all'),
                    API.get('/api/users'),
                    API.get('/api/products')
                ]);

                const totalSales = (ordersRes.data || [])
                    .filter(o => o.status !== 'Cancelled')
                    .reduce((acc, o) => acc + (o.totalPrice || 0), 0);

                setStats({
                    totalOrders: ordersRes.data?.length || 0,
                    totalSales,
                    totalUsers: usersRes.data?.length || 0,
                    totalProducts: productsRes.data?.length || 0
                });

                // Top 5 recent orders
                const recent = (ordersRes.data || []).slice(0, 5);
                setRecentOrders(recent);

                // Low stock products (less than 5)
                const lowStock = (productsRes.data || []).filter(p => p.countInStock < 5);
                setLowStockProducts(lowStock);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="admin-loading">Curating your royal data...</div>;

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div>
                    <h1 className="admin-title">Royal Insights</h1>
                    <p className="admin-subtitle">Your Shopnix performance at a glance</p>
                </div>
                <div className="admin-header-actions">
                    <button className="premium-btn">Export Report</button>
                </div>
            </header>

            <div className="stats-grid">
                <StatCard 
                    title="Total Revenue" 
                    value={`₹${stats.totalSales.toLocaleString()}`} 
                    icon={IndianRupee} 
                    trend={12} 
                    color="gold"
                />
                <StatCard 
                    title="All Orders" 
                    value={stats.totalOrders} 
                    icon={ShoppingBag} 
                    trend={8} 
                    color="purple"
                />
                <StatCard 
                    title="Royal Members" 
                    value={stats.totalUsers} 
                    icon={Users} 
                    trend={5} 
                    color="blue"
                />
                <StatCard 
                    title="Product Catalog" 
                    value={stats.totalProducts} 
                    icon={Package} 
                    trend={stats.totalProducts > 0 ? 0.5 : 0} 
                    color="rose"
                />
            </div>

            <div className="dashboard-charts-placeholder glass-panel">
                <h3>Sales Trajectory</h3>
                <div className="chart-visual">
                    {/* Placeholder for actual chart component like Recharts */}
                    <TrendingUp size={48} className="chart-icon-ghost" />
                    <p>Live sales data visualization pipeline active</p>
                </div>
            </div>

            <div className="dashboard-lists-grid">
                <div className="dashboard-list glass-panel">
                    <div className="list-header">
                        <h3><Clock size={18} /> Recent Orders</h3>
                    </div>
                    <div className="list-content">
                        {recentOrders.length === 0 ? <p>No recent orders.</p> : (
                            <table className="mini-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map(o => (
                                        <tr key={o._id}>
                                            <td>#{o._id.substring(0, 6)}</td>
                                            <td>{o.user?.name || 'Guest'}</td>
                                            <td>₹{o.totalPrice}</td>
                                            <td><span className={`status-pill ${o.status.toLowerCase()}`}>{o.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="dashboard-list glass-panel">
                    <div className="list-header">
                        <h3><AlertTriangle size={18} color="#e4a096" /> Low Stock Products</h3>
                    </div>
                    <div className="list-content">
                        {lowStockProducts.length === 0 ? <p>All products well stocked.</p> : (
                            <ul className="low-stock-list">
                                {lowStockProducts.map(p => (
                                    <li key={p._id} className="low-stock-item">
                                        <div className="item-info">
                                            <img src={p.image || (p.images && p.images[0]) || '/images/sample.jpg'} alt={p.name} />
                                            <span>{p.name}</span>
                                        </div>
                                        <div className="item-stock">
                                            <span className="stock-badge">{p.countInStock} left</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
