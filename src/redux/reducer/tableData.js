const initialState = {
  tableData: [],
  filteredTableData: [],
  filterParams: {
    serverName: '',
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TABLE_DATA':
      return {
        ...state,
        tableData: action.payload,
      };
    case 'SET_FILTER_QUERY':
      return {
        ...state,
        filterParams: {
          ...state.filterParams,
          ...action.payload,
        }
      };
    case 'SET_FILTERED_DATA':
      return {
        ...state,
        filteredTableData: action.payload,
      };
    default:
      return state;
  }
}