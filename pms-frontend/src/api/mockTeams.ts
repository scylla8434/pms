import { v4 as uuidv4 } from 'uuid';

export const mockFetchTeams = async () => {
  return [
    {
      id: uuidv4(),
      name: 'Frontend Team',
      members: ['Alex', 'Sarah'],
    },
    {
      id: uuidv4(),
      name: 'Backend Team',
      members: ['Mike', 'Jennifer'],
    },
  ];
};

export const mockCreateTeam = async (team: any) => {
  return { ...team, id: uuidv4() };
};
