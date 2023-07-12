import { FileDown, Play } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';
import { ROUTES } from '../libs/routes';
import { ITemplate } from '../store/template';
import useTemplate from '../store/useTemplate';
import { Button } from '../ui/button';

function TopBar() {
  const template = useTemplate((s) => s.template);

  const handleDownload = () => downloadTemplate(template);

  return (
    <div className='flex flex-row px-1 bg-gray-200'>
      <div className='w-full max-w-md px-2 py-1 mx-auto my-2 bg-white rounded-md shadow'>
        {template.templateHeader?.templateName || 'Untitled'}
      </div>

      <div className='flex flex-row gap-1 my-auto ml-auto'>
        <Link passHref href={ROUTES.PREVIEW}>
          <Button variant='ghost' size='icon' title='Preview'>
            <Play className='w-4 h-4' />
          </Button>
        </Link>

        <Button variant='ghost' size='icon' onClick={handleDownload} title='Download JSON '>
          <FileDown className='w-4 h-4' />
        </Button>
      </div>
    </div>
  );
}

export const downloadTemplate = (template: ITemplate) => {
  // converting tmeplate into json
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(template, null, 2))}`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', `${template.templateHeader?.templateName}.json`);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export default memo(TopBar);
