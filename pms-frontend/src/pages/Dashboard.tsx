
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const teams = useSelector((state: RootState) => state.teams.teams);
  const files = useSelector((state: RootState) => state.files.files);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Typography gutterBottom>Welcome to your project management dashboard. Here you will see project stats, tasks, and team activity.</Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mt: 2,
        }}
      >
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Projects</Typography>
              <Typography variant="h4">{projects.length}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Tasks</Typography>
              <Typography variant="h4">{tasks.length}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Teams</Typography>
              <Typography variant="h4">{teams.length}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: 200 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Files</Typography>
              <Typography variant="h4">{files.length}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
