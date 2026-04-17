import { z } from 'zod';

export const ItemSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  status: z.enum(['pending', 'completed']).default('pending'),
});

export type Item = z.infer<typeof ItemSchema>;

// Mock Database State - In a real app, this would be a persistent DB
export const mockItems: Item[] = [
  { id: '1', title: 'Learn Next.js 16 Caching', status: 'completed' },
  { id: '2', title: 'Implement React 19 Actions', status: 'pending' },
];
