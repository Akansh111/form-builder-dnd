'use client';
import { DragOverlay, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { lowerCase } from 'lodash-es';
import { DRAGGABLE_TYPE } from '../constants/dnd';
import { IGroup, ISection } from '../store/template';
import { useDragContext } from '../store/useDragContext';
import useTemplate from '../store/useTemplate';
import Group from './group';
import SortableItem from './sortableItem';

 function Section() {
   const template = useTemplate((s) => s.template);
   const activeSection = useTemplate((s) => s.activeSection);
   const activeElement = useDragContext((s) => s.activeElement);
   const addComponents = useTemplate((s) => s.addComponents);

   const { setNodeRef, isOver, over } = useDroppable({
     id: DRAGGABLE_TYPE.ADD_GROUP,
     data: {
       accepts: [DRAGGABLE_TYPE.ADD_GROUP],
     },
   });

   // @ts-ignore
   const { sectionHeader, ...groups } = (template?.[activeSection] || {}) as ISection;

   if (activeSection === '') return null;

   return (
     <div className='m-2 space-y-2' ref={setNodeRef}>
       <h2 className='text-2xl font-semibold tracking-tight capitalize'>{lowerCase(activeSection)}</h2>

       <div className={`${over ? 'bg-gray-500 rounded-lg' : 'bg-transparent'} -m-2 p-2 transition-all space-y-2`}>
         <SortableContext items={Object.keys(groups)} strategy={verticalListSortingStrategy}>
           {Object.keys(groups).map((groupKey) => (
             <SortableItem id={groupKey} key={groupKey} type={DRAGGABLE_TYPE.GROUP}>
               <Group title={groupKey} group={groups[groupKey] as IGroup} path={
                `${activeSection}`
               } />
             </SortableItem>
           ))}
         </SortableContext>

         <DragOverlay>
           {activeElement && activeElement?.type === DRAGGABLE_TYPE.GROUP ? (
             <div className='transition-all rounded-md ring-2 ring-blue-600'>
               <Group title={activeElement?.id} group={groups[activeElement?.id] as IGroup} />
             </div>
           ) : null}

           {activeElement && activeElement?.type === DRAGGABLE_TYPE.ADD_GROUP ? (
             <div className='w-[500px] transition-all rounded-md  ring-2 ring-blue-600'>
               <Group
                 title={activeElement.id.split('-')[2]}
                 group={
                   addComponents?.[activeElement.id.split('-')[1]]?.components?.[
                     activeElement.id.split('-')[2]
                   ] as IGroup
                 }path={
                  `${activeSection}`
                 }
               />
             </div>
           ) : null}
         </DragOverlay>
       </div>
     </div>
   );
 }

 export { Section };

