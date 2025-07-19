import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTasks, addTask, updateTask, deleteTask } from '../features/tasksSlice';
import { fetchTasks, createTask } from '../api/api';


const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTask, setEditTask] = useState<any>(null);

  const token = useSelector((state: RootState) => state.auth.user?.token);
  useEffect(() => {
    (async () => {
      if (!token) return;
      const data = await fetchTasks(token);
      dispatch(setTasks(data));
    })();
  }, [dispatch, token]);

  const handleCreate = async () => {
    if (!token) return;
    setLoading(true);
    const newTask = await createTask({
      title,
      description,
      status: 'Planned',
      assignee,
      dueDate,
    }, token);
    dispatch(addTask(newTask));
    setOpen(false);
    setTitle('');
    setDescription('');
    setAssignee('');
    setDueDate('');
    setLoading(false);
  };

  const handleEdit = (task: any) => {
    setEditTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setAssignee(task.assignee);
    setDueDate(task.dueDate);
    setEditOpen(true);
  };

  const handleUpdate = () => {
    const updated = { ...editTask, title, description, assignee, dueDate };
    dispatch(updateTask(updated));
    setEditOpen(false);
    setEditTask(null);
    setTitle('');
    setDescription('');
    setAssignee('');
    setDueDate('');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Tasks</Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Create New Task
      </Button>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id} divider
            secondaryAction={
              <>
                <Button size="small" onClick={() => handleEdit(task)} sx={{ mr: 1 }}>Edit</Button>
                <Button size="small" color="error" onClick={() => handleDelete(task.id)}>Delete</Button>
              </>
            }
          >
            <ListItemText
              primary={task.title}
              secondary={`Assignee: ${task.assignee} | Due: ${task.dueDate} | Status: ${task.status}`}
            />
          </ListItem>
        ))}
      </List>
      {/* Create Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Task</DialogTitle>
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
          <TextField
            label="Assignee"
            value={assignee}
            onChange={e => setAssignee(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
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
        <DialogTitle>Edit Task</DialogTitle>
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
          <TextField
            label="Assignee"
            value={assignee}
            onChange={e => setAssignee(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
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

export default Tasks;
