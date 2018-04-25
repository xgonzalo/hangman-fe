import initialState from './initialState';
import * as types from 'actions/actionTypes';

export default function game(state = initialState.game, action) {
  switch (action.type) {
    case types.GAME_FETCH:
      return Object.assign({}, state, {
        letters: action.game.letters,
        gameId: state.gameId || new Date().getTime()
      });
    case types.GAME_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        loggingIn: false
      });
    case types.GAME_LOGIN_REQUEST:
      return Object.assign({}, state, {
        loggingIn: true
      });
    case types.GAME_LOGOUT:
      return Object.assign({}, state, {
        loggedIn: false
      });
    case types.GAME_WIN:
      return Object.assign({}, state, {
        won: true
      });
    case types.GAME_LOSE:
      return Object.assign({}, state, {
        lost: true
      });
    case types.GAME_PLAY_AGAIN:
      return Object.assign({}, state, {
        won: false,
        lost: false,
        gameId: new Date().getTime()
      });
    default:
      return state;
  }
}