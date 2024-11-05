import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import AddUser from './screens/AddUser';
import User from './screens/User';
import Layout from './layouts/MainLayout';
import { useAuth } from './context/AuthContext';

function App() {
  const { isLoggedIn, logout } = useAuth(); // Use the hook to get login state and logout function
  const location = useLocation(); // Get the current location


  const requiresLayout = location.pathname !== '/login';

  return (
    <>
      {requiresLayout ? (
        <Layout isLoggedIn={isLoggedIn} onLogout={logout}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/user/:id" element={<User />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
}

export default App;
