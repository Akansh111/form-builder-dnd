import { lowerCase } from 'lodash-es';
import useTemplate from '../store/useTemplate';
import { Button } from '../ui/button';

export default function SectionNavBar() {
  const template = useTemplate((s) => s.template);
  const setActiveSection = useTemplate((s) => s.setActiveSection);
  const activeSection = useTemplate((s) => s.activeSection);
  const { templateHeader, ...sections } = template || {};

  return (
    <div className='flex flex-row py-2 space-x-2 overflow-x-auto'>
      {Object.keys(sections).map((sectionKey) => {
        return (
          <Button
            variant='ghost'
            onClick={() => setActiveSection(sectionKey)}
            key={sectionKey}
            className={`w-fit hover:bg-gray-200 active:bg-gray-300 transition-colors ${
              activeSection === sectionKey ? 'bg-gray-200 shadow' : ''
            }`}
          >
            <span className='capitalize w-max'>{lowerCase(sectionKey)}</span>
          </Button>
        );
      })}
    </div>
  );
}
