
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Reports: React.FC = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const teams = useSelector((state: RootState) => state.teams.teams);
  const files = useSelector((state: RootState) => state.files.files);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Reports & Analytics</Typography>
      <TableContainer component={Paper} sx={{ maxWidth: 600, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entity</TableCell>
              <TableCell align="right">Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Projects</TableCell>
              <TableCell align="right">{projects.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tasks</TableCell>
              <TableCell align="right">{tasks.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Teams</TableCell>
              <TableCell align="right">{teams.length}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Files</TableCell>
              <TableCell align="right">{files.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Reports;
