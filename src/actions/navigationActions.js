import {types} from './types';

const changePath = (path) => {
	return {
		type: types.CHANGE_PATH,
		payload: path
	};
};

export {
	changePath
};
