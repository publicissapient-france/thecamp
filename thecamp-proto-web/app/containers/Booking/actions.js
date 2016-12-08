/*
 *
 * Booking actions
 *
 */

import { DEFAULT_ACTION, BOOK_EVENT_REQUEST, BOOK_EVENT_SUCCESS, BOOK_EVENT_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function bookEvent(event) {
  return {
    type: BOOK_EVENT_REQUEST,
    event,
  };
}

export function bookEventSuccess() {
  return {
    type: BOOK_EVENT_SUCCESS,
  };
}

export function bookEventError(error) {
  return {
    type: BOOK_EVENT_ERROR,
    error,
  };
}
