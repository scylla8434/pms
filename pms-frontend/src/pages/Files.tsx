
import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFiles, addFiles, deleteFile } from '../features/filesSlice';
import { fetchFiles, uploadFile, deleteFile as deleteFileApi } from '../api/api';

import FileUpload from '../components/FileUpload';

const Files: React.FC = () => {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.files.files);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.user?.token);
  useEffect(() => {
    (async () => {
      if (!token) return;
      setLoading(true);
      const data = await fetchFiles(token);
      dispatch(setFiles(data));
      setLoading(false);
    })();
  }, [dispatch, token]);

  const handleUpload = async (fileList: FileList) => {
    if (!token) return;
    setUploading(true);
    const uploaded: any[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const result = await uploadFile(file, token);
      uploaded.push(result);
    }
    dispatch(addFiles(uploaded));
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    setDeleting(id);
    await deleteFileApi(id, token);
    dispatch(deleteFile(id));
    setDeleting(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>File Management</Typography>
      <FileUpload onUpload={handleUpload} />
      {uploading && <Typography color="primary">Uploading...</Typography>}
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {files.length === 0 && <Typography>No files uploaded yet.</Typography>}
          {files.map(file => (
            <ListItem key={file.id} divider
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(file.id)} disabled={deleting === file.id}>
                  {deleting === file.id ? <CircularProgress size={20} /> : <DeleteIcon />}
                </IconButton>
              }
            >
              <ListItemText
                primary={file.name}
                secondary={`Uploaded by: ${file.uploadedBy} on ${file.uploadedAt}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Files;
