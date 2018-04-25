import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameAction from 'actions/gameAction';
import Input from 'components/input/Input';
import Button from 'components/button/Button';
import './Login.scss';

class Login extends Component {
  constructor() {
    super();

    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.login = this.login.bind(this);

    this.email = '';

    this.state = {
      error: false
    };
  }

  handleEmailBlur(e) {
    const email = e.target.value;
    if (email.match(/.+@.+\..+/)) {
      this.setState({
        error: false
      });
      this.email = email;
    } else {
      this.setState({
        error: true
      });
    }
  }

  login() {
    const {gameAction} = this.props;

    if (!this.state.error) {
      gameAction.login(this.email);
    }
  }

  render() {
    return (
      <div className="login">
        <label>Please enter your email:</label>
        <Input onBlur={this.handleEmailBlur} error={this.state.error} />
        <div>
          <Button
            width={200}
            height={50}
            textInChalk={true}
            className="login__button"
            onClick={this.login}
          >
            Start
          </Button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    gameAction: bindActionCreators(gameAction, dispatch)
  };
}

Login.propTypes = {
  gameAction: PropTypes.object
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
