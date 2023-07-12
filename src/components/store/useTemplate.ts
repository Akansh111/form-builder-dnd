import { get as _get, set as _set, camelCase, omit } from 'lodash-es';
import { create } from 'zustand';
import { DRAGGABLE_TYPE } from '../libs/constants';
import { getUniqueId, renameKeyInObject } from '../libs/utils';
import { ITemplate } from './template';
import * as template from './template.json';

interface IAddComponents {
  type: string;
  components: object;
}

interface IUseTemplate {
  template: ITemplate;
  setTemplate: (template: ITemplate) => void;

  removeEntity: (groupKey: string) => void;
  renameEntity: (newKey: string) => void;
  updateEntity: (path: string, value: any) => void;

  selectedEntity: string;
  setSelectedEntity: (entity: string) => void;

  addNewSection: () => void;

  activeSection: string;
  setActiveSection: (section: string) => void;

  addComponents: {
    [key: string]: IAddComponents;
  };

  activeSidebar: string;
  setActiveSidebar: (sidebar: string, openAnyway?: boolean) => void;
}

const groups = Object.keys(template).reduce((acc, key) => {
  if (['sectionHeader', 'templateHeader'].includes(key)) return acc;
  const { sectionHeader, ...rest } = template[key];
  return {
    ...acc,
    ...rest,
  };
}, {});

const useTemplate = create<IUseTemplate>((set, get) => ({
  template: { ...template },
  setTemplate: (template) => set({ template }),

  removeEntity: (path: string) =>
    set((s: IUseTemplate) => {
      const newTemplate = { ...s.template };
      const result = omit(newTemplate, [path]);

      return {
        template: result,
      };
    }),
  renameEntity: (_newKey: string) =>
    set((s: IUseTemplate) => {
      let path = s.selectedEntity.split('.');
      const oldKey = path.pop() || '';
      const newKey = camelCase(_newKey);

      if (oldKey === newKey) return {};

      path = path.join('.');
      const obj = _get({ ...s.template }, path);

      const result = renameKeyInObject(obj, oldKey, newKey);

      const newTemplate = { ...s.template };
      _set(newTemplate, path, result);

      const newPath = `${path}.${newKey}`;

      return {
        selectedEntity: newPath,
        template: newTemplate,
      };
    }),
  updateEntity: (path: string, value: any) =>
    set((s: IUseTemplate) => {
      const newTemplate = { ...s.template };
      _set(newTemplate, path, value);

      return {
        template: newTemplate,
      };
    }),

  selectedEntity: '',
  setSelectedEntity: (entity) => set({ selectedEntity: entity }),

  addNewSection: () =>
    set((s: IUseTemplate) => {
      const newSectionKey = getUniqueId('blankSection', s.template);

      const newTemplate = {
        ...s.template,
        [newSectionKey]: {
          sectionHeader: {
            title: newSectionKey,
            description: '',
          },
        },
      };

      return {
        template: newTemplate,
        activeSection: newSectionKey,
      };
    }),

  activeSection: '',
  setActiveSection: (section) => set({ activeSection: section }),

  addComponents: {
    // section: template,
    group: {
      type: DRAGGABLE_TYPE.ADD_GROUP,
      components: groups,
    },
    // field: {
    //   type: DRAGGABLE_TYPE.ADD_FIELD,
    //   components: template.applicantInformation.name,
    // },
  },

  activeSidebar: '',
  setActiveSidebar: (sidebar, openAnyway) => {
    if (get().activeSidebar !== sidebar && get().activeSidebar !== '') {
      set({ activeSidebar: '' });
      setTimeout(() => {
        set({ activeSidebar: sidebar });
      }, 500);
      return;
    }

    if (get().activeSidebar === sidebar && !openAnyway) {
      set({ activeSidebar: '' });
      return;
    }

    if (get().activeSidebar === '') {
      set({ activeSidebar: sidebar });
      return;
    }
  },
}));

export default useTemplate;
