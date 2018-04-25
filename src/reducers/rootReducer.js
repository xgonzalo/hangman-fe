import {combineReducers} from 'redux';
import game from './gameReducer';
import letter from './letterReducer';

const rootReducer = combineReducers({
  game,
  letter
});

export default rootReducer;