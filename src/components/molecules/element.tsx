import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RxDragHandleDots2, RxTrash } from 'react-icons/rx';
import ConvertJSONToHTML from '../atoms/convertJSONToHTML';
import { useList } from '../store/useList';

function Element({ sectionId, taskId, index, ...props }: { sectionId: string; taskId: string; index: number }) {
  const tasks = useList((s) => s.tasks);
  const element = tasks[taskId]?.element;
  const isPreviewMode = useList((state) => state.isPreviewMode);
  const removeElement = useList((state) => state.removeElement);

  if (!element) return null;

  if (isPreviewMode) return <ConvertJSONToHTML json={element} />;

  return (
    <Draggable key={`${taskId}`} draggableId={`${taskId}`} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={`flex flex-col mb-2 border-2 border-black bg-white`}
        >
          <div className='flex flex-row justify-between py-1 pl-2 pr-1 font-bold text-black uppercase bg-blue-500 border-b border-black '>
            <div className='select-none'>{element.tagName}</div>

            <div className='flex flex-row text-2xl '>
              <RxTrash
                className='cursor-pointer'
                onClick={() => {
                  removeElement(sectionId, taskId);
                }}
              />

              <div {...provided.dragHandleProps}>
                <RxDragHandleDots2 />
              </div>
            </div>
          </div>

          <ConvertJSONToHTML json={element} />
        </div>
      )}
    </Draggable>
  );
}

export default memo(Element);
