/*
 *
 * Booking reducer
 *
 */

import { fromJS } from 'immutable';
import { BOOK_EVENT_REQUEST, BOOK_EVENT_SUCCESS, BOOK_EVENT_ERROR } from './constants';

const initialState = fromJS({});

function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case BOOK_EVENT_REQUEST:
      return state
        .set('error', false)
        .set('loading', true);
    case BOOK_EVENT_SUCCESS:
      return state
        .set('loading', false);
    case BOOK_EVENT_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default bookingReducer;
