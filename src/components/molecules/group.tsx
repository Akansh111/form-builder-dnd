import { lowerCase } from 'lodash-es';
import { GripVertical } from 'lucide-react';
import { useContext } from 'react';
import ElementDropDown from '../atoms/elementDropDown';
import { getInputType, getValue } from '../libs/utils';
import { IField, IGroup } from '../store/template';
import useTemplate from '../store/useTemplate';
import { Button } from '../ui/button';
import { H4 } from '../ui/h4';
import { Input } from '../ui/input';
import Field from './field';
import { SortableItemContext } from './sortableItem';

export default function Group({ title, group, path }: { title: string; group: IGroup; path?: string }) {
  const { groupHeader, ...fieldsOrGroups } = group || {};
  const { listeners } = useContext(SortableItemContext);
  const removeEntity = useTemplate((s) => s.removeEntity);

  if (group?.groupHeader?.visible === false) return null;

  return (
    <div id={`${group?.groupHeader?.groupId || title}`} className='w-full p-2 bg-white border rounded-md'>
      <div className='flex flex-row'>
        <H4>{getValue(group?.groupHeader?.displayLabel) || lowerCase(title.split('-')[0])}</H4>

        <div className='ml-auto space-x-2'>
          <ElementDropDown path={`${path}.${title}`} />

          <Button variant='outline' size='icon' {...listeners}>
            <GripVertical className='w-4 h-4' />
          </Button>
        </div>
      </div>

      <CurrencyInput group={group} />

      <div className='flex flex-row flex-wrap w-full gap-2'>
        {Object.keys(fieldsOrGroups).map((fieldOrGroupKey) => {
          if (fieldOrGroupKey === 'customFields') {
            Object.keys(fieldsOrGroups[fieldOrGroupKey]).map((customFieldKey) => {
              return (
                <Field
                  title={customFieldKey}
                  key={customFieldKey}
                  field={fieldsOrGroups[fieldOrGroupKey][customFieldKey] as IField}
                />
              );
            });
          }

          if (fieldsOrGroups[fieldOrGroupKey]?.groupHeader) {
            return (
              <Group
                title={fieldOrGroupKey}
                key={fieldOrGroupKey}
                group={fieldsOrGroups[fieldOrGroupKey] as IGroup}
                path={`${path}.${title}`}
              />
            );
          }

          if (fieldsOrGroups[fieldOrGroupKey]?.fieldHeader) {
            return (
              <Field title={fieldOrGroupKey} key={fieldOrGroupKey} field={fieldsOrGroups[fieldOrGroupKey] as IField} />
            );
          }
        })}
      </div>

      {/* <pre>{JSON.stringify(group, null, 2)}</pre> */}
    </div>
  );
}

const CurrencyInput = ({ group }: { group: IGroup }) => {
  if (group?.currency && group?.amount) {
    return (
      <div className='relative flex flex-row px-2'>
        <div className='absolute font-semibold left-6 top-2'>{group?.currency}</div>

        <Input type={getInputType(group?.amount)} className='pl-8' />
      </div>
    );
  }
  return null;
};
