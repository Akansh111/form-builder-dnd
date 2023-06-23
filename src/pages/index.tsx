import { H4 } from '@/components/typography/h4';
import { ScrollArea } from '@/components/ui/scroll-area';
import AddSections from '@/src/components/molecules/addSections';
import Section from '@/src/components/molecules/section';
import List from '@/src/components/organisms/list';
import MobilePreview from '@/src/components/organisms/mobilePreview';
import { useList } from '@/src/components/store/useList';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

export default function Home() {
  const sections = useList((state) => state.sections);
  const sectionOrder = useList((s) => s.sectionOrder);
  const move = useList((state) => state.move);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsBrowser(true);
  }, []);

  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;
          const { source, destination } = result;
          move(source, destination);
        }}
      >
        {isBrowser && (
          <div className='flex flex-row h-screen max-w-[100vw] min-w-[100vw]'>
            <div className='flex-none py-4 space-y-4 overflow-y-auto bg-white border-r-2 shadow-md min-w-max '>
              <AddSections />

              <div className='relative'>
                <Section key={'toolbox'} section={sections['toolbox']} />

                {sectionOrder.length === 0 && (
                  <div className='absolute inset-0 flex w-full h-full transition-all bg-black/20 backdrop-blur-sm'>
                    <div className='m-auto '>
                      <H4>Add Section to start using the app</H4>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='flex flex-col w-full px-2 bg-gray-100 grow'>
              <ScrollArea className='h-screen max-h-screen'>
                <List />
              </ScrollArea>
            </div>

            <div className='flex flex-col flex-none max-w-xs ml-auto bg-white border-l-2 shadow-md min-w-max '>
              <MobilePreview />
            </div>
          </div>
        )}
      </DragDropContext>
    </div>
  );
}
