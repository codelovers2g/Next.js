/**
 * Latest Version Used: Next.js 16.2.4 / React 19.2.0
 * File Purpose: Dashboard Entry Point with Async Request APIs and 'use cache'
 */

import React, { Suspense } from 'react';
import Form from 'next/form'; // Optimized Next.js 15+ form navigation
import ItemList from '../components/dashboard/ItemList';
import AddTaskForm from '../components/dashboard/AddTaskForm';
import { mockItems } from '../lib/schema';

/**
 * Next.js 16 introduces stable 'use cache' for granular, composable caching
 * that can be applied to functions, server components, or entire packages.
 * Additionally, searchParams and params are now Promises to support 
 * improved partial rendering and streaming architectures.
 */
async function getDashboardData(searchParams: Promise<{ query?: string }>) {
  'use cache'; // Declarative caching for this specific data fetching unit
  
  const { query } = await searchParams; // Asynchronous access (Next.js 15+)
  
  // High-performance filtering logic
  const items = query 
    ? mockItems.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    : mockItems;

  return {
    items,
    metadata: {
      total: items.length,
      timestamp: new Date().toISOString()
    }
  };
}

export default async function DashboardPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ query?: string }> 
}) {
  // Fetch data using the cached async pattern
  const { items, metadata } = await getDashboardData(searchParams);

  return (
    <main className="p-10 max-w-6xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Nexus <span className="text-blue-600">OS</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs mt-3">
            Core Management System / v16.2.4
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-300 uppercase">Latency Status</p>
            <p className="text-sm font-bold text-green-500">Nominal (Cached)</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white font-black">
            AI
          </div>
        </div>
      </header>

      <section className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter">Active Protocols</h2>
            <Form action="/" className="flex gap-3">
              <input 
                name="query" 
                placeholder="Filter protocols..." 
                className="px-5 py-2 rounded-xl bg-white border border-slate-200 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all w-48 text-sm"
              />
            </Form>
          </div>
          
          <Suspense fallback={<div className="h-64 bg-slate-100 animate-pulse rounded-[2rem]" />}>
            <ItemList initialItems={items} />
          </Suspense>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl shadow-blue-900/10">
            <h2 className="text-2xl font-black mb-6 tracking-tight">Initialize Subroutine</h2>
            <AddTaskForm />
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">System Telemetry</h3>
            <div className="flex justify-between items-center text-sm font-bold text-slate-700">
              <span>Total Active Tasks</span>
              <span className="text-blue-600">{metadata.total}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-slate-700">
              <span>Last Sync</span>
              <span className="text-slate-400 font-mono text-[10px]">{metadata.timestamp}</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
