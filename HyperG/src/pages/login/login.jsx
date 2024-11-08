import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor ingresa tu email y contraseña");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/users");
      const data = await response.json();
      const user = data.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        toast.error("Correo electrónico o contraseña incorrectos");  // Alerta de error
        return;
      }

      login(user);

      toast.success("¡Inicio de sesión exitoso!");

      navigate("/catalog");

      console.log("Usuario logueado:", user);
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
      toast.error("Hubo un error al conectar con el servidor");
    }
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

        <ToastContainer />
      </Container>
    </div>
  );
}

export default Login;
