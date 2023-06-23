import { Button } from '@/components/ui/button';
import { memo } from 'react';
import { useList } from '../store/useList';

function SectionNavBar() {
  const activeSection = useList((s) => s.activeSection);
  const setActiveSection = useList((s) => s.setActiveSection);
  const sectionOrder = useList((s) => s.sectionOrder);
  const previousSection = sectionOrder?.[sectionOrder.indexOf(activeSection) - 1];
  const nextSection = sectionOrder?.[sectionOrder.indexOf(activeSection) + 1];

  return (
    <div className='flex px-4 pb-4 '>
      {previousSection && (
        <Button
          onClick={() => {
            setActiveSection(previousSection);
          }}
        >
          Previous
        </Button>
      )}

      {nextSection && (
        <Button
          onClick={() => {
            setActiveSection(nextSection);
          }}
          className='ml-auto'
        >
          Next
        </Button>
      )}
    </div>
  );
}

export default memo(SectionNavBar);
