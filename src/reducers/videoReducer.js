import {types} from '../actions/types';


const initialState = {
	isVideoListLoading: false,
	isCurrentVideoLoading: false,
	videoList: [],
	currentVideoMetaData: {},
	videoIndex: -1,
	videoListError: '',
	currentVideoError: ''
};

const videoListReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_VIDEO_LIST: {
			return {
				...state,
				isVideoListLoading: true,
				videoList: [],
				videoListError: ''
			};
		}
		case types.FETCH_VIDEO_LIST_SUCCESS: {
			return {
				...state,
				isVideoListLoading: false,
				videoList: action.payload,
				videoListError: ''
			};
		}
		case types.FETCH_VIDEO_LIST_ERROR: {
			return {
				...state,
				isVideoListLoading: false,
				videoList: [],
				videoListError: action.payload
			};
		}
		case types.FETCH_CURRENT_VIDEO_REQUEST: {
			return {
				...state,
				isCurrentVideoLoading: true,
				currentVideoMetaData: {},
				currentVideoError: ''
			};
		}
		case types.FETCH_CURRENT_VIDEO_SUCCESS: {
			return {
				...state,
				isCurrentVideoLoading: false,
				videoIndex: action.index,
				currentVideoMetaData: action.payload,
				currentVideoError: ''
			};
		}
		case types.FETCH_CURRENT_VIDEO_ERROR: {
			return {
				...state,
				isCurrentVideoLoading: false,
				currentVideoMetaData: {},
				currentVideoError: action.payload
			};
		}
		default: return state;
	}
};

export default videoListReducer;
