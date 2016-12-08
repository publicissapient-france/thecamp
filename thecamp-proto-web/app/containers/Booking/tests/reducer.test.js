import expect from 'expect';
import bookingReducer from '../reducer';
import { fromJS } from 'immutable';

describe('bookingReducer', () => {
  it('returns the initial state', () => {
    expect(bookingReducer(undefined, {})).toEqual(fromJS({}));
  });
});
