'use server';

import { revalidatePath } from 'next/cache';
import { ItemSchema, mockItems } from '../lib/schema';

export async function addItemAction(prevState: any, formData: FormData) {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000));

  const validatedFields = ItemSchema.safeParse({
    id: crypto.randomUUID(),
    title: formData.get('title'),
  });

  if (!validatedFields.success) {
    return { 
      error: validatedFields.error.flatten().fieldErrors,
      success: false 
    };
  }

  // Persist to "DB"
  mockItems.push(validatedFields.data);
  
  // Revalidate the current page
  revalidatePath('/');
  
  return { 
    success: true, 
    newItem: validatedFields.data 
  };
}
