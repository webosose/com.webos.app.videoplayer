import {types} from './types';
import {Device} from '../services';

const getDeviceListRequest = () => {
	return {
		type: types.FETCH_DEVICE_LIST_REQUEST
	};
};

const setDeviceListSuccess = (deviceList) => {
	return {
		type: types.FETCH_DEVICE_LIST_SUCCESS,
		payload: deviceList
	};
};

const setDeviceListError = (errMessage) => {
	return {
		type: types.FETCH_DEVICE_LIST_ERROR,
		payload: errMessage
	};
};

const getDeviceList = ({subscribe}) => (dispatch) => {
	dispatch(getDeviceListRequest());
	Device.getDeviceList({
		subscribe: subscribe,
		onSuccess: (res) => {
			dispatch(setDeviceListSuccess(res.pluginList));
		},
		onFailure: (err) => {
			dispatch(setDeviceListSuccess(err.errorText));
		}
	});
};

export {
	getDeviceList,
	getDeviceListRequest,
	setDeviceListSuccess,
	setDeviceListError
};
