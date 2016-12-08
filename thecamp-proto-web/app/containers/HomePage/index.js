/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { eventBookingsRequest, bookingsReceived } from './actions';
import { selectBookings } from './selectors';
import { createStructuredSelector } from 'reselect';
import es from '../../sse';
const logger = console;

class HomePage extends React.PureComponent {

  componentWillMount() {
    es.addEventListener('bookings', event => {
      try {
        const bookings = JSON.parse(event.data);
        this.props.bookingsReceived(bookings);
      } catch (err) {
        logger.error(err);
      }
    });
  }

  componentDidMount() {
    this.props.eventBookingsRequest();
  }

  render() {
    const { bookings } = this.props;
    return (
      <div>
        <h1>
          Welcome to TheCamp
        </h1>
        <div>
          {bookings && bookings.map((item, index) => (
            <div key={index}>
              <h3>{item.offer}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  bookings: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array]),
  eventBookingsRequest: React.PropTypes.func,
  bookingsReceived: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  bookings: selectBookings(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    eventBookingsRequest() {
      return dispatch(eventBookingsRequest());
    },
    bookingsReceived(bookings) {
      dispatch(bookingsReceived(bookings));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
