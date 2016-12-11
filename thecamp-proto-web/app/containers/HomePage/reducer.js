/*
 *
 * Homepage reducer
 *
 */

import { fromJS } from 'immutable';
import { EVENT_BOOKINGS_REQUEST, BOOKINGS_RECEIVED, EVENT_BOOKINGS_ERROR, CANCEL_BOOKING_SUCCESS } from './constants';

const initialState = fromJS({
  bookings: false,
});

function homepageReducer(state = initialState, action) {
  switch (action.type) {
    case EVENT_BOOKINGS_REQUEST:
      return state.set('error', false);
    case EVENT_BOOKINGS_ERROR:
      return state.set('error', action.error);
    case BOOKINGS_RECEIVED:
      return state.set('bookings', action.bookings);
    case CANCEL_BOOKING_SUCCESS:
      return state.set('bookings', action.bookings);
    default:
      return state;
  }
}

export default homepageReducer;
