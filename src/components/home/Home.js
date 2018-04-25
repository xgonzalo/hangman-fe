import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import * as gameAction from 'actions/gameAction';
import {drawInChalk, applySquareChalkStyle} from 'helpers/chalkHelper';
import Button from 'components/button/Button';
import Login from 'components/login/Login';
import Header from 'components/head/Header';

import {LOCAL_STORAGE_USER} from '/constants/Constants';

import './Home.scss';

class Home extends Component {
  render() {
    const {gameAction, loggedIn} = this.props;
    if (!loggedIn) {
      if (!localStorage.getItem(LOCAL_STORAGE_USER)) return <Login />;
      gameAction.sessionLogin();
    }

    return (
      <div className="home">
        <Header />
        <h1>Hangman</h1>
        <div>
          <Link to={'/game'}>
            <Button
              width={300}
              height={100}
              className="home__start"
            >
              PLAY
            </Button>
          </Link>
        </div>
        <div>
          <Button
            width={200}
            height={50}
            className="home__stats"
          >
            STATISTICS
          </Button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  loggedIn: PropTypes.bool,
  gameAction: PropTypes.object
};

function mapStateToProps(state) {
  return {
    loggedIn: state.game.loggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gameAction: bindActionCreators(gameAction, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
