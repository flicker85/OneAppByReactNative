import { fork, takeEvery, call, put } from 'redux-saga/effects';
import * as services from './services';
import { MAIN_LIST, FETCH_MAIN_LIST, ACTIVE_KEY, CHANGE_KEY } from './constants';
import formatDate from '../../../utils/formatDate';

function *init() {
  yield takeEvery(FETCH_MAIN_LIST, function *({ date, callback }) {
    const data = yield call(services.fetchListByDay, date);
    const key = date ? date : formatDate(data.date);
    yield put({ type: MAIN_LIST, key, data });
    if(callback) callback(key);
  });
  yield takeEvery(CHANGE_KEY, function *({ date, callback }) {
    yield put({ type: ACTIVE_KEY, key: date });
    if(callback) callback();
  });
}

function *sagas() {
  const task = yield fork(init);
}

export default sagas;
