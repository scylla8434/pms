import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    setLoading(true);
    setError('');
    try {
      const result = await login(email, password);
      if (result && result.token && result.user) {
        dispatch(loginSuccess({ email: result.user.email, role: result.user.role, token: result.token }));
        navigate('/');
      } else {
        setError('Login failed: No token returned');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper elevation={3} sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" mb={2} align="center">Login</Typography>
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
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Not registered?{' '}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </Box>
        <Box mt={2} textAlign="center">
          <Link href="#" onClick={handlePasswordReset} underline="hover">
            Forgot password?
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
