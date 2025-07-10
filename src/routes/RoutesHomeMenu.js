import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MenuHomeList from '../components/menu_home/MenuHomeList';

const RoutesHomeMenu = () => {
    return (
        <Routes>
            <Route path="/home_dishes/" element={<MenuHomeList />} />
        </Routes>
    );
};

export default RoutesHomeMenu;