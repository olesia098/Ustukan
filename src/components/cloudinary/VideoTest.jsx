import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Alert } from "@mui/material";

const VideoTest = ({ videoUrl }) => {
  const [videoStatus, setVideoStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    if (!videoUrl) return;

    const video = document.createElement("video");
    video.src = videoUrl;

    const checkVideo = async () => {
      try {
        // Проверяем, может ли браузер воспроизвести видео
        await new Promise((resolve, reject) => {
          video.addEventListener("loadedmetadata", () => {
            setVideoInfo({
              duration: video.duration,
              width: video.videoWidth,
              height: video.videoHeight,
              readyState: video.readyState,
            });
            setVideoStatus("ready");
            resolve();
          });

          video.addEventListener("error", (e) => {
            setError(
              `Ошибка загрузки видео: ${e.message || "Неизвестная ошибка"}`
            );
            setVideoStatus("error");
            reject(e);
          });

          // Таймаут на случай, если видео не загружается
          setTimeout(() => {
            setError("Таймаут загрузки видео");
            setVideoStatus("timeout");
            reject(new Error("Timeout"));
          }, 10000);

          video.load();
        });
      } catch (err) {
        console.error("Ошибка проверки видео:", err);
      }
    };

    checkVideo();

    return () => {
      video.remove();
    };
  }, [videoUrl]);

  if (!videoUrl) {
    return <Alert severity="warning">URL видео не предоставлен</Alert>;
  }

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Тест видео: {videoUrl}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Статус: {videoStatus}
        </Typography>

        {videoInfo && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">
              Длительность:{" "}
              {videoInfo.duration
                ? `${Math.round(videoInfo.duration)}с`
                : "Неизвестно"}
            </Typography>
            <Typography variant="body2">
              Размер: {videoInfo.width}x{videoInfo.height}
            </Typography>
            <Typography variant="body2">
              Ready State: {videoInfo.readyState}
            </Typography>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => window.open(videoUrl, "_blank")}
        >
          Открыть в новой вкладке
        </Button>

        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            const link = document.createElement("a");
            link.href = videoUrl;
            link.download = "video.mp4";
            link.click();
          }}
        >
          Скачать
        </Button>

        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            navigator.clipboard.writeText(videoUrl);
            alert("URL скопирован!");
          }}
        >
          Копировать URL
        </Button>
      </Box>
    </Box>
  );
};

export default VideoTest;
