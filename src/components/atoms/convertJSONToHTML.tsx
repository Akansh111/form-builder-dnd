import { InputWithLabel } from '@/components/varients/inputWithLabel';
import { memo } from 'react';
import { IElement } from '../store/useList';
import { Textarea } from '@/components/ui/textarea';

const ConvertJSONToHTML = ({ json }: { json: IElement }) => {
  const CustomTag = `${json.tagName}` as keyof JSX.IntrinsicElements;

  const attributes = { ...json.attributes };
  delete attributes.children;
  delete attributes.innerHTML;

  if (json.tagName === 'textarea') return <Textarea {...attributes} />;

  if (json.tagName === 'input' && json.attributes?.type !== 'checkbox')
    return (
      <InputWithLabel id={`${Math.random()}`} label={`${attributes?.label || ''}`} inputProps={{ ...attributes }} />
    );

  if (json?.tagType === 'closed') return <CustomTag {...attributes} />;

  return (
    <CustomTag {...attributes}>
      {json?.innerHTML || ''}

      {json?.children?.map((child: IElement) => {
        return ConvertJSONToHTML({ json: child });
      })}
    </CustomTag>
  );
};

export default memo(ConvertJSONToHTML);
