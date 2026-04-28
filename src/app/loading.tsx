import React from 'react';

export default function Loading() {
  return (
    <div className="p-8 md:p-12 max-w-[1600px] mx-auto space-y-12 animate-pulse">
      <div className="h-40 bg-white rounded-[3rem] border border-slate-100" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <div className="h-10 w-48 bg-slate-200 rounded-xl" />
          <div className="h-[600px] bg-white rounded-[3rem] border border-slate-100" />
        </div>
        <div className="lg:col-span-4 space-y-10">
          <div className="h-80 bg-slate-900 rounded-[3rem]" />
          <div className="h-60 bg-white rounded-[3rem] border border-slate-100" />
        </div>
      </div>
    </div>
  );
}
