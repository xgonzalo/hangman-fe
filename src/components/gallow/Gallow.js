import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameAction from 'actions/gameAction';
import {drawInChalk} from 'helpers/chalkHelper';
import {renderHead, renderNeck, renderArmOrLeg, renderBody, renderFoot, kill} from 'helpers/bodyHelper';
import {getAngle} from 'helpers/angleHelper';
import fail from 'assets/sounds/fail.mp3';

import './Gallow.scss';

class Gallow extends Component {
  constructor() {
    super();

    this.brushSize = 7;
  }
  componentDidMount() {
    const ctx = this.canvas.getContext('2d');

    drawInChalk(ctx, 110, 390, 190, 390, this.brushSize)
      .then(() => {
        drawInChalk(ctx, 150, 390, 150, 100, this.brushSize)
          .then(() => {
            drawInChalk(ctx, 150, 100, 270, 100, this.brushSize)
              .then(() => {
                drawInChalk(ctx, 270, 100, 270, 150, this.brushSize);
              });
          });
      });
  }

  componentDidUpdate(prevProps) {
    const {errors, gameAction} = this.props;
    const ctx = this.canvas.getContext('2d');
    if (errors !== prevProps.errors) {
      this.fail.play();
      switch(errors) {
        case 1:
          renderHead(ctx, 270, 170, 20, this.brushSize);
          break;
        case 2:
          renderNeck(ctx, {x: 270, y: 190}, this.brushSize);
          break;
        case 3:
          renderArmOrLeg(ctx, {x: 270, y: 210}, true, this.brushSize);
          break;
        case 4:
          renderArmOrLeg(ctx, {x: 270, y: 210}, false, this.brushSize);
          break;
        case 5:
          renderBody(ctx, {x: 270, y: 210}, this.brushSize);
          break;
        case 6:
          renderArmOrLeg(ctx, {x: 270, y: 290}, true, this.brushSize);
          break;
        case 7:
          renderArmOrLeg(ctx, {x: 270, y: 290}, false, this.brushSize);
          break;
        case 8:
          renderFoot(ctx, {x: 320, y: 340}, true, this.brushSize);
          break;
        case 9:
          renderFoot(ctx, {x: 220, y: 340}, false, this.brushSize);
          break;
        case 10:
          kill(ctx, {x: 270, y: 200}, this.brushSize)
            .then(() => gameAction.lose());
          break;
      }
    }
  }

  render() {
    return (
      <div className="gallow">
        <canvas width="400" height="400" ref={canvas => this.canvas = canvas}/>
          <audio ref={fail => this.fail = fail}>
            <source src={fail} type="audio/mpeg" />
          </audio>
      </div>
    );
  }
}

Gallow.propTypes = {
  errors: PropTypes.number,
  gameAction: PropTypes.object
};

function mapStateToProps(state) {
  return {
    errors: state.letter.error,
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
)(Gallow);
