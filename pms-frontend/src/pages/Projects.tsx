import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProjects, addProject, updateProject, deleteProject } from '../features/projectsSlice';
import { fetchProjects, createProject } from '../api/api';

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editProject, setEditProject] = useState<any>(null);

  const token = useSelector((state: RootState) => state.auth.user?.token);
  useEffect(() => {
    (async () => {
      if (!token) return;
      const data = await fetchProjects(token);
      dispatch(setProjects(data));
    })();
  }, [dispatch, token]);

  const handleCreate = async () => {
    if (!token) return;
    setLoading(true);
    const newProject = await createProject({
      title,
      description,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: '',
      status: 'Planned',
    }, token);
    dispatch(addProject(newProject));
    setOpen(false);
    setTitle('');
    setDescription('');
    setLoading(false);
  };

  const handleEdit = (project: any) => {
    setEditProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setEditOpen(true);
  };

  const handleUpdate = () => {
    const updated = { ...editProject, title, description };
    dispatch(updateProject(updated));
    setEditOpen(false);
    setEditProject(null);
    setTitle('');
    setDescription('');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProject(id));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Projects</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Create New Project
      </Button>
      <List>
        {projects.map(project => (
          <ListItem key={project.id} divider
            secondaryAction={
              <>
                <Button size="small" onClick={() => handleEdit(project)} sx={{ mr: 1 }}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(project.id)}>Delete</Button>
              </>
            }
          >
            <ListItemText
              primary={project.title}
              secondary={project.description}
            />
          </ListItem>
        ))}
      </List>
      {/* Create Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" disabled={loading || !title}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" disabled={!title}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
