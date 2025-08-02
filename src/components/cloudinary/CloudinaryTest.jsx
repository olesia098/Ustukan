import React, { useState } from "react";
import { Button, Box, Typography, Alert } from "@mui/material";

const CloudinaryTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testCloudinaryConnection = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      const cloudName =
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dx0z3ycxj";
      const uploadPreset =
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "ustukan_preset";

      console.log("Тестирование подключения к Cloudinary...");
      console.log("Cloud Name:", cloudName);
      console.log("Upload Preset:", uploadPreset);

      // Создаем простой тестовый файл
      const testBlob = new Blob(["test"], { type: "text/plain" });
      const testFile = new File([testBlob], "test.txt", { type: "text/plain" });

      const formData = new FormData();
      formData.append("file", testFile);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTestResult({
          success: true,
          message: "Подключение к Cloudinary успешно!",
          url: data.secure_url,
        });
        console.log("Тест успешен:", data);
      } else {
        const errorText = await response.text();
        setTestResult({
          success: false,
          message: `Ошибка: ${response.status} ${response.statusText}`,
          details: errorText,
        });
        console.error("Тест не прошел:", errorText);
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Ошибка сети: ${error.message}`,
        details: error.toString(),
      });
      console.error("Ошибка теста:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Тест подключения к Cloudinary
      </Typography>

      <Button
        variant="contained"
        onClick={testCloudinaryConnection}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? "Тестирование..." : "Тестировать подключение"}
      </Button>

      {testResult && (
        <Alert
          severity={testResult.success ? "success" : "error"}
          sx={{ mt: 2 }}
        >
          <Typography variant="body1">{testResult.message}</Typography>
          {testResult.url && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              URL: {testResult.url}
            </Typography>
          )}
          {testResult.details && (
            <Typography variant="body2" sx={{ mt: 1, fontSize: "0.8rem" }}>
              Детали: {testResult.details}
            </Typography>
          )}
        </Alert>
      )}

      <Box sx={{ mt: 2, p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Текущие настройки:</strong>
          <br />
          Cloud Name:{" "}
          {process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dx0z3ycxj"}
          <br />
          Upload Preset:{" "}
          {process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "ustukan_preset"}
        </Typography>
      </Box>
    </Box>
  );
};

export default CloudinaryTest;
