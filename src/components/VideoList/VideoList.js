/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types';
import ImageItem from '@enact/sandstone/ImageItem';
import {VirtualGridList} from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import placeHolderImg from '../../../assets/icons/video_invalid.png';

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
				{videoList[index].title}
			</ImageItem>
		);
	};
	renderItem.propTypes = {
		index: PropTypes.number
	};
	videoList = videoList || [];
	return (
		videoList.length === 0 ?
			<h3>No Photo, Video or folders exist in storage device</h3 > :
			<VirtualGridList
				direction="vertical"
				dataSize={videoList.length}
				itemRenderer={renderItem}
				itemSize={{
					minWidth: ri.scale(500),
					minHeight: ri.scale(500)
				}}
			/>
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
