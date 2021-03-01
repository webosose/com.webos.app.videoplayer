import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '@enact/goldstone/ImageItem';
import {VirtualGridList} from '@enact/goldstone/VirtualList';
import ri from '@enact/ui/resolution';
import placeHolderImg from '../../../assets/icons/play.svg';

const VideoList = ({videoList, handleNavigate}) => {
    const renderItem = ({index, ...rest}) => {
		let thumbPath = videoList[index].thumbnail;
		let encodedPath = encodeURIComponent(thumbPath);

		if (thumbPath && thumbPath.substring(0, 1) === '/') {
			encodedPath = 'file:///' + encodedPath;
		}

		return (
			<ImageItem
				{...rest}
				src={encodedPath}
				placeholder={placeHolderImg}
				onClick={() => handleNavigate('/videoplayer', videoList[index], index)}
			>
				{videoList[index].itemName}
			</ImageItem>
		);
	};
	videoList = videoList || [];
    return (
		videoList.length === 0 ?
			<h3>No Photo, Video or folders exist in storage device</h3 > :
			<VirtualGridList
				direction='vertical'
				dataSize={videoList.length}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(500),
					minHeight: ri.scale(500)
				}}
			/>
	);
}

VideoList.propTypes = {
	handleNavigate: PropTypes.func.isRequired,
	videoList: PropTypes.array
};

VideoList.default = {
	videoList: []
};


export default VideoList;
