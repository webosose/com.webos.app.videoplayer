import {types} from '../actions/types';

const initialState = {
	isLoading: false,
	deviceList: [],
	error: ''
};

const deviceListReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_DEVICE_LIST_REQUEST : {
			return {
				...state,
				isLoading: true,
				deviceList: [],
				error: ''
			};
		}
		case types.FETCH_DEVICE_LIST_SUCCESS: {
			return {
				...state,
				isLoading: false,
				deviceList: action.payload,
				error: ''
			};
		}
		case types.FETCH_DEVICE_LIST_ERROR: {
			return {
				...state,
				isLoading: true,
				deviceList: [],
				error: action.payload
			};
		}
		default: return state;
	}
};

export default deviceListReducer;
