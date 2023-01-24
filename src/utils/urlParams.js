export function setSearchParam(param) {
  const searchParams = new URLSearchParams(param);
  return searchParams.toString();
}

export function getSearchParam(search) {
  const params = new URLSearchParams(search.slice(1));
  const output = groupParamsByKey(params)
  return output;
}

const groupParamsByKey = (params) => [...params.entries()].reduce((acc, tuple) => {
  const [key, val] = tuple;
  if (key === 'status') {
    if (val === '') {
      acc[key] = [];
    } else {
      acc[key] = val.includes(',') ? val.split(',') : [val];
    }
  } else {
    acc[key] = val;
  }
  return acc;
}, {});