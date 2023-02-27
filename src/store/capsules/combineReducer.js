import { combineReducers } from 'redux';
import capsulesReducer from './reducer';

const rootReducer = combineReducers({
  capsules: capsulesReducer
});

export default rootReducer;