import React, { useState } from "react";
import { TextField, Button, Box, Container, Typography, InputAdornment } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de campos
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Por favor ingresa un correo electrónico válido");
      return;
    }

    try {
      const response = await register(username, email, password);

      
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      toast.error("Hubo un error en la conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
      background: 'linear-gradient(135deg, #1e3a8a, #1e293b)',
    }}>
      <Container maxWidth="sm" className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" className="text-white text-center mb-4">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Regístrate
          </Typography>
        </motion.div>

        <form>
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TextField
              label="Nombre de Usuario"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faUser} className="text-white" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "yellow" },
                  "&.Mui-focused fieldset": { borderColor: "yellow" },
                },
              }}
            />
          </motion.div>

          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TextField
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "yellow" },
                  "&.Mui-focused fieldset": { borderColor: "yellow" },
                },
              }}
            />
          </motion.div>

          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faLock} className="text-white" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "yellow" },
                  "&.Mui-focused fieldset": { borderColor: "yellow" },
                },
              }}
            />
          </motion.div>

          <motion.div
            className="mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TextField
              label="Confirmar Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faLock} className="text-white" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "yellow" },
                  "&.Mui-focused fieldset": { borderColor: "yellow" },
                },
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Button
              type="button"
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Regístrate
            </Button>
          </motion.div>

          <Box mt={2} className="text-center">
            <Typography variant="body2" color="textSecondary">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-yellow-500">
                Inicia sesión aquí
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>

      <ToastContainer />
    </div>
  );
}

export default Register;
