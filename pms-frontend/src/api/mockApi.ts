// This is a mock API layer for demonstration. Replace with real API calls.
export const mockLogin = async (email: string, password: string) => {
  return new Promise<{ email: string; role: string }>((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({ email, role: 'Team Member' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

export const mockRegister = async (email: string, password: string, role: string) => {
  return new Promise<{ email: string; role: string }>((resolve, reject) => {
    setTimeout(() => {
      if (email && password && role) {
        resolve({ email, role });
      } else {
        reject(new Error('Invalid registration data'));
      }
    }, 1000);
  });
};
