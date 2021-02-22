import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import DeviceList from '../../components/DeviceList';
import VideoList from '../../components/VideoList';

import {changePath} from '../../actions/navigationActions';
import {getDeviceList} from '../../actions/deviceActions';
import {getVideoList, getCurrentVideoMetaData} from '../../actions/videoActions';

import css from './MainPanel.module.less';

const MainPanel = ({deviceList, handleNavigate, getListDevice, getListVideo, getVideoMetaData, videoList}) => {

	useEffect(() => {
		getListDevice();
	}, []);

	const handleVideoNavigate = (url, videoMetaData, index) => {
		getVideoMetaData(videoMetaData.uri, index);
		handleNavigate(url);
	};

	return (
		<div className={css.container}>
			<div className={css.childContainer}>
				<Header />
				<div className={css.mainContainer}>
					<div className={css.sideMenu}>
						<SideMenu>
							<DeviceList deviceList={deviceList} handleAction={() => getListVideo()} />
						</SideMenu>
					</div>
					<div className={css.mainMenu}>
						<VideoList videoList={videoList} handleNavigate={handleVideoNavigate} />
					</div>
				</div>
			</div>
		</div>
	);
};

MainPanel.propTypes = {
	deviceList: PropTypes.array,
	getListDevice: PropTypes.func,
	getListVideo: PropTypes.func,
	getVideoMetaData: PropTypes.func,
	handleNavigate: PropTypes.func,
	videoList: PropTypes.array
};

const mapStateToProps = ({device, video}) => {
	return {
		deviceList: device.deviceList,
		videoList: video.videoList
	};
};

const mapDispatchToState = dispatch => {
	return {
		handleNavigate: (path) => dispatch(changePath(path)),
		getListDevice: () => dispatch(getDeviceList({
			subscribe: true
		})),
		getListVideo: (uri) => dispatch(getVideoList({
			uri: uri
		})),
		getVideoMetaData: (uri, index) => dispatch(getCurrentVideoMetaData({
			uri: uri,
			videoIndex: index
		}))
	};
};

export default connect(mapStateToProps, mapDispatchToState)(MainPanel);
