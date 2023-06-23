import { Code } from '@/components/typography/code';
import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RxDragHandleDots2, RxTrash } from 'react-icons/rx';
import ConvertJSONToHTML from '../atoms/convertJSONToHTML';
import { useList } from '../store/useList';

function Element({
  sectionId,
  taskId,
  index,
  isPreviewMode,
  ...props
}: {
  sectionId: string;
  taskId: string;
  index: number;
  isPreviewMode?: boolean;
}) {
  const elements = useList((s) => s.elements);
  const task = elements[taskId];
  const element = task?.element;
  const removeElement = useList((state) => state.removeElement);

  if (!element) return null;

  if (isPreviewMode) return <ConvertJSONToHTML json={element} />;

  if (sectionId === 'toolbox') {
    return (
      <Draggable key={`${taskId}`} draggableId={`${taskId}`} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={`${
              snapshot.isDragging ? 'shadow-lg' : 'shadow'
            } transition-all flex flex-row mb-2 bg-gray-200 px-2 py-1 rounded-md border border-gray-300 overflow-hidden justify-between`}
          >
            <div className='px-3 my-auto font-semibold text-gray-900 select-none'>{`<${taskId} />`}</div>

            <div {...provided.dragHandleProps} className='px-2 py-1 my-auto text-xl '>
              <RxDragHandleDots2 />
            </div>
          </div>
        )}
      </Draggable>
    );
  }

  return (
    <Draggable key={`${taskId}`} draggableId={`${taskId}`} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`${
            snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'
          } transition-all flex flex-col mb-2 bg-white rounded-md border-2  border-gray-300 overflow-hidden `}
        >
          <div className='flex flex-row justify-between h-max'>
            <div className='px-3 pt-1 pb-0.5 mb-1 ml-2 -mt-1 text-white bg-gray-800 select-none text-md rounded-b-md'>
              {index + 1}
            </div>

            <div className='px-2 py-1'>
              <Code>{`<${task.id} /> `}</Code>
            </div>

            <div className='flex flex-row bg-gray-200 cursor-pointer'>
              <div className='px-2 py-1 text-xl'>
                <RxTrash
                  onClick={() => {
                    removeElement(sectionId, taskId);
                  }}
                />
              </div>

              <div {...provided.dragHandleProps} className='px-2 py-1 text-xl '>
                <RxDragHandleDots2 />
              </div>
            </div>
          </div>

          <div className='p-2'>
            <ConvertJSONToHTML json={element} />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default memo(Element);
