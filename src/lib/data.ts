import { Task } from './schema';

// In-memory mock store used to demonstrate data flow and mutations without a persistent database.
export const mockTasks: Task[] = [
  { 
    id: '1', 
    title: 'Cloud Infrastructure Upgrade', 
    status: 'completed', 
    severity: 'high',
    description: 'Upgrading core server instances to the latest generation for improved performance and scalability.',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  { 
    id: '2', 
    title: 'Security Audit & Compliance', 
    status: 'pending', 
    severity: 'critical',
    description: 'Performing a comprehensive security audit to ensure compliance with global data protection standards.',
    timestamp: new Date().toISOString()
  },
  { 
    id: '3', 
    title: 'Mobile App Beta Launch', 
    status: 'pending', 
    severity: 'medium',
    description: 'Coordinating the beta rollout of the new mobile application to selected test groups.',
    timestamp: new Date().toISOString()
  },
];


