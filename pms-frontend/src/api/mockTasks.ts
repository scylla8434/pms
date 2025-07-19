import { v4 as uuidv4 } from 'uuid';

export const mockFetchTasks = async () => {
  return [
    {
      id: uuidv4(),
      title: 'Design Homepage',
      description: 'Create wireframes and UI for homepage.',
      status: 'In Progress',
      assignee: 'Alex',
      dueDate: '2025-07-25',
    },
    {
      id: uuidv4(),
      title: 'Setup Database',
      description: 'Initialize MongoDB Atlas cluster.',
      status: 'Planned',
      assignee: 'Mike',
      dueDate: '2025-07-30',
    },
  ];
};

export const mockCreateTask = async (task: any) => {
  return { ...task, id: uuidv4() };
};
