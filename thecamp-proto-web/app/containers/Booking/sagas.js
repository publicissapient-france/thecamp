import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { BOOK_EVENT_REQUEST } from './constants';
import request from '../../utils/request';
import { bookEventSuccess, bookEventError } from './actions';

const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

export function* bookEvent(action) {
  const { event } = action;
  const options = { method: 'POST', headers, body: JSON.stringify(event) };
  const response = yield call(request, '/api/booking', options);

  if (!response.error) {
    yield put(bookEventSuccess());
    yield put(push('/'));
  } else {
    yield put(bookEventError(response.err));
  }
}

export function* bookEventWatcher() {
  const watcher = yield fork(takeLatest, BOOK_EVENT_REQUEST, bookEvent);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  bookEventWatcher,
];
