import { create } from 'zustand';

export interface IElement {
  tagName: string;
  tagType?: 'closed' | 'open';
  attributes: {
    [key: string]: string | object;
  };
  innerHTML?: string;
  children?: IElement[];
}
export interface ITask {
  id: string;
  content: string;
  element: IElement;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

interface IUseList {
  isPreviewMode: boolean;
  tasks: {
    [key: string]: ITask;
  };
  columns: {
    [key: string]: IColumn;
  };
  columnOrder: string[];
  activeSection: string;

  setPreviewMode: (isPreviewMode: boolean) => void;
  add: (Element: ITask) => void;
  removeElement: (sectionId: string, elementId: string) => void;
  clear: () => void;
  move: (
    fromCol: {
      droppableId: string;
      index: number;
    },
    toCol: {
      droppableId: string;
      index: number;
    },
  ) => void;
  addNewColumn: () => void;
  setActiveSection: (sectionId: string) => void;
}

export const useList = create<IUseList>((set) => ({
  isPreviewMode: false,
  tasks: {
    'Element-0': {
      id: 'Element-0',
      content: 'Element 0',
      element: {
        tagName: 'input',
        tagType: 'closed',
        attributes: {
          type: 'text',
          style: {
            border: '1px solid black',
            width: '100%',
            padding: '5px',
          },
          placeholder: 'Enter your name',
        },
      },
    },
    'Element-1': {
      id: 'Element-1',
      content: 'Element 1',
      element: {
        tagName: 'div',
        attributes: {
          style: {
            backgroundColor: 'red',
            width: '100%',
            height: '100px',
            color: 'white',
            fontWeight: 'bold',
          },
        },
        innerHTML: 'Background color red and height 100px and width 100% and color white and bold',
      },
    },
    'Element-2': {
      id: 'Element-2',
      content: 'Element 2',
      element: {
        tagName: 'a',
        attributes: {
          href: 'https://www.google.com',
          target: '_blank',
          style: {
            color: 'blue',
            textDecoration: 'underline',
          },
        },
        innerHTML: 'google',
      },
    },
    'Element-3': {
      id: 'Element-3',
      content: 'Element 3',
      element: {
        tagName: 'div',
        attributes: {},
        innerHTML: 'test2',
      },
    },
    'Element-4': {
      id: 'Element-4',
      content: 'Element 4',
      element: {
        tagName: 'div',
        attributes: {},
        innerHTML: 'test',
      },
    },
    'Element-5': {
      id: 'Element-5',
      content: 'Element 5',
      element: {
        tagName: 'textarea',
        tagType: 'closed',
        attributes: {
          placeholder: 'Enter a long message',
        },
      },
    },
  },
  columns: {
    'section-1': {
      id: 'section-1',
      title: 'Section 1',
      taskIds: ['Element-0', 'Element-1', 'Element-2', 'Element-3'],
    },
    'section-2': {
      id: 'section-2',
      title: 'Section 2',
      taskIds: ['Element-4', 'Element-5'],
    },
  },
  columnOrder: ['section-1', 'section-2'],
  activeSection: 'section-1',

  setPreviewMode: (isPreviewMode) => set({ isPreviewMode }),
  add: (Element) =>
    set((state) => ({
      tasks: {
        ...state.tasks,
        [Element.id]: Element,
      },
    })),
  removeElement: (sectionId, elementId) =>
    set((state) => {
      // removing element from column
      const newColumns = { ...state.columns };
      const fromTaskIds = newColumns[sectionId].taskIds;
      const index = fromTaskIds.findIndex((id) => id === elementId);
      fromTaskIds.splice(index, 1);

      // removing element from tasks
      const newTasks = { ...state.tasks };
      delete newTasks[elementId];

      return {
        columns: newColumns,
        tasks: newTasks,
      };
    }),
  clear: () => set({ tasks: {} }),
  move: (fromCol, toCol) =>
    set((state) => {
      const newColumns = { ...state.columns };
      const fromTaskIds = newColumns[fromCol.droppableId].taskIds;
      const toTaskIds = newColumns[toCol.droppableId].taskIds;

      const [removed] = fromTaskIds.splice(fromCol.index, 1);
      toTaskIds.splice(toCol.index, 0, removed);

      return {
        columns: newColumns,
      };
    }),
  addNewColumn: () =>
    set((state) => {
      const newColumn = {
        id: `${Date.now()}`,
        title: `Section ${Date.now()}`,
        taskIds: [],
      };

      return {
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
        columnOrder: [...state.columnOrder, newColumn.id],
        activeSection: newColumn.id,
      };
    }),
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
}));
