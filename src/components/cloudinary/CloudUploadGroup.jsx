import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

const CloudUploadGroup = ({
  onVideoUpload,
  onPhotoUpload,
  onVideoDelete,
  onPhotoDelete,
  videoUrl,
  photoUrls,
  uploading,
  uploadProgress,
  showVideo = true,
  showPhoto = true,
  showDeleteButtons = false,
}) => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleViewMedia = (mediaUrl, mediaType) => {
    console.log("Открытие медиафайла:", { url: mediaUrl, type: mediaType });
    setSelectedMedia({ url: mediaUrl, type: mediaType });
    setOpenDialog(true);
  };

  const handleDeleteVideo = () => {
    if (onVideoDelete) {
      onVideoDelete();
    }
  };

  const handleDeletePhoto = (index) => {
    if (onPhotoDelete) {
      onPhotoDelete(index);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMedia(null);
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Загрузка медиафайлов
      </Typography>

      {/* Загрузка видео */}
      {showVideo && (
        <Button
          variant="outlined"
          component="label"
          sx={{
            mr: 2,
            mb: 2,
            borderColor: "#5b2c1c",
            color: "#5b2c1c",
            "&:hover": {
              borderColor: "#4a2417",
              backgroundColor: "rgba(91, 44, 28, 0.04)",
            },
          }}
          disabled={uploading}
        >
          {videoUrl ? "Изменить видео" : "Загрузить видео"}
          <input type="file" hidden accept="video/*" onChange={onVideoUpload} />
        </Button>
      )}

      {/* Загрузка фото */}
      {showPhoto && (
        <Button
          variant="outlined"
          component="label"
          sx={{
            mb: 2,
            borderColor: "#5b2c1c",
            color: "#5b2c1c",
            "&:hover": {
              borderColor: "#4a2417",
              backgroundColor: "rgba(91, 44, 28, 0.04)",
            },
          }}
          disabled={uploading}
        >
          Загрузить фото
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={onPhotoUpload}
          />
        </Button>
      )}

      {/* Прогресс загрузки */}
      {uploading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Загрузка... {Math.round(uploadProgress)}%
          </Typography>
          <Box
            sx={{
              width: "100%",
              bgcolor: "grey.200",
              borderRadius: 1,
              mt: 1,
            }}
          >
            <Box
              sx={{
                width: `${uploadProgress}%`,
                height: 8,
                bgcolor: "#5b2c1c",
                borderRadius: 1,
                transition: "width 0.3s ease",
              }}
            />
          </Box>
        </Box>
      )}

      {/* Отображение загруженного видео */}
      {videoUrl && showVideo && (
        <Box mt={2}>
          <Typography variant="body2" color="success.main" gutterBottom>
            ✅ Видео загружено
          </Typography>
          <Card sx={{ maxWidth: 300, mb: 2 }}>
            <CardMedia
              component="video"
              height="200"
              src={videoUrl}
              sx={{ objectFit: "cover" }}
              controls
              preload="metadata"
              onError={(e) => {
                console.error("Ошибка загрузки видео в карточке:", e);
              }}
            />
            <CardActions sx={{ justifyContent: "space-between", p: 1 }}>
              <Button
                size="small"
                startIcon={<PlayArrowIcon />}
                onClick={() => handleViewMedia(videoUrl, "video")}
              >
                Просмотр
              </Button>
              {/* <Button
                size="small"
                onClick={() => window.open(videoUrl, "_blank")}
                title="Открыть в новой вкладке"
              >
                Открыть
              </Button> */}
              {showDeleteButtons && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={handleDeleteVideo}
                  title="Удалить видео"
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </CardActions>
          </Card>
        </Box>
      )}

      {/* Отображение загруженных фото */}
      {photoUrls && photoUrls.length > 0 && showPhoto && (
        <Box mt={2}>
          <Typography variant="body2" color="success.main" gutterBottom>
            ✅ Загружено фото: {photoUrls.length}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
            {photoUrls.map((url, index) => (
              <Card key={index} sx={{ width: 150, height: 150 }}>
                <CardMedia
                  component="img"
                  height="120"
                  image={url}
                  alt={`Фото ${index + 1}`}
                  sx={{ objectFit: "cover" }}
                />
                <CardActions sx={{ justifyContent: "space-between", p: 1 }}>
                  <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewMedia(url, "image")}
                  >
                    Просмотр
                  </Button>
                  {showDeleteButtons && (
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeletePhoto(index)}
                      title="Удалить фото"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      )}

      {/* Диалог для просмотра медиафайлов */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: "90vh",
            minHeight: "50vh",
          },
        }}
      >
        <DialogContent
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedMedia && (
            <Box sx={{ width: "100%", textAlign: "center" }}>
              {selectedMedia.type === "video" ? (
                <Box>
                  {/* Попытка воспроизведения видео */}
                  <video
                    src={selectedMedia.url}
                    controls
                    style={{
                      maxWidth: "100%",
                      maxHeight: "60vh",
                      width: "auto",
                      height: "auto",
                    }}
                    onError={(e) => {
                      console.error("Ошибка загрузки видео:", e);
                    }}
                    onLoadStart={() => console.log("Начало загрузки видео")}
                    onCanPlay={() =>
                      console.log("Видео готово к воспроизведению")
                    }
                  />

                  {/* Информация и альтернативные ссылки */}
                  {/* <Box
                    sx={{ mt: 2, p: 2, bgcolor: "grey.100", borderRadius: 1 }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Если видео не воспроизводится, попробуйте:
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => window.open(selectedMedia.url, "_blank")}
                        startIcon={<PlayArrowIcon />}
                      >
                        Открыть в новой вкладке
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = selectedMedia.url;
                          link.download = "video.mp4";
                          link.click();
                        }}
                        startIcon={<DownloadIcon />}
                      >
                        Скачать видео
                      </Button>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          wordBreak: "break-all",
                          color: "primary.main",
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontSize: "0.8rem",
                        }}
                        onClick={() => {
                          navigator.clipboard.writeText(selectedMedia.url);
                          alert("URL скопирован в буфер обмена!");
                        }}
                      >
                        {selectedMedia.url}
                      </Typography>
                    </Box>
                  </Box> */}
                </Box>
              ) : (
                <img
                  src={selectedMedia.url}
                  alt="Просмотр фото"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CloudUploadGroup;
