function Small({ children }: { children: React.ReactNode }) {
  return <small className='flex flex-row space-x-2 text-sm font-medium leading-none'>{children}</small>;
}

export { Small };
