import React from 'react';
import { mockTasks } from '../../../../lib/data';
import Modal from '../../../../components/ui/Modal';
import { notFound } from 'next/navigation';
import FormattedTime from '../../../../components/ui/FormattedTime';

export default async function TaskModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = mockTasks.find((p) => p.id === id);

  if (!task) notFound();

  return (
    <Modal>
      <div className="p-12 space-y-8">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              task.severity === 'high' || task.severity === 'critical' 
                ? 'bg-red-50 border-red-100 text-red-600' 
                : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              {task.severity} Priority
            </span>
            <span className="text-slate-300 font-mono text-[10px]">{task.id}</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {task.title}
          </h2>
        </header>

        <div className="space-y-6">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {task.description || 'No description provided.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl border border-slate-100 flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Status</span>
              <span className={`text-sm font-bold uppercase ${task.status === 'completed' ? 'text-green-500' : 'text-blue-500'}`}>
                {task.status}
              </span>
            </div>
            <div className="p-6 rounded-3xl border border-slate-100 flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Created</span>
              <span className="text-sm font-bold text-slate-700">
                <FormattedTime date={task.timestamp} />
              </span>
            </div>
          </div>
        </div>

        <footer className="pt-4">
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-colors shadow-xl shadow-slate-200">
            Export Logs
          </button>
        </footer>
      </div>
    </Modal>
  );
}
