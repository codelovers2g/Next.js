import React from 'react';
import { mockTasks } from '../../../lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function TaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = mockTasks.find((p) => p.id === id);

  if (!task) notFound();

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-16 space-y-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-blue-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Return to Dashboard
          </Link>

          <header className="space-y-6">
            <div className="flex items-center gap-4">
              <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border ${
                task.severity === 'high' || task.severity === 'critical' 
                  ? 'bg-red-50 border-red-100 text-red-600' 
                  : 'bg-blue-50 border-blue-100 text-blue-600'
              }`}>
                {task.severity} Priority
              </span>
              <span className="text-slate-300 font-mono text-xs">{task.id}</span>
            </div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
              {task.title}
            </h1>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Description</h3>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                {task.description || 'No description provided.'}
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Status</span>
                  <span className={`text-xs font-black uppercase px-3 py-1 rounded-lg ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {task.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Created</span>
                  <span className="text-sm font-bold text-slate-700 font-mono">
                    {new Date(task.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-slate-200">
                Audit Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
