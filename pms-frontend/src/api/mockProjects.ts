import { v4 as uuidv4 } from 'uuid';

export const mockFetchProjects = async () => {
  return [
    {
      id: uuidv4(),
      title: 'Website Redesign',
      description: 'Update the company website for 2025.',
      startDate: '2025-07-01',
      endDate: '2025-08-15',
      status: 'In Progress',
    },
    {
      id: uuidv4(),
      title: 'Mobile App Launch',
      description: 'Release the new mobile app.',
      startDate: '2025-06-01',
      endDate: '2025-09-30',
      status: 'Planned',
    },
  ];
};

export const mockCreateProject = async (project: any) => {
  return { ...project, id: uuidv4() };
};
