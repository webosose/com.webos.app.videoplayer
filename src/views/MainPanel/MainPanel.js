import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {TabLayout, Tab} from '@enact/goldstone/TabLayout';
import {Panel, Header} from '@enact/goldstone/Panels';
import VideoList from '../../components/VideoList';

import {changePath} from '../../actions/navigationActions';
import {getDeviceList} from '../../actions/deviceActions';
import {getVideoList, getCurrentVideoMetaData} from '../../actions/videoActions';

import css from './MainPanel.module.less';

const MainPanel = ({devices, handleNavigate, getListDevice, getListVideo, getVideoMetaData, videoList, ...rest}) => {

	useEffect(() => {
		getListDevice();
	}, []);

	const handleVideoNavigate = (url, videoMetaData, index) => {
		getVideoMetaData(videoMetaData.uri, index);
		handleNavigate(url);
	};

	return (
		<Panel {...rest}>
			<Header />
			<TabLayout
				onSelect={getListVideo}
			>
				{devices.map((device) => {
					return device.deviceList.length > 0 && device.deviceList.map((deviceList, index) => {
						return (
							<Tab className={css.tab} key={deviceList.uri} title={deviceList.name} icon='usb'>
								<VideoList key={index} videoList={videoList} handleNavigate={handleVideoNavigate}/>
							</Tab>
						)
					})
				})}
			</TabLayout>
		</Panel>
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
		devices: device.deviceList,
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
