function Small({ className, children }: { className?: string; children: React.ReactNode }) {
  return <small className={`flex flex-row space-x-2 text-sm font-medium leading-none ${className}`}>{children}</small>;
}

export { Small };
