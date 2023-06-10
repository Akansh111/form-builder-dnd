import { memo } from 'react';
import { useList } from '../store/useList';

function SectionNavBar() {
  const activeSection = useList((s) => s.activeSection);
  const setActiveSection = useList((s) => s.setActiveSection);
  const columnOrder = useList((s) => s.columnOrder);
  const previousSection = columnOrder?.[columnOrder.indexOf(activeSection) - 1];
  const nextSection = columnOrder?.[columnOrder.indexOf(activeSection) + 1];

  return (
    <>
      <div className='flex'>
        {previousSection && (
          <button
            onClick={() => {
              setActiveSection(previousSection);
            }}
            className={' px-4 py-2 my-4 text-white bg-blue-500 rounded-md hover:bg-blue-700'}
          >
            Previous
          </button>
        )}

        {nextSection && (
          <button
            onClick={() => {
              setActiveSection(nextSection);
            }}
            className={'ml-auto px-4 py-2 my-4 text-white bg-blue-500 rounded-md hover:bg-blue-700'}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default memo(SectionNavBar);
