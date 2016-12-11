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
import { createStructuredSelector } from 'reselect';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { eventBookingsRequest, bookingsReceived, cancelBooking } from './actions';
import { selectBookings } from './selectors';
import es from '../../sse';
import styles from './styles.pcss';
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

  cancelBooking = event => {
    logger.info('event:', event);
    const currentBookings = this.props.bookings;
    logger.info('currentBookings:', currentBookings);
    // const index = currentBookings.find(item => item.id === event.id);
    const index = currentBookings.indexOf(event);
    logger.info('index:', index);
    currentBookings.splice(index, 1);
    logger.info(currentBookings);
    this.props.cancelBooking(event.id, currentBookings);
  };

  render() {
    const { bookings } = this.props;
    const Bookings = bookings ? bookings.map((item, index) => {
      const { client, from, to, offer, rooms, keynote, workshop, simpleRoom, quantity, price } = item;
      const options = (
        <ul style={{ paddingLeft: 0 }}>
          {keynote && <li>Keynote</li>}
          {workshop && <li>Workshop</li>}
          {!simpleRoom && <li>Premium Room</li>}
        </ul>
      );
      return (
        <div key={index} className="col-xs-12 col-sm-6 col-md-4" style={{ marginBottom: '2em' }}>
          <Card>
            <CardHeader title={client} subtitle={offer} />
            <CardText>
              <div style={{ style: 'inline-flex' }} className="row">
                <span className="col-xs-3">From:</span>
                <span className="col-xs-9">{new Date(from).toLocaleDateString()}</span>
              </div>
              <div style={{ style: 'inline-flex' }} className="row">
                <span className="col-xs-3">To:</span>
                <span className="col-xs-9">{new Date(to).toLocaleDateString()}</span>
              </div>
              <div style={{ style: 'inline-flex' }} className="row">
                <span className="col-xs-3">Rooms:</span>
                <span className="col-xs-9">{rooms}</span>
              </div>
              <div style={{ style: 'inline-flex' }} className="row">
                <span className="col-xs-3">Options:</span>
                <span className="col-xs-9">{options}</span>
              </div>
              <div style={{ style: 'inline-flex' }} className="row">
                <span className="col-xs-3">Participants:</span>
                <span className="col-xs-9">{quantity}</span>
              </div>
              <div style={{ style: 'inline-flex' }} className="row">
                <span className="col-xs-3">Price:</span>
                <span className="col-xs-9">{price} €</span>
              </div>
            </CardText>
            <CardActions>
              <FlatButton label="Cancel" secondary onClick={() => this.cancelBooking(item)} />
              <FlatButton label="Update" primary onClick={this.props.eventBookingsRequest} />
            </CardActions>
          </Card>
        </div>
      );
    }) : <div>No event booked yet.</div>;
    return (
      <div className={styles.homepage}>
        <h1>
          Welcome to TheCamp Booking
        </h1>
        <div className="row">
          {Bookings}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  bookings: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array]),
  eventBookingsRequest: React.PropTypes.func,
  bookingsReceived: React.PropTypes.func,
  cancelBooking: React.PropTypes.func,
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
    cancelBooking(id, nextBookings) {
      dispatch(cancelBooking(id, nextBookings));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
