import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, InputAdornment, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faTag, faDollarSign, faStar, faLaptop, faImage, faSave } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function AddGames() {
  const [game, setGame] = useState({
    title: "",
    genre: "",
    price: "",
    rating: "",
    platform: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!game.title || !game.genre || !game.price || !game.rating || !game.platform || !game.img) {
      toast.error("Por favor, complete todos los campos.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/api/v1/admin/creategame", {
        ...game,
      });
  
      setGame({
        title: "",
        genre: "",
        price: "",
        rating: "",
        platform: "",
        img: "",
      });
  
      toast.success("Juego agregado correctamente.", {
        position: "top-right",
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Error al agregar el juego:", error);
      toast.error("Error al agregar el juego.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            backgroundColor: "#1F2937",
            padding: 3,
            borderRadius: "8px",
            boxShadow: 2,
            marginBottom: 4,
            marginTop: 10,
          }}
        >
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#fff", marginBottom: 2 }}>
            Agregar Juego
          </Typography>

          <Box component="form">
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <TextField
                  fullWidth
                  label="Título"
                  variant="outlined"
                  name="title"
                  value={game.title}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faGamepad} style={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ input: { color: "white" }, label: { color: "white" } }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <FormControl fullWidth variant="outlined">
                  <InputLabel sx={{ color: "white" }}>Género</InputLabel>
                  <Select
                    value={game.genre}
                    onChange={handleChange}
                    label="Género"
                    name="genre"
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faTag} style={{ color: "white" }} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="Action">Action</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                    <MenuItem value="RPG">RPG</MenuItem>
                    <MenuItem value="Adventure">Adventure</MenuItem>
                  </Select>
                </FormControl>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <TextField
                  fullWidth
                  label="Precio"
                  variant="outlined"
                  name="price"
                  value={game.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faDollarSign} style={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ input: { color: "white" }, label: { color: "white" } }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <TextField
                  fullWidth
                  label="Calificación"
                  variant="outlined"
                  name="rating"
                  value={game.rating}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faStar} style={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ input: { color: "white" }, label: { color: "white" } }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <FormControl fullWidth variant="outlined">
                  <InputLabel sx={{ color: "white" }}>Plataforma</InputLabel>
                  <Select
                    value={game.platform}
                    onChange={handleChange}
                    label="Plataforma"
                    name="platform"
                    sx={{
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                    }}
                    startAdornment={
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faLaptop} style={{ color: "white" }} />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="PC">PC</MenuItem>
                    <MenuItem value="Console">Console</MenuItem>
                  </Select>
                </FormControl>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <TextField
                  fullWidth
                  label="Imagen (URL)"
                  variant="outlined"
                  name="img"
                  value={game.img}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FontAwesomeIcon icon={faImage} style={{ color: "white" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ input: { color: "white" }, label: { color: "white" } }}
                />
              </motion.div>
            </Box>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  marginTop: 2,
                  padding: "12px 24px",
                  fontSize: "16px",
                  textTransform: "none",
                  backgroundColor: "#007BFF",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faSave} style={{ marginRight: 8 }} />
                Guardar
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      <Footer />
      <ToastContainer />
    </Container>
  );
}

export default AddGames;