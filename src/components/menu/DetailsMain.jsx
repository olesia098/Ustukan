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
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, oneDishes } = useSelector((state) => state.dishes);

  useEffect(() => {
    dispatch(getOneDishes({ id })); // не забывай, getOneDishes принимает объект { id }
  }, [id, dispatch]);

  useEffect(() => {
    console.log(oneDishes);
  }, [oneDishes]);

  useEffect(() => {
    if (oneDishes?.photo && oneDishes.photo.length > 0) {
      setActiveImage(oneDishes.photo[0]);
    } else {
      setActiveImage(gray);
    }
  }, [oneDishes]);

  //   useEffect(() => {
  //     if ((!isLoading && !oneProduct) || !oneProduct?.translations) {
  //       // getOneProductById(slug);

  //       console.log(oneProduct);
  //       navigate(-1);
  //     }
  //   }, [isLoading, oneProduct]);

  if (loading) {
    return (
      <div className="h-800 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!oneDishes) {
    return (
      <div className="h-800 flex justify-center items-center">
        <div className="text-center">
          <p className="text-xl mb-4">Блюдо не найдено</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Вернуться назад
          </button>
        </div>
      </div>
    );
  }

  const ImageWrapper = ({ src }) => (
    // <div className="w-full overflow-hidden">
    <img
      className="w-full h-[700px] sm:h-[700px] object-cover border-none "
      src={src}
      alt="product"
    />
    // </div>
  );

  const ImageWrapper2 = ({ src, onClick }) => (
    <div
      className="w-[200px] sm:w-[300px] pb-2 cursor-pointer"
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
        className="mb-2 ml-4 cursor-pointer"
        onClick={() => navigate(-1)}
      />
      <div className="h-full w-full flex flex-col gap-1">
        <div className="absolute top-36 sm:top-44 w-2/5">
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

        <div className="img-carousel w-full flex flex-row overflow-x-scroll space-x-2">
          {oneDishes?.photo && oneDishes.photo.length > 0 ? (
            oneDishes.photo.map((item, key) => {
              const imageSrc = item || gray;
              return (
                <ImageWrapper2
                  key={key}
                  src={imageSrc}
                  onClick={() => setActiveImage(imageSrc)}
                />
              );
            })
          ) : (
            <div className="flex items-center justify-center w-full py-8">
              <p className="text-gray-500">Фотографии отсутствуют</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsMain;
