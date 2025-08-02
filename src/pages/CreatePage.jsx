import React from "react";
import MenuPage from "./MenuPage";
import BarPage from "./BarPage";
import DishesForm from "../components/admin/DishesForm";
import DrinkForm from "../components/admin/DrinkForm";
import AlcoForm from "../components/admin/AlcoForm";

const CreatePage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        <div>
          <h2 className="text-[#5b2c1c] font-semibold text-2xl py-5 w-full border-b border-slate-700 text-center mb-4">
            Добавить блюдо
          </h2>
          <DishesForm />
        </div>
        <div>
          <h2 className="text-[#5b2c1c] font-semibold text-2xl py-5 w-full border-b border-slate-700 text-center mb-4">
            Добавить напиток
          </h2>
          <DrinkForm />
        </div>
        <div>
          <h2 className="text-[#5b2c1c] font-semibold text-2xl py-5 w-full border-b border-slate-700 text-center mb-4">
            Добавить алкоголь
          </h2>
          <AlcoForm />
        </div>
      </div>

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
