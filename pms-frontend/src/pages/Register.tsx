import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { registerSuccess } from '../features/authSlice';
import { register } from '../api/api';

import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Team Member');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  // Redirect to dashboard if already logged in
  React.useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await register(email, password, role);
      if (result && result.token) {
        dispatch(registerSuccess({ email: result.email, role: result.role, token: result.token }));
        navigate('/');
      } else {
        setError('Registration failed: No token returned');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2} align="center">Register</Typography>
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
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            select
            label="Role"
            value={role}
            onChange={e => setRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Project Manager">Project Manager</MenuItem>
            <MenuItem value="Team Leader">Team Leader</MenuItem>
            <MenuItem value="Team Member">Team Member</MenuItem>
          </TextField>
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
