import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import BarPage from '../pages/BarPage';
import MenuPage from '../pages/MenuPage';

const RoutesHomeMenu = () => {
    return (
        <Routes>
            <Route path="/dishes/" element={<MenuPage/>} />
            <Route path="/dishes/:id" element={<DetailPage />} />
            <Route path="/drinks/" element={<BarPage/>} />
        </Routes>
    );
};

export default RoutesHomeMenu;