import { useLocation, useNavigate } from "react-router-dom";
import "./menu.css";

const MenuItems = ({ category, items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dish_container">
      <div className="dish_title">
        <h3>{category}</h3>
        <p>цена</p>
      </div>
      <div>
        {items.map((item) => (
          <div key={item.id} className="dish">
            <div
              className="dish_container_about"
              onClick={() =>
                location.pathname === "/dishes/" &&
                navigate(`/dishes/${item.id}`)
              }
            >
              <p className="dish_name">{item.name}</p>
              {item.description ? (
                <p className="dish_description">({item.description})</p>
              ) : null}
            </div>
            <div className="price">
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
