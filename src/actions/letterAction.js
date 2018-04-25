import * as types from './actionTypes';
import {post} from 'helpers/serviceHelper';

function postLetterGuessed(letter, positions) {
  return {
    type: types.LETTER_GUESSED,
    letter,
    positions
  };
}

function postLetterError(errors) {
  return {
    type: types.LETTER_ERROR,
    errors
  };
}

export function resetGame() {
  return {
    type: types.LETTER_RESET_GAME
  };
}

export function postLetter(letter) {
  return dispatch => {
    post('letter', {letter})
      .then(response => {
        if (!response.errors) {
          dispatch(postLetterGuessed(response.letter, response.positions));
        } else {
          dispatch(postLetterError(response.errors));
        }
      });
  };
}