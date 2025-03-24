import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para iniciar sesión con email y contraseña
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tu correo y contraseña.");
    }
  };

  // Función para autenticación con Google
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Función para autenticación con Apple
  const handleAppleSignIn = async () => {
    const provider = new OAuthProvider("apple.com");
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login with Google
        </Button>

        <Button
          onClick={handleAppleSignIn}
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login con Apple
        </Button>

        <Button
          onClick={() => navigate("/forgot-password")}
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          ¿Olvidaste tu contraseña?
        </Button>

        <Button
          onClick={() => navigate("/register")}
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
        >
          Registrarse
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
