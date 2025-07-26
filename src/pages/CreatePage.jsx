import React from "react";
import MenuPage from "./MenuPage";
import BarList from "../components/menu/BarList";
import BarPage from "./BarPage";
import DishesForm from "../components/admin/DishesForm";

const CreatePage = () => {
  return (
    <div>
      <DishesForm/>
      <p className="text-[#5b2c1c] font-semibold text-2xl py-5 w-full border-y border-slate-700 text-center">
        Блюда
      </p>
      <MenuPage />
      <p className="text-[#5b2c1c] font-semibold text-2xl py-5 w-full border-y border-slate-700 text-center">
        Бар
      </p>
      <BarPage />
    </div>
  );
};

export default CreatePage;
