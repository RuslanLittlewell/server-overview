import ajaxCall from '@utils/fetch';

export default function resetState() {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_STATE'
    });
  };
};

export function fetchTableData(params) {
  return dispatch => ajaxCall.get('.netlify/functions/servers')
    .then(response => {
      if (response.message) {
        dispatch({
          type: 'FETCH_TABLE_DATA',
          payload: []
        });
        return Promise.reject({
          error: response.message
        });
      } else {
        dispatch({
          type: 'FETCH_TABLE_DATA',
          payload: response.data
        });
        dispatch({
          type: 'SET_FILTERED_DATA',
          payload: response.data
        });
        setFilterParams(params);
        return Promise.resolve(response.data)
      }
    })
    .catch((error) => {
      dispatch({
        type: 'FETCH_TABLE_DATA',
        payload: []
      });
      return Promise.reject(error);
    })
};

export function setFilteredTableData(data) {
  return dispatch => {
    dispatch({
      type: 'SET_FILTERED_DATA',
      payload: data
    });
  } 
};


export function setFilterParams(data) {
  return dispatch => {
    dispatch({
      type: 'SET_FILTER_QUERY',
      payload: data
    })
    return data;
  };
};


