import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneDishes } from "../../store/menu/menuActions";
import gray from "../../assets/img/gray.svg";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Loading from "../../ui/loader/Loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const DetailsMain = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { dishes, loading, oneDishes } = useSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(getOneDishes({ id })); // не забывай, getOneDishes принимает объект { id }
    console.log(oneDishes);
  }, [id]);

  useEffect(() => {
    if (oneDishes?.photo?.length) {
      setActiveImage(oneDishes.photo[0]);
    }
  }, [oneDishes]);

  //   useEffect(() => {
  //     if ((!isLoading && !oneProduct) || !oneProduct?.translations) {
  //       // getOneProductById(slug);

  //       console.log(oneProduct);
  //       navigate(-1);
  //     }
  //   }, [isLoading, oneProduct]);

  if (loading || !oneDishes)
    return (
      <div className="h-800 flex justify-center items-center">
        <Loading />
      </div>
    );

  const ImageWrapper = ({ src }) => (
    <div className="w-full overflow-hidden">
      <img
        className="w-full h-[500px] sm:h-[700px] object-cover border-none "
        src={src}
        alt="product"
      />
    </div>
  );

  const ImageWrapper2 = ({ src, onClick }) => (
    <div
      className="h-[180px] sm:h-[220px] max-w-[110px] sm:max-w-[150px] overflow-hidden pb-2 cursor-pointer w-full"
      onClick={onClick}
    >
      <img
        className="w-full h-full object-cover border-none rounded-xl"
        src={src}
        alt="product-thumbnail"
      />
    </div>
  );

  return (
    <div>
      <ArrowBackIcon
        className="m-4 mt-0 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="h-[500px] sm:h-[700px] flex gap-1">
        <div className="absolute top-36 w-1/3">
          <Accordion
            defaultExpanded
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
            }}
          >
            <AccordionSummary
              expandIcon={
                <ArrowDownwardIcon
                  style={{
                    color: "#fff",
                  }}
                />
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">{oneDishes.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{oneDishes.description}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <ImageWrapper src={activeImage ? activeImage : gray} />

        <div className="img-carousel h-full overflow-y-scroll">
          {oneDishes?.photo?.map((item, key) => {
            const imageSrc = item ? item : gray; // если item нет, то серое изображение
            return (
              <ImageWrapper2
                key={key}
                src={imageSrc}
                onClick={() => setActiveImage(imageSrc)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailsMain;
