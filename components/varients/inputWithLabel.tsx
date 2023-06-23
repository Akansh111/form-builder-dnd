import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function InputWithLabel({
  id,
  label,
  inputProps,
}: {
  id: string;
  label: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> | object;
}) {
  return (
    <div className='grid w-full items-center gap-1.5'>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
    </div>
  );
}
