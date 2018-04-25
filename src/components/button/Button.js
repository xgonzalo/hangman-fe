import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {drawInChalk, applySquareChalkStyle} from 'helpers/chalkHelper';
import click from 'assets/sounds/click.mp3';

import './Button.scss';

class Button extends Component {
  constructor() {
    super();

    this.handleMouseDown = this.handleMouseDown.bind(this);
  }
  componentDidMount() {
    this.drawSquare();
  }

  drawSquare(color = '255,255,255') {
    const {children, width, height, textInChalk} = this.props;
    const ctx = this.startButton.getContext('2d');

    drawInChalk(ctx, 0, 0, width, 0, 7, 500, color)
      .then(() => {
        drawInChalk(ctx, width, 0, width, height, 7, 500, color)
          .then(() => {
            drawInChalk(ctx, width, height, 0, height, 7, 500, color)
              .then(() => {
                drawInChalk(ctx, 0, height, 0, 0, 7, 500, color);
              });
          });
      });

    ctx.font = `${height / 2}px Arial`;
    ctx.fillStyle = "white";
    ctx.textAlign = 'center';
    ctx.fillText(children, width / 2, height - height / 3);
    if (textInChalk) {
      applySquareChalkStyle(ctx,
        {
          x: 0,
          y: 0
        },
        {
          x: width,
          y: height
        },
      7);
    }
  }

  handleMouseDown() {
    this.clickSound.play();
  }

  render() {
    const {width, height, onClick, className} = this.props;
    return (
      <div>
        <canvas
          width={width}
          height={height}
          className={`btn ${className}`}
          ref={canvas => this.startButton = canvas}
          onClick={onClick}
          onMouseDown={this.handleMouseDown}
        />
        <audio ref={click => this.clickSound = click}>
          <source src={click} type="audio/mpeg" />
        </audio>
      </div>
    );
  }
}

Button.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  textInChalk: PropTypes.bool
};

Button.defaultProps = {
  textInChalk: true,
  onClick: () => {}
};

export default Button;
