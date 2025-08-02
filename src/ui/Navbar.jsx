import React, { useState, useEffect } from "react";
import logo from "../img/logo.png";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <div className="flex items-start justify-between conteiner">
        <div
          className="text-[3vh] sm:text-[4vh]"
          style={{
            fontFamily: "Ondine",
            color: "rgb(82, 30, 6)",
            display: "flex",
          }}
        >
          <p onClick={() => navigate(`/dishes/`)}>Меню</p>
          <p>/</p>
          <p onClick={() => navigate(`/drinks/`)}>Барное меню</p>
        </div>
        <div>
          <img className="h-[6vh] sm:h-[10vh]" src={logo} alt="logo" />
        </div>
      </div>

      {isMobile && (
        <motion.div
          style={{
            scaleX,
            backgroundColor: "#5b2c1c",
            height: "10px",
            width: "100%",
            position: "fixed",
            top: "auto",
            bottom: "0",
            left: "0",
            zIndex: 1000,
            transformOrigin: "0%",
          }}
        />
      )}
    </>
  );
};

export default Navbar;
