import API from './api';

// Login user
export const loginUser = async (email, password) => {
    const { data } = await API.post('/api/users/login', { email, password });
    return data;
};

// Register user
export const registerUser = async (name, email, password) => {
    const { data } = await API.post('/api/users', { name, email, password });
    return data;
};
