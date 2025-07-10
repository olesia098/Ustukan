import React from "react";
import Navbar from "../../ui/Navbar";
import "./menu_home.css";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css";
import { getMenu } from "../../store/menu/menuActions";
import "../menu/menu.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MenuHomeList = () => {
  const dispatch = useDispatch();
  const { dishes, loading } = useSelector((state) => state.dishes);
  // console.log(useSelector((state) => state.dishes));
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMenu());
  }, []);

  return (
    <div>
      <Navbar />
      <div className="menu_home_container_main">
        <div className="menu_home_container">
          {dishes.map((category) => (
            <div className="dish_container" key={category.category}>
              <div className="dish_title">
                <h3>{category.category}</h3>
                <p>гр</p>
                <p>цена</p>
              </div>
              <div>
                {category.items.map((item) => (
                  <div key={item.id}>
                    <div className="dish">
                      <div className="dish_container_about">
                        <p
                          onClick={() => navigate(`/dishes/${item.id}`)}
                          className="dish_name"
                        >
                          {item.name}
                        </p>
                        <p className="dish_description">{item.description}</p>
                      </div>
                      <div className="gram">
                        <p>{item.grams}</p>
                      </div>
                      <div className="price">
                        <p>{item.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuHomeList;
