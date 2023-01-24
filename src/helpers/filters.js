export const filterByCPU = (array, value) => 
  !value 
  ? array 
  : array.filter((i) => i.stats.cpu >= value);

export const filterByStatus = (array, value) => {
  if (!value) {
    return array;
  } else {
    const setValues = new Set(value);
    return setValues.size ? array.filter((item) => setValues?.has(item.status)) : array;
  }
}

export const filterByName = (array, value) => 
  !value 
  ? array
  : array.filter((item) => item.serverName
    .toLowerCase()
    .includes(value.toLowerCase()));