import { H3 } from '@/components/typography/h3';
import { isEmpty } from 'lodash-es';
import { memo, useCallback } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ISection } from '../store/useList';
import Element from './element';

function Section({ section, isPreviewMode }: { section: ISection; isPreviewMode?: boolean }) {
  const MainContent = useCallback(
    () => (
      <>
        {section.taskIds.map((taskId, key) => (
          <Element sectionId={section.id} taskId={taskId} key={taskId} index={key} isPreviewMode={isPreviewMode} />
        ))}
      </>
    ),
    [isPreviewMode, section?.id, section?.taskIds],
  );

  if (isEmpty(section)) return null;

  if (isPreviewMode) {
    return (
      <div className='flex flex-col gap-2 p-4'>
        <H3>{section.title}</H3>
        <MainContent />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 px-2 my-4'>
      <H3>{section.title}</H3>

      <Droppable droppableId={`${section.id}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2 -m-2 rounded-lg ${snapshot.isDraggingOver && 'bg-gray-300'}`}
          >
            <div className='-mt-4 opacity-0'>Drop here</div>

            <MainContent />

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default memo(Section);
