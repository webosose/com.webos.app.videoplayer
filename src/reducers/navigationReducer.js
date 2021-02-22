import {types} from '../actions/types';

const initialState = {
	path: 'home'
};

function path (state = initialState, action) {
	switch (action.type) {
		case types.CHANGE_PATH: {
			return {
				...state,
				path: action.payload
			};
		}
		default:
			return state;
	}
}

export default path;
