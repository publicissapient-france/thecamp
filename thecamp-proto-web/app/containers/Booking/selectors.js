import { createSelector } from 'reselect';

/**
 * Direct selector to the booking state domain
 */
const selectBookingDomain = () => (state) => state.get('booking');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Booking
 */

const selectBooking = () => createSelector(
  selectBookingDomain(),
  (substate) => substate.toJS()
);

export default selectBooking;
export {
  selectBookingDomain,
};
