// src/pages/login/Login.jsx
import React, { useState } from "react";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor ingresa tu email y contraseña");
      return;
    }
    console.log("Iniciando sesión...", { email, password });
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <Container maxWidth="sm" className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" className="text-white text-center mb-4">
          <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
          Iniciar sesión
          </Typography>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="body2" color="error" className="mb-4">
              {error}
            </Typography>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TextField
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-white"
              required
              sx={{
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "yellow",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "yellow",
                  },
                },
              }}
            />
          </motion.div>

          <motion.div
            className="mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-white"
              required
              sx={{
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "yellow",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "yellow",
                  },
                },
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Iniciar Sesión
            </Button>
          </motion.div>

          <Box mt={2} className="text-center">
            <Typography variant="body2" color="textSecondary">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-yellow-500">
                Regístrate aquí
              </Link>
            </Typography>
          </Box>
        </form>
      </Container>
    </div>
  );
}

export default Login;
