import axios from 'axios';
import { API_URL_ONLINE } from '../settings';

export const fetchOnlineUsers = async (limit = 20) => {
    try {
        const response = await axios.get(`${API_URL_ONLINE}/users`, {
            params: { limit } // Set the limit parameter for the request
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching online users:', error);
        throw error;
    }
};

export const addOnlineUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL_ONLINE}/users/add`, userData);
        return response.data;
    } catch (error) {
        console.error('Error adding online user:', error);
        throw error;
    }
};

export const updateOnlineUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL_ONLINE}/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error updating online user:', error);
        throw error;
    }
};

export const deleteOnlineUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL_ONLINE}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting online user:', error);
        throw error;
    }
};
