import { set as _set, get, omit } from 'lodash-es';
import { create } from 'zustand';
import { DRAGGABLE_TYPE } from '../constants/dnd';
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

  selectedEntity: string;
  setSelectedEntity: (entity: string) => void;

  activeSection: string;
  setActiveSection: (section: string) => void;

  addComponents: {
    [key: string]: IAddComponents;
  };
}

const useTemplate = create<IUseTemplate>((set) => ({
  template: { ...template },
  setTemplate: (template) => set({ template }),

  removeEntity: (path: string) =>
    set((s: IUseTemplate) => {
      const newTemplate = { ...s.template };
      const result = omit(newTemplate, [path]);
      console.log(path, newTemplate, result);

      return {
        template: result,
      };
    }),
  renameEntity: (newKey: string) =>
    set((s: IUseTemplate) => {
      const newTemplate = { ...s.template };
      const oldEntity = get(newTemplate, s.selectedEntity);
      const result = omit(newTemplate, [s.selectedEntity]);
      let oldPath = s.selectedEntity.split('.');
      oldPath.pop();
      oldPath = [...oldPath, newKey];
      const newPath = oldPath.join('.');
      _set(result, newPath, oldEntity);

      console.log(s.selectedEntity, newPath, oldPath, oldEntity, result);

      return {
        selectedEntity: newPath,
        template: result,
      };
    }),

  selectedEntity: '',
  setSelectedEntity: (entity) => set({ selectedEntity: entity }),

  activeSection: '',
  setActiveSection: (section) => set({ activeSection: section }),

  addComponents: {
    // section: template,
    group: {
      type: DRAGGABLE_TYPE.ADD_GROUP,
      components: template.applicantInformation,
    },
    // field: {
    //   type: DRAGGABLE_TYPE.ADD_FIELD,
    //   components: template.applicantInformation.name,
    // },
  },
}));

export default useTemplate;
