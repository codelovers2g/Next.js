'use client';

import { useActionState } from 'react';
import { addItemAction } from '../../actions/dashboard-actions';

export default function AddTaskForm() {
  // React 19 useActionState handles pending state and server response automatically
  const [state, formAction, isPending] = useActionState(addItemAction, null);

  return (
    <form action={formAction} className="space-y-6">
      <div className="group">
        <label htmlFor="title" className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">
          Task Objective
        </label>
        <input
          id="title"
          name="title"
          required
          className="w-full px-5 py-3 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all disabled:opacity-50"
          placeholder="e.g. Master the React Compiler"
          disabled={isPending}
        />
        {state?.error?.title && (
          <p className="text-red-500 text-xs font-bold mt-2 animate-bounce">{state.error.title[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-2xl hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:scale-100"
      >
        {isPending ? (
          <><span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" /> Sychnronizing...</>
        ) : (
          'Deploy Task'
        )}
      </button>
      
      {state?.success && (
        <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-green-700 text-center text-sm font-bold animate-in fade-in slide-in-from-bottom-2">
          ✨ Global state updated successfully!
        </div>
      )}
    </form>
  );
}
