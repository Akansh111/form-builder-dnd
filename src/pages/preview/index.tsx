import PreviewNavBar from '@/components/molecules/previewNavBar';
import { Section } from '@/components/molecules/section';
import useTemplate from '@/components/store/useTemplate';
import { useEffect } from 'react';

function Preview() {
  const template = useTemplate((s) => s.template);
  const setActiveSection = useTemplate((s) => s.setActiveSection);

  const { templateHeader, ...filteredTemplate } = template || {};

  useEffect(() => {
    setActiveSection(Object.keys(filteredTemplate)[0]);
  }, []);

  return (
    <div className='max-w-2xl m-2 mx-auto '>
      <Section />

      <PreviewNavBar />
    </div>
  );
}

export default Preview;
