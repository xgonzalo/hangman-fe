import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {drawInChalk} from 'helpers/chalkHelper';
import './Input.scss';

class Input extends Component {
  componentDidMount() {
    this.renderLine();
  }

  componentDidUpdate(prevProps) {
    const {error} = this.props;

    if (error !== prevProps.error) {
      if (error) {
        this.renderLine('255,0,0');
      } else {
        this.renderLine();
      }
    }
  }

  renderLine(color = '255,255,255') {
    const ctx = this.canvas.getContext('2d');
    drawInChalk(ctx, 5, 35, 295, 35, 7, 500, color);
  }

  render() {
    const {onBlur} = this.props;
    return (
      <div className="input">
        <input className="input__field" autoFocus placeholder="youremail@domain.com" onBlur={onBlur} />
        <canvas width="300" height="40" ref={canvas => this.canvas = canvas} />
      </div>
    );
  }
}

Input.propTypes = {
  onBlur: PropTypes.func,
  error: PropTypes.bool
};

export default Input;
