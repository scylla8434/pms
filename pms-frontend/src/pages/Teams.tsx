import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTeams, addTeam, updateTeam, deleteTeam } from '../features/teamsSlice';
import { fetchTeams, createTeam } from '../api/api';


const Teams: React.FC = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state: RootState) => state.teams.teams);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [members, setMembers] = useState('');
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTeam, setEditTeam] = useState<any>(null);
  const [editMembers, setEditMembers] = useState('');

  const token = useSelector((state: RootState) => state.auth.user?.token);
  useEffect(() => {
    (async () => {
      if (!token) return;
      const data = await fetchTeams(token);
      dispatch(setTeams(data));
    })();
  }, [dispatch, token]);

  const handleCreate = async () => {
    if (!token) return;
    setLoading(true);
    const newTeam = await createTeam({
      name,
      members: members.split(',').map(m => m.trim()).filter(Boolean),
    }, token);
    dispatch(addTeam(newTeam));
    setOpen(false);
    setName('');
    setMembers('');
    setLoading(false);
  };

  const handleEdit = (team: any) => {
    setEditTeam(team);
    setName(team.name);
    setEditMembers(team.members.join(', '));
    setEditOpen(true);
  };

  const handleUpdate = () => {
    const updated = { ...editTeam, name, members: editMembers.split(',').map((m: string) => m.trim()).filter(Boolean) };
    dispatch(updateTeam(updated));
    setEditOpen(false);
    setEditTeam(null);
    setName('');
    setEditMembers('');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTeam(id));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Teams</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Create New Team
      </Button>
      <List>
        {teams.map(team => (
          <ListItem key={team.id} divider
            secondaryAction={
              <>
                <Button size="small" onClick={() => handleEdit(team)} sx={{ mr: 1 }}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(team.id)}>Delete</Button>
              </>
            }
          >
            <ListItemText
              primary={team.name}
              secondary={`Members: ${team.members.join(', ')}`}
            />
          </ListItem>
        ))}
      </List>
      {/* Create Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Team</DialogTitle>
        <DialogContent>
          <TextField
            label="Team Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Members (comma separated)"
            value={members}
            onChange={e => setMembers(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" disabled={loading || !name}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Team</DialogTitle>
        <DialogContent>
          <TextField
            label="Team Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Members (comma separated)"
            value={editMembers}
            onChange={e => setEditMembers(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" disabled={!name}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Teams;
