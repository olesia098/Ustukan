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
import { addNewDrink, getDrinks } from "../../store/bar/barActions";

const DrinkForm = () => {
  const dispatch = useDispatch();
  const { drinks } = useSelector((state) => state.drinks);
  const [cat, setCat] = useState("");

  useEffect(() => {
    dispatch(getDrinks());
  }, [dispatch]);

  const [form, setForm] = useState({
    id: 0,
    name: "",
    description: "",
    grams: "",
    price: "",
    video: "",
    photo: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      id: Math.floor(Math.random() * 1000000), // генерируем новый id каждый раз
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addNewDrink({
        category: cat,
        newDrink: form,
      })
    );
    dispatch(getDrinks())
      .unwrap()
      .then(() => {
        alert("Напиток добавлен!");
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
        alert("Ошибка при добавлении напитка: " + error);
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
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
          }}
          required
        >
          {Array.isArray(drinks) &&
            drinks.map((cat) => (
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
        label="Объем/Граммовка"
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
      {/* <TextField
        fullWidth
        label="Ссылка на видео"
        name="video"
        value={form.video}
        onChange={handleChange}
        margin="normal"
      />

      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Загрузить фото
        <input type="file" hidden multiple />
      </Button>

      {form.photo.length > 0 && (
        <Box mt={2}>
          <Typography>Загружено: {form.photo.length} фото</Typography>
        </Box>
      )} */}

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
        Добавить напиток
      </Button>
    </Box>
  );
};

export default DrinkForm;
