import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameAction from 'actions/gameAction';
import './Blackboard.scss';
import Gallow from 'components/gallow/Gallow';
import Word from 'components/word/Word';
import Header from 'components/head/Header';
import Letters from 'components/letters/Letters';
import Lost from 'components/lost/Lost';
import Win from 'components/win/Win';
import {LOCAL_STORAGE_USER} from '/constants/Constants';

class Blackboard extends Component {
  constructor() {
    super();

    this.state = {
      endRender: false
    };

    this.renderLetters = this.renderLetters.bind(this);
  }

  componentDidMount() {
    const {gameAction} = this.props;

    gameAction.fetchGame();
  }

  componentWillReceiveProps(nextProps) {
    const {loggedIn, gameId, gameAction} = nextProps;
    if (!loggedIn) {
      location.href = '/';
    }

    if (gameId !== this.props.gameId && this.props.gameId) {
      gameAction.fetchGame();
      this.setState({
        endRender: false
      });
    }
  }

  renderLetters() {
    this.setState({
      endRender: true
    });
  }

  get game() {
    const {won, lost, letters} = this.props;

    if (won || lost || !letters) {
      return null;
    }

    return (
      <div className="blackboard__game">
        <div className="blackboard__game__top">
          <Gallow />
          <Letters className={this.state.endRender ? '' : 'hidden'} />
        </div>
        <Word letters={letters} finishRender={this.renderLetters} />
      </div>
    );
  }

  get won() {
    const {won} = this.props;

    if (won) {
      return <Win />;
    }
  }

  get lost() {
    const {lost} = this.props;

    if (lost) {
      return <Lost />;
    }
  }

  render() {
    const {loggedIn} = this.props;

    if (!loggedIn) return null;
    return (
      <div className="blackboard">
        <Header />
        {this.game}
        {this.won}
        {this.lost}
      </div>
    );
  }
}

Blackboard.propTypes = {
  gameAction: PropTypes.object,
  letters: PropTypes.number,
  loggedIn: PropTypes.bool,
  won: PropTypes.bool,
  lost: PropTypes.bool,
  gameId: PropTypes.number
};

function mapStateToProps(state) {
  return {
    letters: state.game.letters,
    loggedIn: state.game.loggedIn,
    won: state.game.won,
    lost: state.game.lost,
    gameId: state.game.gameId
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
)(Blackboard);
