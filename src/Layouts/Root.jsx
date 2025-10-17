import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header></Header>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;