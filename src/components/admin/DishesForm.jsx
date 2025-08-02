import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addNewDish, getMenu } from "../../store/menu/menuActions";
import CloudUploadGroup from "../cloudinary/CloudUploadGroup";
import { useCloudinary } from "../cloudinary/useCloudinary";
// import CloudinaryTest from "../cloudinary/CloudinaryTest";

const DishesForm = () => {
  const dispatch = useDispatch();
  const { dishes } = useSelector((state) => state.dishes);
  const [cat, setCat] = useState("");

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);

  // Отладочная информация для проверки переменных окружения
  useEffect(() => {
    console.log("=== ПРОВЕРКА ПЕРЕМЕННЫХ ОКРУЖЕНИЯ ===");
    console.log(
      "REACT_APP_CLOUDINARY_CLOUD_NAME:",
      process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
    );
    console.log(
      "REACT_APP_CLOUDINARY_UPLOAD_PRESET:",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    console.log("NODE_ENV:", process.env.NODE_ENV);
    console.log("=====================================");
  }, []);

  const [form, setForm] = useState({
    id: 0,
    name: "",
    description: "",
    grams: "",
    price: "",
    video: "",
    photo: [],
  });

  const {
    uploading,
    uploadProgress,
    handleVideoUpload: cloudinaryVideoUpload,
    handlePhotoUpload: cloudinaryPhotoUpload,
  } = useCloudinary();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      id: Math.floor(Math.random() * 1000000), // ✅ генерируем новый id каждый раз
      [name]: value,
    }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addNewDish({
        category: cat,
        newDish: form,
      })
    );
    dispatch(getMenu())
      .unwrap()
      .then(() => {
        alert("Блюдо добавлено!");
        setForm({
          id: 0,
          name: "",
          description: "",
          grams: "",
          price: "",
          video: "",
          photo: [],
        });
        setCat("");
      })
      .catch((error) => {
        alert("Ошибка при добавлении блюда: " + error);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, m: "auto" }}
    >
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Категория</InputLabel>
        <Select
          labelId="category-label"
          name="category"
          label="Категория"
          value={cat} // ✅ теперь управляем только этим состоянием
          onChange={(e) => {
            setCat(e.target.value);
            // console.log(e.target.value);
          }} // ✅ обновляем category
          required
        >
          {Array.isArray(dishes) &&
            dishes.map((cat) => (
              <MenuItem key={cat.id} value={cat.category}>
                {cat.category}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Название"
        name="name"
        value={form.name}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Описание"
        name="description"
        value={form.description}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Граммовка"
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
      />

      {/* Компонент загрузки медиафайлов */}
      <CloudUploadGroup
        onVideoUpload={handleVideoUpload}
        onPhotoUpload={handlePhotoUpload}
        videoUrl={form.video}
        photoUrls={form.photo}
        uploading={uploading}
        uploadProgress={uploadProgress}
        showVideo={true}
        showPhoto={true}
        showDeleteButtons={false}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: "#5b2c1c",
          "&:hover": {
            backgroundColor: "#4a2417",
          },
        }}
      >
        Добавить блюдо
      </Button>
    </Box>
  );
};

export default DishesForm;
