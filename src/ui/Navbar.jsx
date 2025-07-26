import React from "react";
import logo from "../img/logo.png";
import "../index.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-start justify-between conteiner">
      <div
        className="text-[3vh] sm:text-[4vh]"
        style={{ fontFamily: "Ondine", color: "rgb(82, 30, 6)", display: "flex" }}
      >
        <p onClick={()=> navigate(`/dishes/`)}>Меню</p>
        <p>/</p>
        <p onClick={()=> navigate(`/drinks/`)}>Барное меню</p>
      </div>
      <div>
        <img className="h-[6vh] sm:h-[10vh]" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Navbar;
