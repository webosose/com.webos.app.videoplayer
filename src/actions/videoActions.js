import {types} from './types';
import {Video} from '../services';
import LS2Request from '@enact/webos/LS2Request';

const getCurrentVideoRequest = () => {
    return {
        type: types.FETCH_CURRENT_VIDEO_REQUEST
    }
}

const setCurrentVideoSuccess = (videoMetaData) => {
    return {
        type: types.FETCH_CURRENT_VIDEO_SUCCESS,
        payload: videoMetaData
    }
}

const setCurrentVideoError = (message) => {
    return {
        type: types.FETCH_CURRENT_VIDEO_ERROR,
        payload: message
    }
}

const getVideoListRequest = () => {
    return {
        type: types.FETCH_VIDEO_LIST_REQUEST
    }
}

const setVideoListSuccess = (videoList) => {
    return {
        type: types.FETCH_VIDEO_LIST_SUCCESS,
        payload: videoList
    }
}

const setVideoListError = (message) => {
    return {
        type: types.FETCH_VIDEO_LIST_ERROR,
        payload: message
    }
}

const getVideoList = ({uri}) => (dispatch) => {
    dispatch(getVideoListRequest());
    Video.getVideoList({
        uri: uri,
        onSuccess: (res) => {
            const {returnValue, videoList} = res;
            if(returnValue) {
                dispatch(setVideoListSuccess(videoList.results))
            }
        },
        onFailure: (err) => {
            dispatch(setVideoListError(err.errorText))
        }
    })
}

const getCurrentVideoMetaData = ({uri}) => (dispatch) => {
    dispatch(getCurrentVideoRequest());
    return new LS2Request().send({
		service: 'luna://com.webos.service.mediaindexer',
		method: 'getVideoMetadata',
		parameters: {uri:uri},
		onSuccess: ({metadata}) => {
            dispatch(setCurrentVideoSuccess(metadata))
		},
		onFailure: (err) => {
            dispatch(setVideoListError(err.errorText))
		}
	});
}

export {
    getCurrentVideoRequest,
    setCurrentVideoSuccess,
    setCurrentVideoError,
    getCurrentVideoMetaData,
    getVideoListRequest,
    setVideoListSuccess,
    setVideoListError,
    getVideoList
}