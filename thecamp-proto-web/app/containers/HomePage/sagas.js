import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { EVENT_BOOKINGS_REQUEST } from './constants';
import request from '../../utils/request';
import { eventBookingsSuccess, eventBookingsError } from './actions';

export function* bookingsRequest() {
  const response = yield call(request, '/api/booking');
  if (!response.error) {
    yield put(eventBookingsSuccess());
  } else {
    yield put(eventBookingsError(response.err));
  }
}

export function* eventBookingWatcher() {
  const watcher = yield fork(takeLatest, EVENT_BOOKINGS_REQUEST, bookingsRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  eventBookingWatcher,
];
