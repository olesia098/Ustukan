import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DetailPage from '../pages/DetailPage';
import BarPage from '../pages/BarPage';
import MenuPage from '../pages/MenuPage';
import CreatePage from '../pages/CreatePage';

const RoutesHomeMenu = () => {
    return (
        <Routes>
            <Route path="/dishes/" element={<MenuPage/>} />
            <Route path="/dishes/:id" element={<DetailPage />} />
            <Route path="/drinks/" element={<BarPage/>} />
            <Route path="/igoradmin908711542/" element={<CreatePage/>} />
        </Routes>
    );
};

export default RoutesHomeMenu;