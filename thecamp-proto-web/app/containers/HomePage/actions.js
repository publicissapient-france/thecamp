import { EVENT_BOOKINGS_REQUEST, EVENT_BOOKINGS_SUCCESS, EVENT_BOOKINGS_ERROR, BOOKINGS_RECEIVED } from './constants';

export function eventBookingsRequest() {
  return {
    type: EVENT_BOOKINGS_REQUEST,
  };
}

export function eventBookingsSuccess() {
  return {
    type: EVENT_BOOKINGS_SUCCESS,
  };
}

export function eventBookingsError(error) {
  return {
    type: EVENT_BOOKINGS_ERROR,
    error,
  };
}

export function bookingsReceived(bookings) {
  return {
    type: BOOKINGS_RECEIVED,
    bookings,
  };
}
