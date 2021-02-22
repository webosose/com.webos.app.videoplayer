import luna from './request';

const deviceService = {

	getDeviceList: ({subscribe, ...rest}) => {
		let params = {
			subscribe: subscribe
		};
		return luna('com.webos.service.mediaindexer', 'getDeviceList', params)(rest);
	}
};

export default deviceService;
export {
	deviceService
};
