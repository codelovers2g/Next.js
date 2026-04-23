'use server';

import { revalidatePath } from 'next/cache';
import { TaskSchema } from '../lib/schema';
import { mockTasks } from '../lib/data';

const AddTaskSchema = TaskSchema.pick({ title: true, severity: true });

export async function addTaskAction(prevState: any, formData: FormData) {
  // Artificial delay for demonstration
  await new Promise(resolve => setTimeout(resolve, 800));

  const rawData = {
    title: formData.get('title'),
    severity: formData.get('severity') || 'low',
  };

  // Validate incoming data against the schema to ensure data integrity before mutation.
  const validated = AddTaskSchema.safeParse(rawData);

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  const newTask = {
    id: Math.random().toString(36).substring(7),
    title: validated.data.title,
    status: 'pending' as const,
    severity: validated.data.severity as any,
    timestamp: new Date().toISOString(),
    description: 'User-created task via dashboard interface.',
  };

  mockTasks.push(newTask);
  // Trigger cache invalidation to ensure the UI reflects the latest server-side state.
  revalidatePath('/');
  
  return { success: true };
}

export async function toggleTaskStatusAction(id: string) {
  const task = mockTasks.find(i => i.id === id);
  if (task) {
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    revalidatePath('/');
  }
}
