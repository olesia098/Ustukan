import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./menu.css";
import { useEffect } from "react";
import MenuItems from "./MenuItems";
import { getDrinks } from "../../store/bar/barActions";
import { getAlcoholes } from "../../store/alcohole/alcoActions";

const BarList = () => {
  const dispatch = useDispatch();
  const { drinks, loading } = useSelector((state) => state.drinks);
  const { alcoholes } = useSelector((state) => state.alcoholes);

  useEffect(() => {
    dispatch(getDrinks());
    dispatch(getAlcoholes());
  }, []);

  return (
    <div className="menu_main_container mb-7">
      <div className="dish_main_container conteiner">
        {drinks.map((category) => (
          <MenuItems
            key={category.category}
            category={category.category}
            items={category.items}
          />
        ))}
         {alcoholes.map((category) => (
          <MenuItems
            key={category.category}
            category={category.category}
            items={category.items}
          />
        ))}
      </div>
      {/* <div className="dish_main_container conteiner">
        <p>Алкогольное меню</p>
        {alcoholes.map((category) => (
          <MenuItems
            key={category.category}
            category={category.category}
            items={category.items}
          />
        ))}
      </div> */}
    </div>
  );
};

export default BarList;
