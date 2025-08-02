import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TextField, Button, Box, Typography } from "@mui/material";
import { updateDish } from "../store/menu/menuActions";
import { updateDrink } from "../store/bar/barActions";
import { updateAlco } from "../store/alcohole/alcoActions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadGroup from "../components/cloudinary/CloudUploadGroup";
import { useCloudinary } from "../components/cloudinary/useCloudinary";
import VideoTest from "../components/cloudinary/VideoTest";

const EditItem = () => {
  const { itemType, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { item, category } = location.state || {};

  const [form, setForm] = useState({
    id: item?.id || 0,
    name: item?.name || "",
    description: item?.description || "",
    grams: item?.grams || "",
    price: item?.price || "",
    video: item?.video || "",
    photo: item?.photo || [],
  });

  const [cat] = useState(category || "");

  // Используем хук useCloudinary для загрузки медиафайлов
  const {
    uploading,
    uploadProgress,
    handleVideoUpload: cloudinaryVideoUpload,
    handlePhotoUpload: cloudinaryPhotoUpload,
  } = useCloudinary();

  // Обработчики для Cloudinary с обновлением состояния формы
  const handleVideoUpload = async (e) => {
    try {
      const videoUrl = await cloudinaryVideoUpload(e);
      setForm((prev) => ({ ...prev, video: videoUrl }));
      alert("Видео успешно загружено!");
    } catch (error) {
      alert("Ошибка при загрузке видео: " + error.message);
    }
  };

  const handlePhotoUpload = async (e) => {
    try {
      const photoUrls = await cloudinaryPhotoUpload(e);
      setForm((prev) => ({ ...prev, photo: [...prev.photo, ...photoUrls] }));
      alert("Фото успешно загружены!");
    } catch (error) {
      alert("Ошибка при загрузке фото: " + error.message);
    }
  };

  // Функции для удаления медиафайлов
  const handleVideoDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить видео?")) {
      setForm((prev) => ({ ...prev, video: "" }));
      alert("Видео удалено!");
    }
  };

  const handlePhotoDelete = (index) => {
    if (window.confirm("Вы уверены, что хотите удалить это фото?")) {
      setForm((prev) => ({
        ...prev,
        photo: prev.photo.filter((_, i) => i !== index),
      }));
      alert("Фото удалено!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let action;
      switch (itemType) {
        case "dish":
          action = updateDish({
            category: cat,
            itemId: Number(id),
            updatedDish: form,
          });
          break;
        case "drink":
          action = updateDrink({
            category: cat,
            itemId: Number(id),
            updatedDrink: form,
          });
          break;
        case "alco":
          action = updateAlco({
            category: cat,
            itemId: Number(id),
            updatedAlco: form,
          });
          break;
        default:
          throw new Error("Неизвестный тип позиции");
      }

      await dispatch(action).unwrap();
      alert("Информация успешно обновлена!");
      navigate(-1);
    } catch (error) {
      alert("Ошибка при обновлении информации: " + error.message);
    }
  };

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography variant="h6">Позиция не найдена</Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center mb-6">
          <ArrowBackIcon
            className="mr-2 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <Typography variant="h4" component="h1">
            Редактировать {itemType === "dish" ? "блюдо" : "напиток"}
          </Typography>
        </div>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {item.name}
          </Typography>

          <TextField
            fullWidth
            label="Название"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          {itemType === "dish" && (
            <>
              <TextField
                fullWidth
                label="Описание"
                name="description"
                value={form.description}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={3}
              />
            </>
          )}

          <TextField
            fullWidth
            label="Граммы/мл"
            name="grams"
            value={form.grams}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Цена"
            name="price"
            value={form.price}
            onChange={handleChange}
            margin="normal"
            required
            type="number"
          />

          {itemType === "dish" && (
            <>
              {/* Компонент загрузки медиафайлов */}
              <CloudUploadGroup
                onVideoUpload={handleVideoUpload}
                onPhotoUpload={handlePhotoUpload}
                onVideoDelete={handleVideoDelete}
                onPhotoDelete={handlePhotoDelete}
                videoUrl={form.video}
                photoUrls={form.photo}
                uploading={uploading}
                uploadProgress={uploadProgress}
                showVideo={true}
                showPhoto={true}
                showDeleteButtons={true}
              />

              {/* Тест видео для диагностики */}
              {/* {form.video && <VideoTest videoUrl={form.video} />} */}
            </>
          )}

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#5b2c1c",
                "&:hover": { backgroundColor: "#4a2417" },
              }}
            >
              Сохранить
            </Button>
            <Button variant="outlined" onClick={() => navigate(-1)}>
              Отмена
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default EditItem;
