import { Component, SlidersHorizontal, X } from 'lucide-react';
import AnimatedSidePanel from '../atoms/animatedSidePanel';
import { SIDEBAR } from '../libs/constants';
import AddComponents from '../molecules/addComponents';
import EditComponent from '../molecules/editComponent';
import useTemplate from '../store/useTemplate';
import { Button } from '../ui/button';
import { H5 } from '../ui/h5';

const sideComponents = [
  {
    id: SIDEBAR.TOOLBOX,
    name: 'Toolbox',
    Icon: Component,
    children: <AddComponents />,
  },
  {
    id: SIDEBAR.EDIT_COMPONENT,
    name: 'Edit Component',
    Icon: SlidersHorizontal,
    children: <EditComponent />,
  },
];

export default function Sidebar() {
  const activeSidebar = useTemplate((s) => s.activeSidebar);
  const setActiveSidebar = useTemplate((s) => s.setActiveSidebar);

  return (
    <>
      <div className='z-20 flex flex-col h-full px-1 space-y-1 bg-gray-200'>
        {sideComponents.map(({ id, name, Icon }, key) => {
          const isActive = activeSidebar === id;

          return (
            <Button
              variant='outline'
              size='icon'
              className={`relative flex-grow-0 flex-shrink-0 w-12 h-12 hover:bg-blue-200 hover:text-blue-900 active:text-black transition-all active:scale-95 border-0 ${
                isActive
                  ? 'bg-blue-200 shadow shadow-blue-600/10 text-blue-900'
                  : 'bg-transparent shadow-none text-gray-800'
              }`}
              onClick={() => setActiveSidebar(id)}
              key={key}
              title={name}
            >
              <Icon className={`w-6 h-6 transition-all `} />
              {isActive && <div className='absolute w-1 h-6 bg-blue-600 -left-0.5 rounded-3xl'></div>}
            </Button>
          );
        })}
      </div>

      {sideComponents.map(({ id, name, children }, key) => (
        <AnimatedSidePanel isVisible={activeSidebar === id} key={key}>
          <div className='flex flex-col w-64 h-full overflow-hidden bg-white rounded-md shadow-md'>
            <div className='flex flex-row justify-between w-full px-2 py-3 bg-gray-300'>
              <H5 className='my-auto'>{name}</H5>

              <X className='w-6 h-6 my-auto cursor-pointer ' onClick={() => setActiveSidebar('')} />
            </div>

            {children}
          </div>
        </AnimatedSidePanel>
      ))}
    </>
  );
}
