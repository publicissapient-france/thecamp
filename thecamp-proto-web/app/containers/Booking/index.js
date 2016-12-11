/*
 *
 * Booking
 *
 */

import React from 'react';
import { connect } from 'react-redux';
// import { Field, reduxForm, propTypes } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import selectBooking from './selectors';
import { bookEvent } from './actions';
import messages from './messages';
import PageTitle from '../../components/PageTitle';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import styles from './styles.pcss';

export class Booking extends React.Component {

  static propTypes = {
    bookEvent: React.PropTypes.func,
  };

  componentWillMount() {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    this.state = {
      client: '',
      offer: 'TJ1',
      from: new Date(),
      to: nextWeek,
      keynote: true,
      workshop: true,
      simpleRoom: true,
      quantity: 1,
      price: 0,
    };
  }

  componentDidMount() {
    this.getPrice();
  }

  getPrice = () => {
    let price = 0;
    const { offer, from, to, keynote, workshop, simpleRoom, quantity } = this.state;
    const days = Math.floor((to - from) / (1000 * 60 * 60 * 24));
    if (offer) {
      price += offer === 'TJ1' ? 1000 : 1500;
    }
    if (days) {
      price += days * 500;
    }
    if (keynote) {
      price += 100;
    }
    if (workshop) {
      price += 500;
    }
    if (!simpleRoom) {
      price += 150;
    }
    if (!quantity) {
      price = 0;
    }
    price += price * quantity;
    this.setState({ price });
  };

  bookEvent = () => {
    this.props.bookEvent(this.state);
  };

  handleSelectChange = (event, index, value) => {
    this.setState({ offer: value }, () => this.getPrice());
  };

  handleChangeFromDate = (event, date) => {
    this.setState({ from: date }, () => this.getPrice());
  };

  handleChangeToDate = (event, date) => {
    this.setState({ to: date }, () => this.getPrice());
  };

  handleToggle = (event, toggled) => {
    this.setState({ [event.target.name]: toggled }, () => this.getPrice());
  };

  handleSlider = (event, value) => {
    this.setState({ quantity: value }, () => this.getPrice());
  };

  handleNameChange = event => {
    this.setState({ client: event.target.value });
  };

  render() {
    const toggleStyles = {
      toggle: {
        marginBottom: '1em',
        maxWidth: '16em',
      },
    };

    const btnStyle = { float: 'right', margin: '2em 0' };

    return (
      <div className={styles.booking}>
        <div className="row">
          <div className="col-xs-12">
            <PageTitle title={<FormattedMessage {...messages.header} />} />
            <p>
              You can book an event from here.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={this.bookEvent}>
              <div className="row">
                <div className="col-xs-12">
                  <TextField
                    id="client"
                    floatingLabelText="Customer Name"
                    value={this.state.client}
                    onChange={this.handleNameChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <SelectField floatingLabelText="Offer" value={this.state.offer} onChange={this.handleSelectChange}>
                    <MenuItem value={'TJ1'} primaryText="TJ1" />
                    <MenuItem value={'TJ2'} primaryText="TJ2" />
                  </SelectField>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <DatePicker
                    onChange={this.handleChangeFromDate}
                    floatingLabelText="From"
                    defaultDate={this.state.from}
                    autoOk
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <DatePicker
                    onChange={this.handleChangeToDate}
                    floatingLabelText="To"
                    defaultDate={this.state.to}
                    autoOk
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <div className={styles.group}>
                    <Toggle
                      label="Keynote"
                      name="keynote"
                      toggled={this.state.keynote}
                      style={toggleStyles.toggle}
                      onToggle={this.handleToggle}
                    />
                    <Toggle
                      label="Workshop"
                      name="workshop"
                      toggled={this.state.workshop}
                      style={toggleStyles.toggle}
                      onToggle={this.handleToggle}
                    />
                    <Toggle
                      label="Simple room"
                      name="simpleRoom"
                      toggled={this.state.simpleRoom}
                      style={toggleStyles.toggle}
                      onToggle={this.handleToggle}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <TextField
                    id="quantity"
                    floatingLabelText="Quantity"
                    floatingLabelFixed
                    value={this.state.quantity}
                    disabled
                  />
                  <Slider
                    min={0}
                    max={15}
                    step={1}
                    value={this.state.quantity}
                    onChange={this.handleSlider}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <TextField
                    id="price"
                    floatingLabelText="Price"
                    floatingLabelFixed
                    value={this.state.price}
                    disabled
                  />
                </div>
              </div>
              <RaisedButton onClick={this.bookEvent} label="Validate" primary style={btnStyle} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectBooking();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    bookEvent(event) {
      return dispatch(bookEvent(event));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
