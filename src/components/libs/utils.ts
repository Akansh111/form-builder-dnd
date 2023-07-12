import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInputType(type: string) {
  type = type?.toLowerCase();

  switch (type) {
    case 'string':
      return 'text';
    case 'datetime':
      return 'datetime-local';
    default:
      return type;
  }
}

export function getValue(value: string) {
  value = value?.toLowerCase();

  if (value === 'string') return null;

  return value;
}

export function getString(value: string | number) {
  value = `${value}`?.toLowerCase();

  if (['string', 'undefined'].includes(value)) return '';

  return value;
}

export const getUniqueId = (id: string, obj: object): string => {
  const name = id.split('-')[0];
  const num = parseInt(id.split('-')[1] || '0') + 1;
  const newId = `${name}-${num}`;

  if (Object.keys(obj).includes(newId)) {
    return getUniqueId(newId, obj);
  }

  if (num === 0) return `${name}`;

  return `${newId}`;
};

export function renameKeyInObject(obj: object, oldKey: string, newKey: string): object {
  return Object.keys(obj).reduce((acc, key) => {
    if (key === oldKey) {
      return {
        ...acc,
        [newKey]: obj[key],
      };
    }

    return {
      ...acc,
      [key]: obj[key],
    };
  }, {});
}