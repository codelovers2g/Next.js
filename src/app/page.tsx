import React, { Suspense } from 'react';
import Form from 'next/form'; 
import TaskList from '../components/dashboard/TaskList';
import AddTaskForm from '../components/dashboard/AddTaskForm';
import FormattedTime from '../components/ui/FormattedTime';
import { mockTasks } from '../lib/data';
import { Search } from 'lucide-react';

/**
 * The 'use cache' directive enables granular server-side caching, 
 * optimizing performance for data-heavy operations.
 */
async function getDashboardData(query?: string) {
  'use cache';
  
  const tasks = query 
    ? mockTasks.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
    : mockTasks;

  return {
    tasks,
    metadata: {
      total: tasks.length,
      active: tasks.filter(p => p.status === 'pending').length,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * In Next.js 15+, searchParams is a Promise that must be awaited to access 
 * URL parameters in Server Components.
 */
export default async function DashboardPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ query?: string }> 
}) {
  const { query } = await searchParams;
  const { tasks, metadata } = await getDashboardData(query);

  return (
    <main className="p-8 md:p-12 max-w-[1600px] mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-slate-900 to-blue-600" />
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900">
              TaskFlow
            </h1>
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">
            Task Orchestrator / Build 16.2.4.9
          </p>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="hidden md:block text-right space-y-1">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">TaskFlow</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm font-bold text-slate-800">Operational</p>
            </div>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center text-white text-xl font-black shadow-2xl shadow-blue-900/20">
            TF
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <section className="lg:col-span-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Tasks</h2>
              <p className="text-xs font-medium text-slate-400 mt-1">Status</p>
            </div>
            <Form action="/" className="relative">
              <input 
                name="query" 
                defaultValue={query}
                placeholder="Search tasks..." 
                className="pl-12 pr-6 py-3 rounded-2xl bg-white border border-slate-200 focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all w-full md:w-64 text-sm font-medium"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} strokeWidth={2.5} />
            </Form>
          </div>
          
          {/* Suspense boundaries allow for progressive rendering, improving perceived performance. */}
          <Suspense fallback={<div className="h-96 bg-slate-100 animate-pulse rounded-[3rem]" />}>
            <TaskList initialTasks={tasks} />
          </Suspense>
        </section>

        <aside className="lg:col-span-4 space-y-10">

          <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/40 transition-colors" />
            <div className="relative z-10 space-y-8">
              <div>
                <h2 className="text-2xl font-black tracking-tight">Add Task</h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Manual Override</p>
              </div>
              <AddTaskForm />
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 space-y-6 shadow-sm">
            <h3 className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500">Total Tasks</span>
                <span className="text-slate-900 font-black font-mono">{metadata.total}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500">Active Tasks</span>
                <span className="text-blue-600 font-black font-mono">{metadata.active}</span>
              </div>
              <div className="h-px bg-slate-100 my-2" />
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500">Last Update</span>
                <span className="text-slate-400 text-[10px]">
                  <FormattedTime date={metadata.timestamp} />
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
