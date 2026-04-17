'use client';

import { useOptimistic } from 'react';
import { Item } from '../../lib/schema';

export default function ItemList({ initialItems }: { initialItems: Item[] }) {
  // React 19 useOptimistic for instant UI feedback
  const [optimisticItems, addOptimisticItem] = useOptimistic(
    initialItems,
    (state, newItem: Item) => [...state, newItem]
  );

  return (
    <ul className="space-y-4">
      {optimisticItems.map((item) => (
        <li 
          key={item.id} 
          className={`p-5 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
            item.status === 'completed' 
              ? 'bg-slate-50 border-slate-200 opacity-60 grayscale' 
              : 'bg-white border-blue-100 shadow-md hover:shadow-xl hover:-translate-y-1'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-slate-400' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`} />
            <span className={`text-lg ${item.status === 'completed' ? 'line-through text-slate-500' : 'font-semibold text-slate-800'}`}>
              {item.title}
            </span>
          </div>
          {item.status === 'pending' && (
            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              Active
            </span>
          )}
        </li>
      ))}
      {optimisticItems.length === 0 && (
        <div className="text-slate-400 font-medium py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
          <p className="text-xl">No tasks matched your search</p>
          <p className="text-sm text-slate-300 mt-2">Try a different query or add a new task</p>
        </div>
      )}
    </ul>
  );
}
