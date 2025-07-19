import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface FileUploadProps {
  onUpload: (files: FileList) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <Box>
      <input
        type="file"
        multiple
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleClick}>Upload Files</Button>
    </Box>
  );
};

export default FileUpload;
