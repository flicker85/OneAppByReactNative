import { MAIN_LIST, ACTIVE_KEY } from './constants';

const initialState = {
  key: null,
  list: {}
};

function oneList(state = initialState, action) {
  switch (action.type) {
    case MAIN_LIST:
      return { ...state, key: action.key, list: { ...state.list, [action.key]: action.data } }
    case ACTIVE_KEY:
      return { ...state, key: action.key }
    default:
      return state;
  }
}

export default oneList;