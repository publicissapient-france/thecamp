import {
  EVENT_BOOKINGS_REQUEST, EVENT_BOOKINGS_SUCCESS, EVENT_BOOKINGS_ERROR, BOOKINGS_RECEIVED, CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS, CANCEL_BOOKING_ERROR,
} from './constants';

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

export function cancelBooking(id, nextBookings) {
  return {
    type: CANCEL_BOOKING_REQUEST,
    id,
    nextBookings,
  };
}

export function cancelBookingSuccess(bookings) {
  return {
    type: CANCEL_BOOKING_SUCCESS,
    bookings,
  };
}

export function cancelBookingError(error) {
  return {
    type: CANCEL_BOOKING_ERROR,
    error,
  };
}
