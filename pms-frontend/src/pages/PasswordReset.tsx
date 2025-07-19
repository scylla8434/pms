import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    // TODO: Integrate with backend for password reset
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2} align="center">Reset Password</Typography>
        {sent ? (
          <Typography color="success.main" align="center">If this email exists, a reset link has been sent.</Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Send Reset Link
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default PasswordReset;
