import { H3 } from '@/components/typography/h3';
import { P } from '@/components/typography/p';
import { Plus } from 'lucide-react';
import { memo } from 'react';
import { RxPlusCircled, RxTrash } from 'react-icons/rx';
import { useList } from '../store/useList';

function SectionBar() {
  const sections = useList((state) => state.sections);
  const sectionOrder = useList((state) => state.sectionOrder);
  const addNewSection = useList((state) => state.addNewSection);
  const activeSection = useList((state) => state.activeSection);
  const setActiveSection = useList((state) => state.setActiveSection);
  const removeSection = useList((state) => state.removeSection);

  if (sectionOrder.length === 0)
    return (
      <div className='flex flex-col h-screen '>
        <div
          role='button'
          onClick={() => addNewSection()}
          className='flex flex-col p-6 m-auto space-y-2 text-center transition-all bg-gray-200 border rounded-md shadow-sm cursor-pointer hover:shadow-lg active:shadow-inner border-black/20'
        >
          <Plus className='w-12 h-12 mx-auto ' />
          <H3>Add Section</H3>
          <P>Click Here to add blank section.</P>
        </div>
      </div>
    );

  return (
    <div className='sticky top-0 z-20 flex flex-row w-[42rem] overflow-x-auto h-14 flex-nowrap px-2 mx-auto space-x-6 bg-gray-100 shadow'>
      {sectionOrder.map((sectionId, index) => {
        const section = sections[sectionId];

        return (
          <div
            key={index}
            className={`transition-all py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm whitespace-nowrap active:scale-95 scale-100 cursor-pointer ${
              activeSection === section.id
                ? 'border-gray-800 text-gray-800 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <button onClick={() => setActiveSection(section.id)} className='-mx-1 -my-4'>
              {section.id}
            </button>

            <button
              onClick={() => {
                removeSection(sectionId);
              }}
              className='p-1 -my-1 text-xl transition-all rounded-md hover:bg-red-500 hover:text-white'
            >
              <RxTrash />
            </button>
          </div>
        );
      })}

      <button
        className='inline-flex items-center gap-2 px-1 py-4 text-sm text-gray-500 border-b-2 border-transparent whitespace-nowrap hover:text-gray-800'
        onClick={() => addNewSection()}
        title='Add new section'
      >
        <RxPlusCircled className='text-2xl' />
      </button>
    </div>
  );
}

export default memo(SectionBar);
