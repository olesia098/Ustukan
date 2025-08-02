import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./menu.css";
import { useEffect } from "react";
import MenuItems from "./MenuItems";
import { getDrinks } from "../../store/bar/barActions";
import { getAlcoholes } from "../../store/alcohole/alcoActions";

const BarList = () => {
  const dispatch = useDispatch();
  const { drinks } = useSelector((state) => state.drinks);
  const { alcoholes } = useSelector((state) => state.alcoholes);

  useEffect(() => {
    dispatch(getDrinks());
    dispatch(getAlcoholes());
  }, [dispatch]);

  return (
    <div className="menu_main_container mb-7">
      <div className="dish_main_container conteiner">
        {drinks &&
          drinks.length > 0 &&
          drinks.map((category) => (
            <MenuItems
              key={category.category}
              category={category.category}
              items={category.items}
              itemType="drink"
            />
          ))}
        {alcoholes &&
          alcoholes.length > 0 &&
          alcoholes.map((category) => (
            <MenuItems
              key={category.category}
              category={category.category}
              items={category.items}
              itemType="alco"
            />
          ))}
        {(!drinks || drinks.length === 0) &&
          (!alcoholes || alcoholes.length === 0) && (
            <div className="text-center py-8">
              <p className="text-gray-500">Загрузка напитков...</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default BarList;
