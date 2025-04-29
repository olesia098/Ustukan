import React from "react";
import logo from "../img/logo.png";
import '../index.css';


const Navbar = () => {
  return (
    <div className="flex items-start justify-between conteiner">
      <div className="text-[6vh]" style={{ fontFamily: 'Ondine',  color: 'rgb(91, 44, 28)', }} >Меню</div>
      <div >
        <img className="h-[10vh]" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Navbar;
