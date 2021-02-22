import React from 'react';
import PropTypes from 'prop-types';

import ImageItem from '../ImageItem';


const VideoList = ({videoList, handleNavigate}) => {
	return (
		videoList && videoList.map((item, index) => (
			<div
				key={`${item.title}-${index}`} onClick={() => {
					handleNavigate('/videoplayer', item, index);
				}}
			>
				<ImageItem title={item.title} thumbnail={item.thumbnail} />
			</div>
		))
	);
};

VideoList.propTypes = {
	handleNavigate: PropTypes.func.isRequired,
	videoList: PropTypes.array
};

VideoList.default = {
	videoList: []
};


export default VideoList;
