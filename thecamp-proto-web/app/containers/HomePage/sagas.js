import { takeLatest } from 'redux-saga';
import { take, call, put, cancel, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { EVENT_BOOKINGS_REQUEST, CANCEL_BOOKING_REQUEST } from './constants';
import request from '../../utils/request';
import { eventBookingsSuccess, eventBookingsError, cancelBookingSuccess, cancelBookingError } from './actions';

const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

export function* bookingsRequest() {
  const response = yield call(request, '/api/booking');
  if (!response.error) {
    yield put(eventBookingsSuccess());
  } else {
    yield put(eventBookingsError(response.err));
  }
}

export function* cancelBooking(action) {
  const { id, nextBookings } = action;
  console.log('nextBookings:', nextBookings);
  const opt = { method: 'DELETE', headers };
  const response = yield call(request, `/api/booking/${id}`, opt);
  if (!response.error) {
    yield put(cancelBookingSuccess(nextBookings));
  } else {
    yield put(cancelBookingError(response.err));
  }
}

export function* eventBookingWatcher() {
  const watcher = yield fork(takeLatest, EVENT_BOOKINGS_REQUEST, bookingsRequest);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* eventCancelBookingWatcher() {
  const watcher = yield fork(takeLatest, CANCEL_BOOKING_REQUEST, cancelBooking);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  eventBookingWatcher,
  eventCancelBookingWatcher,
];
