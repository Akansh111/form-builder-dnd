import { memo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { IColumn, useList } from '../store/useList';
import Element from './element';

function Section({ section }: { section: IColumn }) {
  const isPreviewMode = useList((state) => state.isPreviewMode);

  if (isPreviewMode) {
    return (
      <div>
        <h2 className='text-2xl'>{section.title}</h2>
        {section.taskIds.map((taskId, key) => (
          <Element sectionId={section.id} taskId={taskId} key={taskId} index={key} />
        ))}
      </div>
    );
  }

  return (
    <div className='bg-blue-200 border-2 border-blue-700 border-dashed '>
      <h2 className='px-2 py-1 text-2xl font-bold text-blue-500'>{section.title}</h2>
      <Droppable droppableId={`${section.id}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`m-2 ${snapshot.isDraggingOver && 'bg-gray-200'}`}
          >
            {section.taskIds.map((taskId, key) => (
              <Element sectionId={section.id} taskId={taskId} key={taskId} index={key} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default memo(Section);
