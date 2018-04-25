import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameAction from 'actions/gameAction';
import Button from 'components/button/Button';
import lose from 'assets/sounds/lose.mp3';

import './Lost.scss';

class Lost extends Component {
  componentDidMount() {
    this.loseSound.play();
  }

  render() {
    const {gameAction} = this.props;
    return (
      <div className="lost">
        <audio ref={lose => this.loseSound = lose}>
          <source src={lose} type="audio/mpeg" />
        </audio>
        <h1 className="lost__oops">Oops!</h1>
        <h2 className="lost__title">You have lost!</h2>
        <div>
          <Button width={300} height={100} onClick={gameAction.playAgain}>Try again!</Button>
        </div>
      </div>
    );
  }
}

Lost.propTypes = {
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
)(Lost);
