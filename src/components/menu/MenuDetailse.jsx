import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneDishes } from "../../store/menu/menuActions";
import { useParams } from "react-router-dom";

const MenuDetailse = () => {
  const { oneDishes, loading } = useSelector((state) => state.dishes);

//   console.log(useSelector(
//       (state) => state.dishes
//   ))

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id, "useParams");

  useEffect(() => {
    if (id) {
      dispatch(getOneDishes({ id }));
    }
  }, [dispatch, id]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ height: "100vh", width: "40vw", overflow: "hidden" }}>
        <iframe
          src={oneDishes?.video}
          width="100%"
          height="100%"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
      {/* <div
        style={{
          width: "30vh",
          padding: "1vh",
        }}
      >
        <h3 className="dish_title">{oneDishes?.name}</h3>
      </div> */}
    </div>
  );
};

export default MenuDetailse;
