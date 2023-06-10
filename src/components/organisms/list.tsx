import { useCallback, useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Section from '../molecules/section';
import SectionBar from '../molecules/sectionBar';
import { useList } from '../store/useList';
import SectionNavBar from '../molecules/sectionNavBar';

export default function List() {
  const columns = useList((state) => state.columns);
  const move = useList((state) => state.move);
  const isPreviewMode = useList((state) => state.isPreviewMode);
  const activeSection = useList((state) => state.activeSection);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsBrowser(true);
  }, []);

  const MainContent = useCallback(
    () => <Section key={activeSection} section={columns[activeSection]} />,
    [activeSection, columns],
  );

  if (isPreviewMode) {
    return (
      <div className='flex flex-col'>
        <MainContent />

        <SectionNavBar />
      </div>
    );
  }
  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        move(source, destination);
      }}
    >
      {/* Conditional Rendering is required, else it will not find the elements correctly */}
      {isBrowser && (
        <div className='flex flex-col space-y-2'>
          <SectionBar />

          <MainContent />
        </div>
      )}
    </DragDropContext>
  );
}
