import { createSelector } from 'reselect';

/**
 * Direct selector to the booking state domain
 */
const selectHomepageDomain = () => state => state.get('homepage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Booking
 */

const selectHomepage = () => createSelector(
  selectHomepageDomain(),
  substate => substate.toJS()
);

const selectBookings = () => createSelector(
  selectHomepageDomain(),
  substate => substate.get('bookings')
);

export default selectHomepage;
export {
  selectHomepageDomain,
  selectBookings,
};
