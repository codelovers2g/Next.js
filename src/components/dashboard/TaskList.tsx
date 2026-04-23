'use client';

import { useOptimistic, useTransition } from 'react';
import { Task } from '../../lib/schema';
import { toggleTaskStatusAction } from '../../actions/task-actions';
import Link from 'next/link';

export default function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  // useTransition manages non-blocking UI updates, keeping the interface responsive during async operations.
  const [isPending, startTransition] = useTransition();
  
  // useOptimistic provides immediate UI feedback before server confirmation, enhancing the user experience.
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    initialTasks,
    (state, { id, status }: { id: string, status: 'pending' | 'completed' }) => 
      state.map(task => task.id === id ? { ...task, status } : task)
  );

  const handleToggle = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    
    startTransition(async () => {
      addOptimisticTask({ id, status: nextStatus });
      await toggleTaskStatusAction(id);
    });
  };

  return (
    <ul className="space-y-4">
      {optimisticTasks.map((task) => (
        <li 
          key={task.id} 
          className={`group p-6 rounded-[2rem] border flex items-center justify-between transition-all duration-500 ${
            task.status === 'completed' 
              ? 'bg-slate-50 border-slate-200 opacity-60 grayscale' 
              : 'bg-white border-blue-50 shadow-sm hover:shadow-2xl hover:-translate-y-1'
          }`}
        >
          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleToggle(task.id, task.status)}
              disabled={isPending}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                task.status === 'completed' 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'bg-white border-slate-200 group-hover:border-blue-400'
              }`}
            >
              {task.status === 'completed' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              )}
            </button>
            
            <Link 
              href={`/tasks/${task.id}`}
              className="flex flex-col"
            >
              <span className={`text-xl ${task.status === 'completed' ? 'line-through text-slate-400' : 'font-bold text-slate-800'}`}>
                {task.title}
              </span>
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest mt-1">
                {task.severity} priority
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href={`/tasks/${task.id}`}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-xl"
            >
              Details
            </Link>
            {task.status === 'pending' && (
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/40 font-mono">
                Active
              </span>
            )}
          </div>
        </li>
      ))}
      {optimisticTasks.length === 0 && (
        <div className="text-slate-400 font-medium py-16 text-center border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50">
          <p className="text-2xl font-black text-slate-300 tracking-tight">No Tasks Found</p>
          <p className="text-sm text-slate-300 mt-2 uppercase tracking-widest font-bold">Awaiting New Tasks</p>
        </div>
      )}
    </ul>
  );
}
