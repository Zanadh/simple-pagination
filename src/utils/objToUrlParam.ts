export const objToUrlParam = (objParam: Record<string, any>) => {
  const searchParam = new URLSearchParams('');
  for (const key in objParam) {
    searchParam.append(key, objParam[key]);
  }

  return searchParam;
};
