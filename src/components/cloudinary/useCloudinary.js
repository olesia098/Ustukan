import { useState } from "react";

export const useCloudinary = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Функция для сжатия изображения
  const compressImage = (file, maxWidth = 1920, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        // Вычисляем новые размеры
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Рисуем изображение с новыми размерами
        ctx.drawImage(img, 0, 0, width, height);

        // Конвертируем в blob
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  // Функция для сжатия видео (упрощенная версия)
  const compressVideo = (file, maxWidth = 1280, maxBitrate = 1000000) => {
    return new Promise((resolve, reject) => {
      // Проверяем поддержку MediaRecorder
      if (!MediaRecorder.isTypeSupported("video/webm;codecs=vp9")) {
        console.warn(
          "Браузер не поддерживает сжатие видео, возвращаем оригинал"
        );
        resolve(file); // Возвращаем оригинальный файл
        return;
      }

      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      video.onloadedmetadata = () => {
        // Вычисляем новые размеры
        let { videoWidth, videoHeight } = video;
        if (videoWidth > maxWidth) {
          videoHeight = (videoHeight * maxWidth) / videoWidth;
          videoWidth = maxWidth;
        }

        canvas.width = videoWidth;
        canvas.height = videoHeight;

        // Начинаем запись
        const stream = canvas.captureStream(30); // 30 FPS
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=vp9",
          videoBitsPerSecond: maxBitrate,
        });

        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          const compressedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, ".webm"),
            {
              type: "video/webm",
              lastModified: Date.now(),
            }
          );
          resolve(compressedFile);
        };

        // Воспроизводим видео и записываем
        video.currentTime = 0;
        video.play();
        mediaRecorder.start();

        let frameCount = 0;
        const drawFrame = () => {
          if (video.currentTime >= video.duration) {
            mediaRecorder.stop();
            video.pause();
            return;
          }

          ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
          frameCount++;

          // Ограничиваем количество кадров для производительности
          if (frameCount < 300) {
            // Максимум 10 секунд при 30 FPS
            requestAnimationFrame(drawFrame);
          } else {
            mediaRecorder.stop();
            video.pause();
          }
        };

        video.ontimeupdate = () => {
          if (video.currentTime === 0) {
            drawFrame();
          }
        };
      };

      video.onerror = () => {
        reject(new Error("Ошибка при обработке видео"));
      };

      video.src = URL.createObjectURL(file);
    });
  };

  // Функция для загрузки в Cloudinary
  const uploadToCloudinary = async (file, resourceType = "image") => {
    const cloudName =
      process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dx0z3ycxj";
    const uploadPreset =
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "ustukan_preset";

    console.log("Cloudinary cloud name:", cloudName);
    console.log("Cloudinary upload preset:", uploadPreset);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    console.log("Начинаем загрузку файла:", file.name, "тип:", resourceType);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ошибка ответа:", errorText);

        // Парсим JSON ошибки для более понятного сообщения
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(
            `Upload failed: ${errorData.error?.message || response.statusText}`
          );
        } catch (parseError) {
          // Если не удалось распарсить JSON, используем оригинальное сообщение
        }

        throw new Error(
          `Upload failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Файл успешно загружен:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Ошибка при загрузке в Cloudinary:", error);

      // Проверяем тип ошибки
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        throw new Error(
          "Ошибка сети: Проверьте подключение к интернету и попробуйте снова"
        );
      }

      if (error.message.includes("Upload failed")) {
        throw error;
      }

      throw new Error(`Ошибка загрузки: ${error.message}`);
    }
  };

  // Обработчик загрузки видео
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Пожалуйста, выберите видео файл");
      return;
    }

    // Проверяем размер файла
    const maxSize = 100 * 1024 * 1024; // 100 МБ для видео
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
      alert(
        `Видео слишком большое (${fileSizeMB} МБ). Максимальный размер: 100 МБ. Файл будет сжат.`
      );
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      console.log(
        "Обработка видео:",
        file.name,
        `(${(file.size / 1024 / 1024).toFixed(2)} МБ)`
      );

      // Проверяем переменные окружения
      const cloudName =
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dx0z3ycxj";
      const uploadPreset =
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "ustukan_preset";

      console.log("Проверка настроек Cloudinary:");
      console.log("- Cloud Name:", cloudName);
      console.log("- Upload Preset:", uploadPreset);

      // Сжимаем видео если оно больше 50 МБ
      let fileToUpload = file;
      if (file.size > 50 * 1024 * 1024) {
        console.log("Сжимаем видео...");
        try {
          fileToUpload = await compressVideo(file, 1280, 1000000); // 1280px, 1Mbps
          console.log(
            "После сжатия:",
            fileToUpload.name,
            `(${(fileToUpload.size / 1024 / 1024).toFixed(2)} МБ)`
          );
        } catch (compressError) {
          console.warn(
            "Не удалось сжать видео, загружаем оригинал:",
            compressError
          );

          // Если файл слишком большой, показываем предупреждение
          if (file.size > 100 * 1024 * 1024) {
            alert(
              "Внимание: Видео очень большое и может не загрузиться. Рекомендуется использовать файл меньше 100 МБ."
            );
          }
          fileToUpload = file;
        }
      }

      console.log("Начинаем загрузку в Cloudinary...");
      const videoUrl = await uploadToCloudinary(fileToUpload, "video");
      console.log("Видео успешно загружено:", videoUrl);
      return videoUrl;
    } catch (error) {
      console.error("Ошибка загрузки видео:", error);

      // Дополнительная диагностика
      if (error.message.includes("Failed to fetch")) {
        console.error("Проблема с сетевым подключением к Cloudinary");
        console.error("Проверьте:");
        console.error("1. Подключение к интернету");
        console.error("2. Настройки Cloudinary");
        console.error("3. CORS настройки");
      }

      throw error;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Обработчик загрузки фото
  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const uploadedUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress((i / files.length) * 100);

        if (!file.type.startsWith("image/")) {
          alert(`Файл ${file.name} не является изображением`);
          continue;
        }

        console.log(
          "Обработка фото:",
          file.name,
          `(${(file.size / 1024 / 1024).toFixed(2)} МБ)`
        );

        let fileToUpload = file;
        if (file.size > 5 * 1024 * 1024) {
          // Если файл больше 5MB
          console.log("Сжимаем изображение...");
          fileToUpload = await compressImage(file, 1920, 0.7);
          console.log(
            "После сжатия:",
            fileToUpload.name,
            `(${(fileToUpload.size / 1024 / 1024).toFixed(2)} МБ)`
          );

          // Если после сжатия файл все еще слишком большой
          if (fileToUpload.size > 10 * 1024 * 1024) {
            console.log("Файл все еще слишком большой, сжимаем сильнее...");
            fileToUpload = await compressImage(file, 1280, 0.5);
            console.log(
              "После сильного сжатия:",
              fileToUpload.name,
              `(${(fileToUpload.size / 1024 / 1024).toFixed(2)} МБ)`
            );
          }
        }

        const url = await uploadToCloudinary(fileToUpload, "image");
        uploadedUrls.push(url);
      }

      setUploadProgress(100);
      return uploadedUrls;
    } catch (error) {
      console.error("Ошибка загрузки фото:", error);
      throw error;
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    uploading,
    uploadProgress,
    handleVideoUpload,
    handlePhotoUpload,
  };
};
