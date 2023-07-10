import type { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createContext, useMemo } from 'react';
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

  return (
    <SortableItemContext.Provider value={context}>
      <div ref={setNodeRef} style={style} {...attributes}>
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}
