// Centralized API for real backend
const API_URL = process.env.REACT_APP_API_URL;

export const fetchProjects = async (token: string) => {
  const res = await fetch(`${API_URL}/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createProject = async (project: any, token: string) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });
  return res.json();
};

export const updateProject = async (id: string, project: any, token: string) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(project),
  });
  return res.json();
};

export const deleteProject = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};


// TASKS
export const fetchTasks = async (token: string) => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createTask = async (task: any, token: string) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id: string, task: any, token: string) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTask = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// TEAMS
export const fetchTeams = async (token: string) => {
  const res = await fetch(`${API_URL}/teams`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createTeam = async (team: any, token: string) => {
  const res = await fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(team),
  });
  return res.json();
};

export const updateTeam = async (id: string, team: any, token: string) => {
  const res = await fetch(`${API_URL}/teams/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(team),
  });
  return res.json();
};

export const deleteTeam = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/teams/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// FILES
export const fetchFiles = async (token: string) => {
  const res = await fetch(`${API_URL}/files`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const uploadFile = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_URL}/files/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};

export const deleteFile = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/files/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// NOTIFICATIONS
export const fetchNotifications = async (token: string) => {
  const res = await fetch(`${API_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const markNotificationRead = async (id: string, token: string) => {
  const res = await fetch(`${API_URL}/notifications/${id}/read`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const clearNotifications = async (token: string) => {
  const res = await fetch(`${API_URL}/notifications/clear`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// AUTH
export const register = async (email: string, password: string, role: string) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
