export const getUniqueId = (id: string, obj: object): string => {
  const name = id.split('-')[0];
  const num = parseInt(id.split('-')[1] || '0') + 1;
  const newId = `${name}-${num}`;

  if (Object.keys(obj).includes(newId)) {
    return getUniqueId(newId, obj);
  }

  return `${newId}`;
};
