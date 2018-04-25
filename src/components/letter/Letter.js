import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as letterAction from 'actions/letterAction';
import './Letter.scss';

class Letter extends Component {
  constructor() {
    super();
    this.state = {
      used: false
    };

    this.handleLetterClick = this.handleLetterClick.bind(this);
  }

  handleLetterClick() {
    const {used} = this.state;
    const {letter, letterAction} = this.props;

    if (!used) {
      this.setState({
        used: true
      });
      letterAction.postLetter(letter);
    }
  }

  render() {
    const {letter} = this.props;
    return (
      <span
        className={`letter ${this.state.used ? 'letter--used' : ''}`}
        onClick={this.handleLetterClick}
      >
        {letter}
      </span>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    letterAction: bindActionCreators(letterAction, dispatch)
  };
}

Letter.propTypes = {
  letter: PropTypes.string,
  letterAction: PropTypes.object
};

export default connect(
  null,
  mapDispatchToProps
)(Letter);
