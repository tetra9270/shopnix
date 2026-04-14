import API from './api';

// Create a new order
export const createOrder = async (orderData) => {
    const { data } = await API.post('/api/orders', orderData);
    return data;
};

// Get logged-in user's orders
export const getMyOrders = async () => {
    const { data } = await API.get('/api/orders/myorders');
    return data;
};

// Get a specific order by ID
export const getOrderById = async (orderId) => {
    const { data } = await API.get(`/api/orders/${orderId}`);
    return data;
};

// Cancel an order
export const cancelOrder = async (orderId, reason = '') => {
    const { data } = await API.put(`/api/orders/${orderId}/cancel`, { reason });
    return data;
};

// Admin: Get all orders
export const getAllOrders = async () => {
    const { data } = await API.get('/api/orders/admin/all');
    return data;
};

// Admin: Update order status
export const updateOrderStatus = async (orderId, status) => {
    const { data } = await API.put(`/api/orders/${orderId}/status`, { status });
    return data;
};
