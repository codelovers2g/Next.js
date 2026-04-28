import { z } from 'zod';

/**
 * Zod schema definitions provide a single source of truth for both runtime 
 * validation and TypeScript type inference across the application.
 */
export const TaskSeveritySchema = z.enum(['low', 'medium', 'high', 'critical']);
export type TaskSeverity = z.infer<typeof TaskSeveritySchema>;

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  status: z.enum(['pending', 'completed']).default('pending'),
  severity: TaskSeveritySchema.default('low'),
  description: z.string().optional(),
  timestamp: z.string().datetime().default(() => new Date().toISOString()),
});

export type Task = z.infer<typeof TaskSchema>;


