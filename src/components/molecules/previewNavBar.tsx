import { memo, useMemo } from 'react';
import { downloadTemplate } from '../atoms/topbar';
import useTemplate from '../store/useTemplate';
import { Button } from '../ui/button';

function PreviewNavBar() {
  const activeSection = useTemplate((s) => s.activeSection);
  const setActiveSection = useTemplate((s) => s.setActiveSection);
  const template = useTemplate((s) => s.template);
  const { templateHeader, ...filteredTemplate } = template || {};
  const keys = Object.keys(filteredTemplate);
  const index = keys.indexOf(activeSection);

  const isPrevious = useMemo(() => {
    return index > 0;
  }, [index]);

  const isNext = useMemo(() => {
    return index < keys.length - 1;
  }, [index, keys]);

  const handlePrevious = () => {
    if (index > 0) {
      setActiveSection(keys[index - 1]);
    }
  };

  const handleNext = () => {
    if (index < keys.length - 1 && !isNext) {
      setActiveSection(keys[index + 1]);
      return;
    }

    downloadTemplate(template);
  };

  return (
    <div className='flex flex-row'>
      {isPrevious && (
        <Button variant='secondary' onClick={handlePrevious}>
          Previous
        </Button>
      )}

      <Button className='ml-auto' onClick={handleNext}>
        {isNext ? 'Next' : 'Download JSON'}
      </Button>
    </div>
  );
}

export default memo(PreviewNavBar);
