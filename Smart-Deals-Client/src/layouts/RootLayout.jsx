import React, { Suspense } from 'react';
import NavBar from '../components/Navbar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Suspense  fallback={<div>Loading....</div>}>
                <Outlet></Outlet>
            </Suspense>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;