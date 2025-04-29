import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneDishes } from "../../store/menu/menuActions";
import { useParams } from "react-router-dom";

const MenuDetailse = () => {

    const {oneDishe, loading} = useSelector(
        (state) => state.dishes
    );
    const dispatch = useDispatch();
    const { id } = useParams();

      useEffect(() => {
        dispatch(getOneDishes({id}));
      }, [id]);

    return (
      <div style={{display: "flex"}}>
        <div style={{ height: '100vh', width: '29vw', overflow: 'hidden'}}>
        <iframe
          src="https://player.cloudinary.com/embed/?cloud_name=dx0z3ycxj&public_id=wmzomirwhctxxbhizrni&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false&player[colors][base]=%23FFFFFF&player[colors][accent]=%230E88FF"
          width="100%"
          height="100%"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        ></iframe>
        </div>
        <div style={{width: "30vh", padding: "1vh", backgroundColor: "rgba(179, 177, 177, 0.407)"}}>
            <h3 className="dish_title">САЛАТ АРИСТОКРАТ</h3>
        </div>
      </div>
    );
  };
  
  export default MenuDetailse;
  
