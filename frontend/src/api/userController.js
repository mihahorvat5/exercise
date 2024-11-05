import axios from 'axios';
import { API_URL } from '../settings';

export const fetchHomeData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching home data:', error);
        throw error;
    }
};

export const fetchUsers = async (sessionToken) => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const fetchUsersDB = async (sessionToken) => {
    try {
        const response = await axios.get(`${API_URL}/usersDB`, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users from DB:', error);
        throw error;
    }
};

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const loginDB = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/loginDB`, {
            username: username,
            password: password,
        });
        return response.data;
    } catch (error) {
        console.error('Error logging into DB:', error);
        throw error;
    }
};

export const createUser = async (userData, sessionToken) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const createUserDB = async (userData, sessionToken) => {
    try {
        const response = await axios.post(`${API_URL}/usersDB`, userData, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user in DB:', error);
        throw error;
    }
};

export const updateUser = async (userId, userData, sessionToken) => {
    try {
        const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const updateUserDB = async (userId, userData, sessionToken) => {
    try {
        const response = await axios.put(`${API_URL}/usersDB/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user in DB:', error);
        throw error;
    }
};

export const deleteUser = async (userId, sessionToken) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export const deleteUserDB = async (userId, sessionToken) => {
    try {
        const response = await axios.delete(`${API_URL}/usersDB/${userId}`, {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user from DB:', error);
        throw error;
    }
};
