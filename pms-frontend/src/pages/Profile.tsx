import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { loginSuccess } from '../features/authSlice';

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    if (!user?.token) return;
    dispatch(loginSuccess({ email, role, token: user.token }));
    setEditing(false);
  };

  if (!user) {
    return (
      <Box>
        <Typography variant="h5">No user profile found.</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        {editing ? (
          <>
            <TextField
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Role"
              value={role}
              onChange={e => setRole(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
              Save
            </Button>
            <Button onClick={() => setEditing(false)} sx={{ mt: 2, ml: 2 }}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1"><b>Email:</b> {user.email}</Typography>
            <Typography variant="body1"><b>Role:</b> {user.role}</Typography>
            <Button variant="outlined" onClick={() => setEditing(true)} sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
