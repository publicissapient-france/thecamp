/**
 *
 * MenuDrawer
 *
 */

import React from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import HomeIcon from 'material-ui/svg-icons/action/home';
import BookingIcon from 'material-ui/svg-icons/action/card-travel';
import InboxIcon from 'material-ui/svg-icons/content/inbox';
import ContactIcon from 'material-ui/svg-icons/communication/contacts';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import styles from './style.css';

export class MenuDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div className={styles.navbar}>
        <AppBar title="TheCamp" onLeftIconButtonTouchTap={this.handleToggle} />
        <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({ open })}>
          <AppBar iconStyleLeft={{ display: 'none' }} title="Menu" />
          <MenuItem
            containerElement={<Link to="/" />} // eslint-disable-line
            primaryText="Home"
            onTouchTap={this.handleClose}
            leftIcon={<HomeIcon />}
          />
          <MenuItem
            containerElement={<Link to="/booking" />} // eslint-disable-line
            primaryText="Booking"
            onTouchTap={this.handleClose}
            leftIcon={<BookingIcon />}
          />
          <MenuItem onTouchTap={this.handleClose} leftIcon={<InboxIcon />}>Inbox</MenuItem>
          <MenuItem onTouchTap={this.handleClose} leftIcon={<ContactIcon />}>Contact</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default MenuDrawer;
