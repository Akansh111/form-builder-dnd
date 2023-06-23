import capitalize from 'lodash-es/capitalize';
import lowerCase from 'lodash-es/lowerCase';
import { create } from 'zustand';
import { getUniqueId } from '../utils/objectFunc';

export interface IElement {
  tagName: string;
  tagType?: 'closed' | 'open';
  attributes?: {
    [key: string]: string | number | object;
  };
  innerHTML?: string;
  children?: IElement[];
}
export interface IElementParent {
  id: string;
  content: string;
  element: IElement;
}

export interface ISection {
  id: string;
  title: string;
  taskIds: string[];
}

export interface INewSection extends ISection {
  elements: {
    [key: string]: IElementParent;
  };
}
interface IUseList {
  isPreviewMode: boolean;
  elements: {
    [key: string]: IElementParent;
  };
  sections: {
    [key: string]: ISection;
  };
  sectionOrder: string[];
  activeSection: string;

  setPreviewMode: (isPreviewMode: boolean) => void;
  add: (Element: IElementParent) => void;
  addSection: (newSection: INewSection) => void;
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
  addNewSection: () => void;
  removeSection: (sectionId: string) => void;
  setActiveSection: (sectionId: string) => void;
}

export const useList = create<IUseList>((set) => ({
  isPreviewMode: false,
  elements: {
    AddressDetails: {
      id: 'AddressDetails',
      content: 'Enter Your Address Details',
      element: {
        tagName: 'div',
        attributes: {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        children: [
          {
            tagName: 'div',
            innerHTML: 'Address',
          },
          {
            tagName: 'div',
            attributes: {
              style: {
                display: 'flex',
                flexDirection: 'row',
              },
            },
            children: [
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'text',
                  placeholder: 'Street Address',
                },
              },
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'text',
                  placeholder: 'City',
                },
              },
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'text',
                  placeholder: 'State',
                },
              },
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'text',
                  placeholder: 'Zip Code',
                },
              },
            ],
          },
        ],
      },
    },
    ContactInformation: {
      id: 'ContactInformation',
      content: 'Enter Your Contact Information',
      element: {
        tagName: 'div',
        attributes: {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        children: [
          {
            tagName: 'div',
            innerHTML: 'Contact Information',
          },
          {
            tagName: 'div',
            attributes: {
              style: {
                display: 'flex',
                flexDirection: 'row',
              },
            },
            children: [
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'text',
                  placeholder: 'Email',
                },
              },
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'number',
                  placeholder: 'Phone Number',
                  minLength: 10,
                  maxLength: 10,
                },
              },
            ],
          },
        ],
      },
    },
    EducationDetails: {
      id: 'EducationDetails',
      content: 'Enter Your Education Details',
      element: {
        tagName: 'div',
        attributes: {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        children: [
          {
            tagName: 'div',
            innerHTML: 'Education Details',
          },
          {
            tagName: 'div',
            attributes: {
              style: {
                display: 'grid',
                gridTemplateColumns: '2fr 2fr',
              },
            },
            children: [
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'text',
                  placeholder: 'Degree',
                },
              },
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'text',
                  placeholder: 'Major',
                },
              },
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'text',
                  placeholder: 'University',
                },
              },
              {
                tagName: 'input',
                tagType: 'closed',
                attributes: {
                  type: 'number',
                  placeholder: 'Year of Graduation',
                },
              },
            ],
          },
        ],
      },
    },
    Password: {
      id: 'Password',
      content: 'Enter Your Password',
      element: {
        tagName: 'input',
        tagType: 'closed',
        attributes: {
          type: 'password',
          placeholder: 'Enter your password',
          label: 'Password',
        },
      },
    },
    CheckboxGroup: {
      id: 'CheckboxGroup',
      content: 'Select Your Interests',
      element: {
        tagName: 'div',
        attributes: {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        children: [
          {
            tagName: 'div',
            innerHTML: 'Interests',
          },
          {
            tagName: 'div',
            attributes: {
              style: {
                display: 'flex',
                flexDirection: 'column',
              },
            },
            children: [
              {
                tagName: 'label',
                innerHTML: 'Sports',
                attributes: {
                  style: {
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    'margin-right': 'auto',
                  },
                },
                children: [
                  {
                    tagName: 'input',
                    tagType: 'closed',
                    attributes: {
                      type: 'checkbox',
                      value: 'sports',
                    },
                  },
                ],
              },
              {
                tagName: 'label',
                innerHTML: 'Reading',
                attributes: {
                  style: {
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    'margin-right': 'auto',
                  },
                },
                children: [
                  {
                    tagName: 'input',
                    tagType: 'closed',
                    attributes: {
                      type: 'checkbox',
                      value: 'reading',
                    },
                  },
                ],
              },
              {
                tagName: 'label',
                innerHTML: 'Travel',
                attributes: {
                  style: {
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    'margin-right': 'auto',
                  },
                },
                children: [
                  {
                    tagName: 'input',
                    tagType: 'closed',
                    attributes: {
                      type: 'checkbox',
                      value: 'travel',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    TextArea: {
      id: 'Message',
      content: 'Enter Your Message',
      element: {
        tagName: 'div',
        attributes: {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        children: [
          {
            tagName: 'div',
            innerHTML: 'Message',
          },
          {
            tagName: 'textarea',
            tagType: 'closed',
            attributes: {
              placeholder: 'Type your message here',
            },
          },
        ],
      },
    },
    FileUpload: {
      id: 'ProfilePicture',
      content: 'Upload Your Profile Picture',
      element: {
        tagName: 'div',
        attributes: {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        children: [
          {
            tagName: 'div',
            innerHTML: 'Profile Picture',
          },
          {
            tagName: 'input',
            tagType: 'closed',
            attributes: {
              type: 'file',
            },
          },
        ],
      },
    },
  },
  sections: {
    toolbox: {
      id: 'toolbox',
      title: 'Toolbox',
      taskIds: [
        'AddressDetails',
        'ContactInformation',
        'EducationDetails',
        'Password',
        'CheckboxGroup',
        'TextArea',
        'FileUpload',
      ],
    },
    'section-1': {
      id: 'section-1',
      title: 'Section 1',
      taskIds: [],
    },
  },
  sectionOrder: ['section-1'],
  activeSection: 'section-1',

  setPreviewMode: (isPreviewMode) => set({ isPreviewMode }),
  add: (Element) =>
    set((state) => ({
      elements: {
        ...state.elements,
        [Element.id]: Element,
      },
    })),
  addSection: (_newSection) =>
    set((state) => {
      const newSection = { ..._newSection };
      const newSections = { ...state.sections };
      const newElements = { ...state.elements };

      if (Object.keys(newSections).includes(newSection.id)) {
        newSection['id'] = getUniqueId(newSection.id, newSections);
      }

      newSections[newSection.id] = {
        id: newSection.id,
        title: newSection.title,
        taskIds: [],
      };

      Object.keys(newSection.elements).forEach((key) => {
        const element = newSection.elements[key];
        if (Object.keys(newElements).includes(key)) {
          element['id'] = getUniqueId(key, newElements);
        }
        newSections[newSection.id].taskIds.push(element.id);
        newElements[element.id] = { ...element };
      });

      return {
        activeSection: `${newSection.id}`,
        sections: { ...newSections },
        sectionOrder: [...state.sectionOrder, newSection.id],
        elements: { ...newElements },
      };
    }),

  removeElement: (sectionId, elementId) =>
    set((state) => {
      // removing element from column
      const newSections = { ...state.sections };
      const fromTaskIds = newSections[sectionId].taskIds;
      const index = fromTaskIds.findIndex((id) => id === elementId);
      fromTaskIds.splice(index, 1);

      // removing element from elements
      const newElements = { ...state.elements };
      delete newElements[elementId];

      return {
        sections: newSections,
        elements: newElements,
      };
    }),
  clear: () => set({ elements: {} }),
  move: (fromCol, toCol) =>
    set((state) => {
      if (fromCol.droppableId === 'toolbox' && fromCol.droppableId !== toCol.droppableId) {
        // adding duplicate in elements
        const newElements = { ...state.elements };
        const fromTaskIds = state.sections[fromCol.droppableId].taskIds;
        const newElement = { ...state.elements[fromTaskIds[fromCol.index]] };
        // newElement.id = `${newElement.id}-${Date.now()}`;
        newElement.id = getUniqueId(newElement.id, newElements);
        newElements[newElement.id] = newElement;

        // adding duplicate in column
        const newSections = { ...state.sections };
        const toTaskIds = newSections[toCol.droppableId].taskIds;
        toTaskIds.splice(toCol.index, 0, newElement.id);

        return {
          elements: newElements,
          sections: newSections,
        };
      }

      const newSections = { ...state.sections };
      const fromTaskIds = newSections[fromCol.droppableId].taskIds;
      const toTaskIds = newSections[toCol.droppableId].taskIds;
      const [removed] = fromTaskIds.splice(fromCol.index, 1);
      toTaskIds.splice(toCol.index, 0, removed);

      return {
        sections: newSections,
      };
    }),
  addNewSection: () =>
    set((state) => {
      const newSectionId = getUniqueId('section', state.sections);
      const newSection = {
        id: `${newSectionId}`,
        title: `${capitalize(lowerCase(newSectionId))}`,
        taskIds: [],
      };

      return {
        sections: {
          ...state.sections,
          [newSection.id]: newSection,
        },
        sectionOrder: [...state.sectionOrder, newSection.id],
        activeSection: newSection.id,
      };
    }),

  removeSection: (sectionId) =>
    set((state) => {
      const newSections = { ...state.sections };
      const newElements = { ...state.elements };
      const newSectionOrder = [...state.sectionOrder];

      // removing section from sectionOrder
      const index = newSectionOrder.findIndex((id) => id === sectionId);
      newSectionOrder.splice(index, 1);

      // removing elements from elements
      const section = newSections[sectionId];
      section.taskIds.forEach((id) => {
        delete newElements[id];
      });

      // removing section from sections
      delete newSections[sectionId];

      state.setActiveSection(newSectionOrder[newSectionOrder.length - 1] || '');

      return {
        sections: newSections,
        elements: newElements,
        sectionOrder: newSectionOrder,
      };
    }),
  setActiveSection: (sectionId) => set({ activeSection: sectionId }),
}));
