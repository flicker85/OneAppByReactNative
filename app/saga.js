import { fork, all } from 'redux-saga/effects';
import mainSagas from './containers/Main/redux/sagas';
import allSagas from './containers/All/redux/sagas';

export default function *rootSaga() {
  yield all([fork(mainSagas), fork(allSagas)]);
}