import { memo } from 'react';
import { RxPlusCircled } from 'react-icons/rx';
import { useList } from '../store/useList';

function SectionBar() {
  const columns = useList((state) => state.columns);
  const addNewColumn = useList((state) => state.addNewColumn);
  const activeSection = useList((state) => state.activeSection);
  const setActiveSection = useList((state) => state.setActiveSection);

  return (
    <div className='border-b-2 border-gray-200 '>
      <nav className='flex px-4 mx-auto space-x-6 overflow-auto'>
        {Object.values(columns).map((section, index) => (
          <button
            className={`transition-all py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm whitespace-nowrap ${
              activeSection === section.id
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
            key={index}
            onClick={() => setActiveSection(section.id)}
          >
            {section.title}
          </button>
        ))}

        <button
          className='inline-flex items-center gap-2 px-1 py-4 text-sm text-gray-500 border-b-2 border-transparent whitespace-nowrap hover:text-blue-600'
          onClick={() => addNewColumn()}
          title='Add new section'
        >
          <RxPlusCircled className='text-2xl' />
        </button>
      </nav>
    </div>
  );
}

export default memo(SectionBar);
