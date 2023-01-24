import reducers from '.';

export function rootReducer(state, action) {
  if (action.type === 'CLEAR_STATE') {
    state = undefined; // eslint-disable-line no-param-reassign
  }
  return reducers(state, action);
}

export default rootReducer;
