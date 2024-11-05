import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = (isOpen) => setSidebarOpen(isOpen);

    return (
        <div className="flex min-h-screen flex-col">
            <Header toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="flex flex-col flex-grow p-4">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;