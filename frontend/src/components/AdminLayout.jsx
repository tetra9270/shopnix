import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ShoppingBag, 
    Package, 
    Users, 
    ArrowLeft, 
    LogOut,
    Crown
} from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="admin-layout">
            {/* Admin Sidebar */}
            <aside className="admin-sidebar glass-panel">
                <div className="admin-brand">
                    <Crown className="admin-brand-icon" size={24} />
                    <span className="admin-brand-text">Admin Panel</span>
                </div>

                <nav className="admin-nav">
                    <NavLink to="/admin/dashboard" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                        <ShoppingBag size={20} />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                        <Package size={20} />
                        <span>Products</span>
                    </NavLink>
                    <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
                        <Users size={20} />
                        <span>Users</span>
                    </NavLink>
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="admin-nav-item back-to-site" onClick={() => navigate('/')}>
                        <ArrowLeft size={20} />
                        <span>Storefront</span>
                    </button>
                    <button className="admin-nav-item logout-admin" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Admin Main Content */}
            <main className="admin-main">
                <div className="admin-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
