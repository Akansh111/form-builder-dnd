import type { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRouter } from 'next/router';
import { createContext, useMemo } from 'react';
import { ROUTES } from '../libs/routes';
interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

export const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export default function SortableItem({ id, type, children }: { id: string; type: string; children: React.ReactNode }) {
  const router = useRouter();
  const isPreview = router.pathname === ROUTES.PREVIEW;
  const { isDragging, listeners, setActivatorNodeRef, attributes, setNodeRef, transform, transition } = useSortable({
    id: id,
    data: {
      type: type,
    },
  });

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );

  const style = {
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Transform.toString(transform)?.replace(/scaleY\((.*?)\)/, 'scaleY(1)'),
    transition,
  };

  if (isPreview) return <div>{children}</div>;

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style} {...attributes}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}
