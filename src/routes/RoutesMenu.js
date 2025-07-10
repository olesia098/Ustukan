import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuList from '../components/menu/MenuList';
import App from '../App';

const RoutesHomeMenu = () => {
    return (
        <Routes>
            <Route path="/dishes/" element={<MenuList/>} />
            <Route path="/dishes/:id" element={<App />} />
        </Routes>
    );
};

export default RoutesHomeMenu;