import path from './navigationReducer';
import videoListReducer from './videoReducer';
import deviceReducer from './deviceReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    path: path,
    device: deviceReducer,
    video: videoListReducer
});
export default rootReducer;