import React, { useState, useEffect } from 'react';
import { useOnlineUser } from '../context/OnlineUserContext';
import { useUser } from '../context/UserContext';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

const User = () => {
    const { id } = useParams();
    const { onlineUsers, updateOnlineUser, removeOnlineUser } = useOnlineUser();
    const { users, updateUser, deleteUser } = useUser();
    const { sessionToken } = useAuth();
    
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        phone: '',
        image: '',
        visible: false,
    });
    const [userDeleted, setUserDeleted] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        const userList = sessionToken ? users : onlineUsers;
        const foundUser = userList.find((u) => u.id === parseInt(id));

        if (foundUser) {
            setUser(foundUser);
            setEditedUserData({
                firstName: foundUser.firstName || '',
                lastName: foundUser.lastName || '',
                age: foundUser.age || '',
                gender: foundUser.gender || '',
                email: foundUser.email || '',
                phone: foundUser.phone || '',
                image: foundUser.image || '',
                visible: foundUser.visible || false,
            });
            setUserDeleted(false);
        } else {
            setUser(null);
            setUserDeleted(true);
        }
    }, [id, sessionToken, users, onlineUsers]);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setEditedUserData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async () => {
        setSaveError(null);
        try {
            const dataToSend = { ...editedUserData };

            if (sessionToken) {
                await updateUser(user.id, dataToSend);
            } else {
                await updateOnlineUser(user.id, dataToSend);
            }
            setUser(dataToSend);
            setIsEditing(false);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setSaveError("You do not have permission to interact with this User since you are not it's creator!");
            } else {
                setSaveError(error.message || 'An error occurred while saving user data.');
            }
            setShowErrorModal(true);
            console.error('Error saving user data:', error);
        }
    };

    const handleDelete = async () => {
        setDeleteError(null);
        try {
            if (sessionToken) {
                await deleteUser(user.id);
            } else {
                await removeOnlineUser(user.id);
            }
            setUserDeleted(true);
            setUser(null);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setDeleteError("You do not have permission to interact with this User since you are not it's creator!");
            } else {
                setDeleteError(error.message || 'An error occurred while deleting user data.');
            }
            setShowErrorModal(true);
            console.error('Error deleting user:', error);
        }
    };

    const closeModal = () => {
        setShowErrorModal(false);
        setSaveError(null);
        setDeleteError(null);
    };

    if (userDeleted) return <p>User no longer exists!</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div className="flex justify-center items-center">
            <div className="max-w-xl w-full flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg overflow-hidden">
                
                {/* Left Column - User Image */}
                <div className="md:w-2/5 p-4 flex justify-center items-center">
                    <img
                        src={user.image || 'https://via.placeholder.com/150?text=No+Image'}
                        alt="User"
                        className="w-32 rounded-full border border-gray-200"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image' }}
                    />
                </div>

                {/* Right Column - User Information */}
                <div className="w-full md:w-2/3 p-4 space-y-2">
                    <h2 className="text-xl font-bold">{`UID: ${user.id}`}</h2>
                    
                    {/* Editable user details */}
                    {[
                        { label: 'First Name', name: 'firstName', type: 'text', value: editedUserData.firstName },
                        { label: 'Last Name', name: 'lastName', type: 'text', value: editedUserData.lastName },
                        { label: 'Age', name: 'age', type: 'number', value: editedUserData.age },
                        { label: 'Gender', name: 'gender', type: 'text', value: editedUserData.gender },
                        { label: 'Email', name: 'email', type: 'email', value: editedUserData.email },
                        { label: 'Phone', name: 'phone', type: 'tel', value: editedUserData.phone },
                    ].map(({ label, name, type, value }) => (
                        <div key={name} className="flex items-center">
                            <label className="w-2/5 font-medium">{label}:</label>
                            {isEditing ? (
                                <input
                                    type={type}
                                    name={name}
                                    value={value}
                                    onChange={handleChange}
                                    className="border rounded p-1 flex-grow"
                                />
                            ) : (
                                <span className="flex-grow w-1 break-all">{user[name]}</span>
                            )}
                        </div>
                    ))}

                    {/* Only for logged-in users */}
                    {sessionToken && (
                        <>
                            {/* Visibility Checkbox */}
                            <div className="flex items-center">
                                <label className="w-2/5 font-medium">Visible for Everyone:</label>
                                {isEditing ? (
                                    <input
                                        type="checkbox"
                                        name="visible"
                                        checked={editedUserData.visible}
                                        onChange={handleChange}
                                        className="m-1"
                                    />
                                ) : (
                                    <span className="flex-grow">{user.visible ? 'Yes' : 'No'}</span>
                                )}
                            </div>

                            {/* Image URL (only editable when editing) */}
                            {isEditing && (
                                <div className="flex items-center">
                                    <label className="w-2/5 font-medium">Image URL:</label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={editedUserData.image || ''}
                                        onChange={handleChange}
                                        className="border rounded p-1 m-1 flex-grow"
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {/* Save and Cancel buttons for editing mode */}
                    <div className="mt-4 flex space-x-2">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">Save</button>
                                <button onClick={() => setIsEditing(false)} className="bg-red-500 text-white p-2 rounded">Cancel</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2 rounded">Edit</button>
                                <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Error Modal */}
            {showErrorModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="p-6 rounded shadow-lg max-w-md w-full bg-customBlue">
                        <h3 className="text-lg font-semibold text-customOrange">Error</h3>
                        <p className="mt-2 text-white">
                            {saveError || deleteError}
                        </p>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;
//rr