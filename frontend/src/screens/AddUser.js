import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';

const AddUser = () => {
    const { users, addUser } = useUser();
    const { sessionToken } = useAuth();
    const [newUserData, setNewUserData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        image: '',
        visible: false,
    });
    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    useEffect(() => {
        if (!sessionToken) {
            setNewUserData((prevData) => ({ ...prevData, id: '' }));
            setInfoMessage('To access this feature, please log in.');
        } else {
            const newId = users.length + 1;
            setNewUserData((prevData) => ({ ...prevData, id: newId }));
            setInfoMessage('');
        }
    }, [sessionToken, users]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sessionToken) {
            setError('Please log in to add a new user.');
            return;
        }
        try {
            await addUser(newUserData);
            setNewUserData({
                id: '',
                firstName: '',
                lastName: '',
                age: '',
                gender: '',
                email: '',
                phone: '',
                image: '',
                visible: false,
            });
            setError('');
            setInfoMessage('User added successfully!');
        } catch (error) {
            console.error('Error adding user:', error);
            setError('Failed to add user. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center">
            {/*
            <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
            */}
            <div className="max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Add New User</h2>
                
                {infoMessage && <p className="text-yellow-600 text-center mb-2">{infoMessage}</p>}
                {error && <p className="text-red-600 text-center mb-2">{error}</p>}
                
                {sessionToken ? (
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {/* First Name */}
                        <div className="flex flex-col">
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={newUserData.firstName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                required
                            />
                        </div>
                        
                        {/* Last Name */}
                        <div className="flex flex-col">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={newUserData.lastName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                required
                            />
                        </div>
                        
                        {/* Age */}
                        <div className="flex flex-col">
                            <label>Age:</label>
                            <input
                                type="number"
                                name="age"
                                value={newUserData.age}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                required
                            />
                        </div>
                        
                        {/* Gender */}
                        <div className="flex flex-col">
                            <label>Gender:</label>
                            <input
                                type="text"
                                name="gender"
                                value={newUserData.gender}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                required
                            />
                        </div>
                        
                        {/* Email */}
                        <div className="flex flex-col">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={newUserData.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                required
                            />
                        </div>
                        
                        {/* Phone */}
                        <div className="flex flex-col">
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={newUserData.phone}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 w-full"
                                required
                            />
                        </div>
                        
                        {/* Image URL */}
                        <div className="flex flex-col">
                            <label>Image URL:</label>
                            <input
                                type="text"
                                name="image"
                                value={newUserData.image}
                                onChange={handleChange}
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>
                        
                        {/* Visible Checkbox */}
                        <div className="flex items-center justify-center">
                            <input
                                type="checkbox"
                                name="visible"
                                checked={newUserData.visible}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label>Visible</label>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                                Add User
                            </button>
                        </div>
                    </form>
                ) : null}
            </div>
        </div>
    );
};

export default AddUser;
