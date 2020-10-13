import { createStore } from 'redux';
import brainReducer from './reducer';
const store = createStore(brainReducer);
export default store;