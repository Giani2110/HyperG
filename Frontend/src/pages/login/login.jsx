import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Por favor ingresa tu email y contraseña');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users');
      const data = await response.json();
      const user = data.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        toast.error('Correo electrónico o contraseña incorrectos');
        return;
      }

      login(user);
      toast.success('¡Inicio de sesión exitoso!');

      if (user.type === 'client') {
        navigate('/catalog');
      } else if (user.type === 'admin') {
        navigate('/dashboard');
      } else {
        toast.error('Tipo de usuario no reconocido. Contacta al administrador.');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      toast.error('Hubo un error al conectar con el servidor');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #1e3a8a, #1e293b)',
      }}
    >
      <Container
        maxWidth="sm"
        className="p-8 rounded-lg shadow-lg"
        style={{
          backgroundColor: '#1f2937',
          border: '1px solid #374151',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            className="text-white text-center mb-6"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-3" />
            Iniciar sesión
          </Typography>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            className="mb-4"
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
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: 'white' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#374151' },
                  '&:hover fieldset': { borderColor: '#3b82f6' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                },
                '& input': { color: 'white' },
              }}
            />
          </motion.div>

          <motion.div
            className="mb-4"
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
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faLock} style={{ color: 'white' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#374151' },
                  '&:hover fieldset': { borderColor: '#3b82f6' },
                  '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                },
                '& input': { color: 'white' },
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
              fullWidth
              className="mt-4"
              sx={{
                backgroundColor: '#3b82f6',
                '&:hover': { backgroundColor: '#2563eb' },
              }}
            >
              Iniciar Sesión
            </Button>
          </motion.div>

          <Box mt={3} className="text-center">
            <Typography variant="body2" style={{ color: 'white' }}>
              ¿No tienes una cuenta?{' '}
              <Link to="/register" style={{ color: '#fbbf24', textDecoration: 'none' }}>
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
