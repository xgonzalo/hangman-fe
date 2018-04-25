import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Letter from 'components/letter/Letter';
import './Letters.scss';

class Letters extends Component {
  render() {
    const {className} = this.props;

    const positions = new Array(13); // amount of letters
    positions.fill(0, 0);
    return (
      <div className={`letters ${className}`}>
        <div className="letters__column">
          {positions.map((position, index) => (
            <Letter key={`letter1-${index}`} letter={String.fromCharCode(index + 65)} />
          ))}
        </div>
        <div className="letters__column">
          {positions.map((position, index) => (
            <Letter key={`letter2-${index}`} letter={String.fromCharCode(index + 65 + 13)} />
          ))}
        </div>
      </div>
    );
  }
}

Letters.propTypes = {
  className: PropTypes.string
};

Letters.defaultProps = {
  className: ''
};

export default Letters;
