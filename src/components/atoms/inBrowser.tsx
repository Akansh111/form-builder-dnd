import { useEffect, useState } from 'react';

export default function InBrowser({ children }: { children: React.ReactNode }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsBrowser(true);
  }, []);

  if (!isBrowser) return null;

  return children;
}
