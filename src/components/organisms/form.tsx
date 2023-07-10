import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useEffect } from 'react';
import { DRAGGABLE_TYPE } from '../constants/dnd';
import { getUniqueId } from '../libs/utils';
import { Section } from '../molecules/section';
import SectionNavBar from '../molecules/sectionNavBar';
import { ISection } from '../store/template';
import { useDragContext } from '../store/useDragContext';
import useTemplate from '../store/useTemplate';
import Sidebar from './sidebar';

export default function Form() {
  const template = useTemplate((s) => s.template);
  const { templateHeader, ...filteredTemplate } = template || {};
  const activeSection = useTemplate((s) => s.activeSection);
  const setTemplate = useTemplate((s) => s.setTemplate);
  const setActiveSection = useTemplate((s) => s.setActiveSection);
  const setActiveElement = useDragContext((s) => s.setActiveElement);
  const addComponents = useTemplate((s) => s.addComponents);
  const setAddComponentVisible = useDragContext((s) => s.setAddComponentVisible);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ active }: any) => {
    if (active?.id && active?.data?.current?.type) {
      setActiveElement({
        id: active.id,
        type: active?.data?.current?.type,
      });
    }
  };

  const handleDragEnd = (event: any) => {
    setActiveElement(null);
    setTemplate({ ...template });
    setAddComponentVisible(false);

    setTimeout(() => {
      setAddComponentVisible(true);
    }, null);

    console.log(event);

    const { active, over } = event;

    if (active.id === over.id) return null;

    if (active?.data?.current?.type === DRAGGABLE_TYPE.GROUP && over?.data?.current?.type === DRAGGABLE_TYPE.GROUP) {
      const { sectionHeader, ...groups } = (filteredTemplate?.[activeSection] || {}) as ISection;

      const keys = Object.keys(groups);
      const sortedKeys = arrayMove(keys, keys.indexOf(active.id), keys.indexOf(over.id));

      const sortedGroups = sortedKeys.reduce((acc, key) => {
        acc[key] = groups[key];
        return acc;
      }, {});

      const newTemplate = {
        ...template,
        [activeSection]: {
          sectionHeader,
          ...sortedGroups,
        },
      };

      setTemplate(newTemplate);
      return;
    }

    if (
      active?.data?.current?.type === DRAGGABLE_TYPE.ADD_GROUP &&
      over?.data?.current?.type === DRAGGABLE_TYPE.GROUP
    ) {
      const { sectionHeader, ...groups } = (filteredTemplate?.[activeSection] || {}) as ISection;

      const index = active.id.split('-')[2];

      const groupKey = getUniqueId(index, groups);
      const newGroup = {
        [groupKey]: {
          ...addComponents?.[active.id.split('-')[1]]?.components?.[index],
        },
      };

      const newTemplate = {
        ...template,
        [activeSection]: {
          sectionHeader,
          ...groups,
          ...newGroup,
        },
      };

      const keys = Object.keys(newTemplate[activeSection]);
      keys.splice(keys.indexOf('sectionHeader'), 1);

      const sortedKeys = arrayMove(keys, keys.indexOf(groupKey), keys.indexOf(over.id));
      const sortedGroups = sortedKeys.reduce((acc, key) => {
        acc[key] = newTemplate[activeSection][key];
        return acc;
      }, {});

      const newTemplate2 = {
        ...template,
        [activeSection]: {
          sectionHeader,
          ...sortedGroups,
        },
      };

      setTemplate(newTemplate2);
      return;
    }
  };

  useEffect(() => {
    setActiveSection(Object.keys(filteredTemplate)[2]);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className='flex flex-col w-screen h-screen bg-gray-200'>
        <div className='flex flex-col bg-gray-200'>
          <div className='w-full max-w-md px-2 py-1 mx-auto my-2 bg-white rounded-md shadow'>
            {templateHeader?.templateName || 'Untitled'}
          </div>
        </div>

        <div className='flex flex-row w-full h-full overflow-hidden bg-gray-100 '>
          <div className='flex flex-row max-w-[20%] h-full '>
            <Sidebar />
          </div>

          <div className='w-3/5 mx-auto mb-2 overflow-y-auto'>
            <SectionNavBar />

            <Section />
          </div>
        </div>
      </div>
    </DndContext>
  );
}
