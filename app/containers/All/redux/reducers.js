import { SAVE, APPEND_TOPICS } from './constants';

const initialState = {
  swiper: [],
  topics: [],
};

function all(state = initialState, { type, payload }) {
  switch (type) {
    case SAVE:
      return { ...state, ...payload }
    case APPEND_TOPICS:
      let topics = [ ...state.topics, ...payload.data];
      return { ...state, topics }
    default:
      return state;
  }
}

export default all;