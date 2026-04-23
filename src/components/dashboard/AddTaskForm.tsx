'use client';

import { useActionState } from 'react';
import { addTaskAction } from '../../actions/task-actions';

export default function AddTaskForm() {
  // useActionState hooks into Server Actions to manage form state, errors, and pending status.
  const [state, formAction, isPending] = useActionState(addTaskAction, null);

  return (
    <form action={formAction} className="space-y-6">
      <div className="group">
        <label htmlFor="title" className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-blue-400 transition-colors">
          Task Title
        </label>
        <input
          id="title"
          name="title"
          required
          className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:bg-white/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50"
          placeholder="e.g. Deploy New Feature Branch"
          disabled={isPending}
        />
        {state?.error?.title && (
          <p className="text-red-400 text-[10px] font-bold mt-2 uppercase tracking-widest">{state.error.title[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          Priority
        </label>
        <div className="grid grid-cols-2 gap-3">
          {['low', 'medium', 'high', 'critical'].map((level) => (
            <label key={level} className="relative cursor-pointer group">
              <input type="radio" name="severity" value={level} className="peer sr-only" defaultChecked={level === 'low'} />
              <div className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-[10px] font-black uppercase text-center text-white/40 transition-all peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-500 group-hover:bg-white/10">
                {level}
              </div>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white font-black py-5 px-6 rounded-2xl hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:bg-slate-700 disabled:scale-100 shadow-2xl shadow-blue-900/40"
      >
        {isPending ? (
          <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Adding...</>
        ) : (
          'Add Task'
        )}
      </button>
      
      {state?.success && (
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl text-blue-400 text-center text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2">
          Task Added
        </div>
      )}
    </form>
  );
}
