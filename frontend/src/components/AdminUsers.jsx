import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    Trash2, 
    Search, 
    Crown, 
    Mail, 
    Calendar,
    ShieldCheck,
    UserX
} from 'lucide-react';
import API from '../services/api';
import './AdminUsers.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/api/users');
            setUsers(data || []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id, isAdmin) => {
        if (isAdmin) {
            alert('Cannot delete an administrator.');
            return;
        }
        if (window.confirm('Are you sure you want to remove this member from the kingdom?')) {
            try {
                await API.delete(`/api/users/${id}`);
                fetchUsers();
            } catch (error) {
                alert('Failed to delete user: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-users">
            <header className="page-header">
                <div>
                    <h1 className="page-title">Royal Registry</h1>
                    <p className="subtitle">Manage and oversee all members of your empire</p>
                </div>
                <div className="search-box glass-panel">
                    <Search size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {loading ? (
                <div className="admin-loading">Consulting the royal scrolls...</div>
            ) : (
                <div className="users-list-container glass-panel">
                    <div className="users-list-header">
                        <div className="col-user">Member</div>
                        <div className="col-email">Email Address</div>
                        <div className="col-role">Rank</div>
                        <div className="col-joined">Joined On</div>
                        <div className="col-actions">Actions</div>
                    </div>
                    <div className="users-list-body">
                        {filteredUsers.map(user => (
                            <motion.div 
                                key={user._id} 
                                className="user-list-row"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="col-user">
                                    <div className="user-avatar-placeholder">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="user-name">{user.name}</span>
                                </div>
                                <div className="col-email">
                                    <div className="email-wrapper">
                                        <Mail size={14} />
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                                <div className="col-role">
                                    {user.isAdmin ? (
                                        <span className="role-chip admin">
                                            <Crown size={12} /> Administrator
                                        </span>
                                    ) : (
                                        <span className="role-chip member">
                                            <ShieldCheck size={12} /> Member
                                        </span>
                                    )}
                                </div>
                                <div className="col-joined">
                                    <div className="date-wrapper">
                                        <Calendar size={14} />
                                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="col-actions">
                                    {!user.isAdmin ? (
                                        <button 
                                            className="user-delete-btn" 
                                            onClick={() => handleDeleteUser(user._id, user.isAdmin)}
                                            title="Delete User"
                                        >
                                            <UserX size={18} />
                                        </button>
                                    ) : (
                                        <div className="admin-action-placeholder">Primary</div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {!filteredUsers.length && (
                        <div className="no-users-found">No members found matching your search.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
