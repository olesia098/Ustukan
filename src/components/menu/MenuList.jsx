import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../store/menu/menuActions";
import "./menu.css";
import { useEffect } from "react";
import MenuItems from "./MenuItems";

const MenuList = () => {
  const dispatch = useDispatch();
  const { dishes, loading } = useSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  return (
    <div className="menu_main_container mb-7">
      <div className="dish_main_container conteiner">
        {dishes.map((category) => (
          <MenuItems
            key={category.category}
            category={category.category}
            items={category.items}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuList;
