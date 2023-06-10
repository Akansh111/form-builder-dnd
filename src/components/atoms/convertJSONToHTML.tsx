import { memo } from 'react';
import { IElement } from '../store/useList';

const ConvertJSONToHTML = ({ json }: { json: IElement }) => {
  const CustomTag = `${json.tagName}` as keyof JSX.IntrinsicElements;

  if (json?.tagType === 'closed') return <CustomTag {...json.attributes} />;

  return (
    <CustomTag {...json.attributes}>
      {json?.innerHTML || ''}

      {json?.children?.map((child: IElement) => {
        return ConvertJSONToHTML({ json: child });
      })}
    </CustomTag>
  );
};

export default memo(ConvertJSONToHTML);
