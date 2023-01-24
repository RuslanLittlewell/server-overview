import {
  store
} from '../store';
import {
  filterByName,
  filterByStatus,
  filterByCPU
} from '@helpers/filters'

export const sortTable = () => {
  const { table } = store.getState();
  const fieldValue = table.filterParams?.sort?.split(',');
  const field = fieldValue?.[0];
  const value = fieldValue?.[1];
  const copyTableData = table.filteredTableData.concat();
  const sortedTableData = copyTableData.sort((a, b) => {
    if (field === "uptime" || field === "created") {
      if (value === "ASC") {
        return a[field] > b[field] ? 1 : -1;
      }
      if (value === "DESC") {
        return b[field] > a[field] ? 1 : -1;
      }
    }
    if (field === "status") {
      a = a[field] || "";
      b = b[field] || "";
      if (value === "ASC") {
        return b.localeCompare(a);
      }
      if (value === "DESC") {
        return a.localeCompare(b);
        /* For move nullabe to end */
        // return ((b[field] > a[field]) || (!b[field])) ? -1 : 1;
      }
    }
    return dispatch => dispatch({
      type: 'SET_FILTERED_DATA',
      payload: table.filteredTableData
    });
  });
  return dispatch => dispatch({ type: 'SET_FILTERED_DATA', payload: sortedTableData });
};

export const filterTable = () => {
  const { table } = store.getState();
  const { filterParams } = table;
  const copyTableData = table.tableData.concat();

  const completedFiltres = filterByCPU(
    filterByStatus(
      filterByName(
        copyTableData,
        filterParams.serverName),
      filterParams.status),
    filterParams.cpu);

  return dispatch => dispatch({ type: 'SET_FILTERED_DATA', payload: completedFiltres });

};