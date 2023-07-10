export function H5({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h5 className={'text-base font-medium tracking-tight capitalize scroll-m-20 ' + className}>{children}</h5>;
}
