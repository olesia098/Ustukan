import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNewDish } from "../../store/menu/menuActions";

const DishesForm = () => {
  const dispatch = useDispatch();
  const { dishes, loading } = useSelector((state) => state.dishes);

  const [form, setForm] = useState({
    category: "",
    name: "",
    description: "",
    grams: "",
    price: "",
    video: "",
    photo: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    // предполагается, что ты загружаешь фото на https://ibb.co и получаешь ссылки
    // можно сюда вставить upload-хук, если он есть
    const urls = files.map((file) => URL.createObjectURL(file)); // временно
    setForm((prev) => ({ ...prev, photo: [...prev.photo, ...urls] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        dispatch(addNewDish({ category: form.category, newDish: form }));

      alert("Блюдо добавлено!");
      setForm({
        category: "",
        name: "",
        description: "",
        grams: "",
        price: "",
        video: "",
        photo: [],
      });
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении блюда.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, m: "auto" }}
    >
      <Typography variant="h5" mb={2}>
        Добавить блюдо
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Категория</InputLabel>
        <Select
          labelId="category-label"
          value={form.category}
          name="category"
          label="Категория"
          onChange={handleChange}
          required
        >
          {dishes.map((cat) => (
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
      <TextField
        fullWidth
        label="Ссылка на видео"
        name="video"
        value={form.video}
        onChange={handleChange}
        margin="normal"
      />

      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Загрузить фото
        <input type="file" hidden multiple onChange={handlePhotoUpload} />
      </Button>

      {form.photo.length > 0 && (
        <Box mt={2}>
          <Typography>Загружено: {form.photo.length} фото</Typography>
        </Box>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Добавить блюдо
      </Button>
    </Box>
  );
};

export default DishesForm;
