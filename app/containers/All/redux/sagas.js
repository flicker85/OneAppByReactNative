import { fork, takeEvery, call, put, all } from 'redux-saga/effects';
import * as services from './services';
import { INIT, SAVE, FETCH_TOPICS, APPEND_TOPICS } from './constants';

function *init() {
  yield takeEvery(INIT, function *({ callback }) {
    const [swiper, topics] = yield all([
      call(services.fetchSwiper),
      call(services.fetchTopics),
    ]);
    yield put({ type: SAVE, payload: { swiper, topics } });
    callback && callback();
  });

  yield takeEvery(FETCH_TOPICS, function *({ id }) {
    const data = yield call(services.fetchTopics, id);
    if(data.length > 0) {
      yield put({ type: APPEND_TOPICS, payload: { data } });
    }
  });
}

function *sagas() {
  const task = yield fork(init);
}

export default sagas;
