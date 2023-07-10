import { Transition } from '@headlessui/react';

const AnimatedSidePanel = ({ isVisible, children }: { isVisible: boolean; children: React.ReactNode }) => {
  const x = 'opacity-0 transform -translate-x-64 ';
  const y = 'opacity-100 transform translate-x-0';
  const z = 'transition-all ease-in-out  duration-500';

  return (
    <Transition show={isVisible} enter={z} enterFrom={x} enterTo={y} leave={z} leaveFrom={y} leaveTo={x}>
      {children}
    </Transition>
  );
};

export default AnimatedSidePanel;
