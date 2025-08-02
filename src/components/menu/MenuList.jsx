import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../store/menu/menuActions";
import "./menu.css";
import { useEffect } from "react";
import MenuItems from "./MenuItems";

const MenuList = () => {
  const dispatch = useDispatch();
  const { dishes } = useSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  return (
    <div className="menu_main_container mb-7">
      <div className="dish_main_container conteiner">
        {dishes && dishes.length > 0 ? (
          dishes.map((category) => (
            <MenuItems
              key={category.category}
              category={category.category}
              items={category.items}
              itemType="dish"
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500"></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuList;
