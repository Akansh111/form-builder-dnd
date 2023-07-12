import ClickEdit from '@/assets/img/ClickEdit.png';
import { camelCase, capitalize, get, lowerCase, lowerFirst } from 'lodash-es';
import Image from 'next/image';
import { memo, useCallback, useEffect, useState } from 'react';
import useTemplate from '../store/useTemplate';
import { Button } from '../ui/button';
import { H5 } from '../ui/h5';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Small } from '../ui/small';

function EditComponent() {
  const selectedEntity = useTemplate((s) => s.selectedEntity);
  const template = useTemplate((s) => s.template);
  const activeSection = useTemplate((s) => s.activeSection);
  const renameEntity = useTemplate((s) => s.renameEntity);

  const getName = useCallback(() => {
    return capitalize(lowerCase(selectedEntity.split('.')[selectedEntity.split('.').length - 1]));
  }, [selectedEntity]);

  const [state, setState] = useState({
    name: getName(),
    error: '',
  });

  const onSave = () => {
    if (state.name.length === 0) {
      setState((s) => ({
        ...s,
        error: 'Name cannot be empty',
      }));
      return;
    }

    const path = selectedEntity.split('.');
    path.pop();
    const currentPath = path.join('.');
    const currentTemplate = get(template, currentPath);
    if (Object.keys(currentTemplate).includes(lowerFirst(camelCase(state.name)))) {
      setState((s) => ({
        ...s,
        error: 'Name already exists',
      }));
      return;
    }

    setState((s) => ({
      ...s,
      error: '',
    }));

    renameEntity(state.name);
  };

  useEffect(() => {
    setState((s) => ({
      ...s,
      name: getName(),
    }));
  }, [selectedEntity]);

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
        <div className='space-y-2'>
          <div className='flex flex-row space-x-4'>
            <Label htmlFor='name' className='my-auto '>
              Name
            </Label>
            <Input
              id='name'
              value={state.name}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  name: e.target.value,
                }))
              }
            />
          </div>

          {state.error.length > 0 && <Small className='text-red-600'>{state.error}</Small>}
        </div>

        <div className='ml-auto'>
          <Button onClick={onSave}>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default memo(EditComponent);
