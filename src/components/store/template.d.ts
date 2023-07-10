export interface ITemplate {
  templateHeader?: {
    id: number;
    applicationTemplateFormId: string;
    templateName: string;
  };

  [section: string]: ISection;
}

export interface ISection {
  sectionHeader?: {
    sectionId: number;
    sectionMnemonic: string;
    displayLabel: string;
    displaySubLabel: string;
    sectionIndex: number;
    visible: true;
  };

  [group: string]: IGroup;
}

export interface IGroup {
  groupHeader?: {
    groupId: number;
    groupMnemonic: string;
    displayLabel: string;
    displaySubLabel: string;
    groupIndex: number;
    visible: boolean;
  };

  // extra
  currency: string;
  amount: string;

  customFields?: {
    fields: IField[];
    customFields: string; // this show the type of custom field
  };

  [field: string]: IField;

  [group: string]: IGroup;
}

export interface IField {
  fieldHeader?: {
    fieldId: number;
    fieldMnemonic: string;
    displayLabel: string;
    displaySubLabel: string;
    fieldIndex: number;
    visible: boolean;
  };
  fieldValue: string | number;
  regexFormat?: string;
  format?: string;
  rendering?: string;
  addressType?: string;

  // Extra
  id?: number;
  fieldIndex?: number;
  fieldMnemonic?: string;
  displayName?: string;
  choiceFieldElementsString?: string;
}
