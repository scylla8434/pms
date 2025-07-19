import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FileItem {
  id: string;
  name: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface FilesState {
  files: FileItem[];
}

const initialState: FilesState = {
  files: [],
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles(state, action: PayloadAction<FileItem[]>) {
      state.files = action.payload;
    },
    addFiles(state, action: PayloadAction<FileItem[]>) {
      state.files.push(...action.payload);
    },
    deleteFile(state, action: PayloadAction<string>) {
      state.files = state.files.filter(f => f.id !== action.payload);
    },
  },
});

export const { setFiles, addFiles, deleteFile } = filesSlice.actions;
export default filesSlice.reducer;
