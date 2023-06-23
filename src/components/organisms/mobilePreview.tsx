import { ScrollArea } from '@/components/ui/scroll-area';
import mobileHeader from '@/src/assets/mobileHeader.png';
import Image from 'next/image';
import { memo } from 'react';
import List from './list';

function MobilePreview() {
  return (
    <div className='sticky top-0 flex flex-col h-screen'>
      <div className='mx-auto prose'>
        <h1 className=''> Form Preview</h1>
      </div>

      <div className=' m-auto border border-gray-600 h-[80vh] flex flex-col'>
        <Image src={mobileHeader} width={400} height={200} alt='mobile navbar' className='my-0 shadow-sm'></Image>

        <ScrollArea className='flex-col w-full h-full max-w-xs min-w-full overflow-y-auto bg-white'>
          <List isPreviewMode />
        </ScrollArea>
      </div>
    </div>
  );
}

export default memo(MobilePreview);
