// components/ResetPassword.js
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
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

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setSuccess(""); // Reset success message

    if (!email) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(
        "Se ha enviado un enlace para restablecer la contraseña a tu correo."
      );
      setEmail(""); // Limpiar el campo de correo
    } catch (err) {
      setError("Error al enviar el correo de recuperación.");
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
          Restablecer Contraseña
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleResetPassword} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Enviar enlace de restablecimiento
          </Button>
        </form>
        <Button
          onClick={() => navigate("/")}
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
        >
          Volver a Login
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPassword;
