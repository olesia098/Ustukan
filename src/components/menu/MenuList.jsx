import { useDispatch, useSelector } from "react-redux";
import "../../index.css";
import { getMenu } from "../../store/menu/menuActions";
import "./menu.css";
import { useEffect } from "react";
import Navbar from "../../ui/Navbar";
import { useNavigate } from "react-router-dom";

const MenuList = () => {
  const dispatch = useDispatch();
  const { dishes, loading } = useSelector((state) => state.dishes);
  // console.log(useSelector((state) => state.dishes));
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMenu());
  }, []);

  return (
    <div className="menu_main_container">
      <Navbar />
      <div className="dish_main_container conteiner">
        {dishes.map((category) => (
          <div className="dish_container" key={category.category}>
            <div className="dish_title">
              <h3>{category.category}</h3>
              {/* <p>гр</p> */}
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
                      {item.description ? (
                        <p className="dish_description">{`(${(item.description)})`}</p>
                      ) : null}
                    </div>
                    {/* <div className="gram">
                      <p>{item.grams}</p>
                    </div> */}
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
  );
};

export default MenuList;
