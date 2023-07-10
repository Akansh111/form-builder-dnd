import ClickEdit from '@/assets/img/ClickEdit.png';
import { capitalize, get, lowerCase } from 'lodash-es';
import Image from 'next/image';
import { memo, useMemo, useState } from 'react';
import useTemplate from '../store/useTemplate';
import { Button } from '../ui/button';
import { H5 } from '../ui/h5';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

function EditComponent() {
  const selectedEntity = useTemplate((s) => s.selectedEntity);
  const template = useTemplate((s) => s.template);
  const renameEntity = useTemplate((s) => s.renameEntity);

  const element = get(template, selectedEntity);
  const title = useMemo(() => {
    const arr = selectedEntity.split('.');
    return capitalize(lowerCase(arr[arr.length - 1]));
  }, [selectedEntity]);

  const [state, setState] = useState({
    name: title,
  });

  const onSave = () => {
    renameEntity(state.name);
  };

  if (selectedEntity.length === 0) {
    return (
      <div className='flex flex-col m-4 border rounded-lg shadow-sm'>
        <div className='mx-auto w-52'>
          <Image src={ClickEdit} width={200} height={200} layout='responsive' alt='empty' />
        </div>
        <H5 className='px-4 my-4 text-center'>Please click on edit button in element dropdown</H5>
      </div>
    );
  }

  return (
    <div className='overflow-y-auto'>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-row space-x-4'>
          <Label htmlFor='name' className='my-auto '>
            Name
          </Label>
          <Input id='name' value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} />
        </div>

        <div className='ml-auto'>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default memo(EditComponent);
