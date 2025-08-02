import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailPage from "../pages/DetailPage";
import BarPage from "../pages/BarPage";
import MenuPage from "../pages/MenuPage";
import CreatePage from "../pages/CreatePage";
import EditItem from "../pages/EditItem";

const RoutesHomeMenu = () => {
  return (
    <Routes>
      <Route path="/dishes/" element={<MenuPage />} />
      <Route path="/dishes/:id" element={<DetailPage />} />
      <Route path="/drinks/" element={<BarPage />} />
      <Route path="/igoradmin908711542/" element={<CreatePage />} />
      <Route path="/edit-item/:itemType/:id" element={<EditItem />} />
    </Routes>
  );
};

export default RoutesHomeMenu;
