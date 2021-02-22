import luna from './request';

const videoService = {

	getVideoList: ({uri, ...rest}) => {
		let params = {
			uri: uri
		};
		return luna('com.webos.service.mediaindexer', 'getVideoList', params)(rest);
	},

	getVideoMetaData: ({uri, ...rest}) => {
		let params = {
			uri: uri
		};
		return luna('com.webos.service.mediaindexer', 'getVideoMetadata ', params)(rest);
	}
};

export default videoService;
export {
	videoService
};
