import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameAction from 'actions/gameAction';
import {LOCAL_STORAGE_USER} from 'constants/Constants';

import './Header.scss';

class Header extends Component {
  constructor() {
    super();

    this.logout = this.logout.bind(this);
  }

  logout() {
    const {gameAction} = this.props;

    gameAction.logout();
  }

  render() {
    return (
      <header className="header">
        <span className="header__logout" onClick={this.logout}>Switch User</span>
        <span className="header__user">{localStorage.getItem(LOCAL_STORAGE_USER)}</span>
      </header>
    );
  }
}

Header.propTypes = {
  gameAction: PropTypes.object
};

function mapDispatchToProps(dispatch) {
  return {
    gameAction: bindActionCreators(gameAction, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Header);
