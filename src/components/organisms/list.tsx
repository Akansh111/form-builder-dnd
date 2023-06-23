import { useCallback } from 'react';
import Section from '../molecules/section';
import SectionBar from '../molecules/sectionBar';
import SectionNavBar from '../molecules/sectionNavBar';
import { useList } from '../store/useList';

export default function List({ isPreviewMode }: { isPreviewMode?: boolean }) {
  const sections = useList((state) => state.sections);
  const activeSection = useList((state) => state.activeSection);

  const MainContent = useCallback(
    () => <Section key={activeSection} section={sections[activeSection]} isPreviewMode={isPreviewMode} />,
    [activeSection, sections, isPreviewMode],
  );

  return (
    <>
      {!isPreviewMode && <SectionBar />}

      <MainContent />

      {isPreviewMode && <SectionNavBar />}
    </>
  );
}
