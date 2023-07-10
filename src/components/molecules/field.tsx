import { lowerCase } from 'lodash-es';
import { useMemo } from 'react';
import DropdownDay from '../atoms/dropdownDay';
import DropdownMonth from '../atoms/dropdownMonth';
import { IField } from '../store/template';
import { H5 } from '../ui/h5';
import { Input } from '../ui/input';

export default function Field({ title, field }: { title: string; field: IField }) {
  const fieldType = useMemo(() => {
    if (!field?.format) return 'text';

    if (field?.format?.match(/\d{4}-\d{2}-\d{2}/)) return 'date';
    if (field?.format?.match(/\d{2}\/\d{2}\/\d{4}/)) return 'date';

    if (field?.format?.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) return 'datetime-local';

    if (field?.format?.match(/\d{2}:\d{2}:\d{2}/)) return 'time';

    console.warn(`Unknown format: ${field?.format}. Defaulting to text.`);
    return 'text';
  }, [field?.format]);

  if (field?.fieldHeader?.visible === false) return null;

  return (
    <div className='flex flex-col m-1 grow'>
      <H5>{lowerCase(title)}</H5>

      {{
        day: <DropdownDay />,
        month: <DropdownMonth />,
      }[title] || <Input type={fieldType} />}
    </div>
  );
}
