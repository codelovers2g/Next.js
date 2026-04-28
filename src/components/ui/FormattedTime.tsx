'use client';

import { useEffect, useState } from 'react';

// Client-side formatting within useEffect prevents hydration mismatches between server and client date strings.
export default function FormattedTime({ date }: { date: string | Date }) {
  const [formatted, setFormatted] = useState<string>('--:--:--');

  useEffect(() => {
    setFormatted(new Date(date).toLocaleTimeString());
  }, [date]);

  return <span className="font-mono">{formatted}</span>;
}
