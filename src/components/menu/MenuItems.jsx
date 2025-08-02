import { useLocation, useNavigate } from "react-router-dom";
import "./menu.css";
import { useDispatch } from "react-redux";
import { deleteDish } from "../../store/menu/menuActions";
import { deleteDrink } from "../../store/bar/barActions";
import { deleteAlco } from "../../store/alcohole/alcoActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const MenuItems = ({ category, items, itemType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAdminRoute = location.pathname.includes("/igoradmin908711542");

  const handleDelete = async (item, itemType) => {
    const confirmDelete = window.confirm(
      `Вы уверены, что хотите удалить "${item.name}"?`
    );

    if (confirmDelete) {
      try {
        switch (itemType) {
          case "dish":
            await dispatch(deleteDish({ category, itemId: item.id })).unwrap();
            break;
          case "drink":
            await dispatch(deleteDrink({ category, itemId: item.id })).unwrap();
            break;
          case "alco":
            await dispatch(deleteAlco({ category, itemId: item.id })).unwrap();
            break;
          default:
            break;
        }
        alert("Позиция успешно удалена!");
      } catch (error) {
        alert("Ошибка при удалении: " + error.message);
      }
    }
  };

  const handleEdit = (item, itemType) => {
    navigate(`/edit-item/${itemType}/${item.id}`, {
      state: { item, category, itemType },
    });
  };

  return (
    <div className="dish_container">
      <div className="dish_title">
        <h3>{category}</h3>

        {/* Заголовки для колонок (2 столбца) */}
        <div
          className={
            location.pathname === "/drinks/"
              ? "dish_header_columns"
              : "dish_header_columns2"
          }
        >
          {category === "Топпинги к чаю"
            ? location.pathname === "/drinks/" && <p>гр</p>
            : location.pathname === "/drinks/" && <p>мл</p>}
          <p>цена</p>
        </div>
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
              {item.description && (
                <p className="dish_description">({item.description})</p>
              )}
            </div>
            <div
              className={
                location.pathname === "/drinks/"
                  ? "price_columns"
                  : "price_columns2"
              }
            >
              {location.pathname === "/drinks/" ? <p>{item.grams}</p> : ""}
              <p>{item.price}</p>
            </div>

            {isAdminRoute && (
              <div className="admin_buttons">
                <IconButton
                  size="small"
                  onClick={() => handleEdit(item, itemType)}
                  sx={{ color: "#5b2c1c" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(item, itemType)}
                  sx={{ color: "#5b2c1c" }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
