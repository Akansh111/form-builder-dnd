import { DragOverlay, useDroppable } from '@dnd-kit/core';
import { lowerCase } from 'lodash-es';
import { DRAGGABLE_TYPE } from '../constants/dnd';
import { useDragContext } from '../store/useDragContext';
import useTemplate from '../store/useTemplate';
import { H5 } from '../ui/h5';
import Draggable from '../atoms/draggable';

export default function AddComponents() {
  const template = useTemplate((s) => s.template);
  const activeElement = useDragContext((s) => s.activeElement);
  const addComponents = useTemplate((s) => s.addComponents);
  const addComponentVisible = useDragContext((s) => s.addComponentVisible);

  const { setNodeRef } = useDroppable({
    id: 'Add Components',
    data: {
      accepts: [DRAGGABLE_TYPE.ADD_GROUP],
    },
  });

  if (!addComponentVisible) return null;

  return (
    <div className='p-2 overflow-y-auto' ref={setNodeRef}>
      {Object.keys(addComponents).map((key) => {
        return (
          <div key={key}>
            <H5>{lowerCase(key)}</H5>

            <div className='flex flex-row flex-wrap gap-2 p-2'>
              {Object.keys(addComponents[key].components).map((index) => {
                if (['templateHeader', 'sectionHeader', 'groupHeader'].includes(index)) return null;

                return (
                  <Draggable
                    key={index}
                    id={`${DRAGGABLE_TYPE.ADD_GROUP}-${key}-${index}`}
                    type={`${addComponents[key].type}`}
                  >
                    <div className='px-2 py-1 bg-gray-300 border rounded-md'>
                      <p className='capitalize'>{lowerCase(index)}</p>
                    </div>
                  </Draggable>
                );
              })}

              <DragOverlay>
                {activeElement && activeElement?.type === addComponents[key].type ? (
                  <div className='z-50 transition-all rounded-md ring-2 ring-blue-600'>
                    <div className='px-2 py-1 bg-gray-300 border rounded-md'>
                      <p className='capitalize'>
                        {lowerCase(activeElement?.id.split('-')[activeElement?.id.split('-').length - 1])}
                      </p>
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </div>
          </div>
        );
      })}
    </div>
  );
}
