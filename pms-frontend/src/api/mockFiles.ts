import { v4 as uuidv4 } from 'uuid';

let files: any[] = [
  {
    id: uuidv4(),
    name: 'requirements.pdf',
    uploadedBy: 'Alex',
    uploadedAt: '2025-07-10',
  },
];

export const mockFetchFiles = async () => files;

export const mockUploadFiles = async (newFiles: FileList) => {
  const uploaded = Array.from(newFiles).map(file => ({
    id: uuidv4(),
    name: file.name,
    uploadedBy: 'Alex',
    uploadedAt: new Date().toISOString().slice(0, 10),
  }));
  files = [...files, ...uploaded];
  return uploaded;
};

export const mockDeleteFile = async (id: string) => {
  files = files.filter(f => f.id !== id);
  return true;
};
