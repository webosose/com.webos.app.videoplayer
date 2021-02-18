import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Header from '../../components/Header';
import SideMenu from '../../components/SideMenu';
import DeviceList from '../../components/DeviceList';
import VideoList from '../../components/VideoList';

import {changePath} from '../../actions/navigationActions';
import {getDeviceList} from '../../actions/deviceActions';
import {getVideoList, getCurrentVideoMetaData} from '../../actions/videoActions';

import css from './MainPanel.module.less';

const MainPanel = ({deviceList, handleNavigate, getDeviceList, getVideoList, getVideoMetaData, videoList}) => {

	useEffect(() => {
		getDeviceList()
	}, [])

	const handleVideoNavigate = (url, videoMetaData) => {
		getVideoMetaData(videoMetaData.uri);
		handleNavigate(url);
	}

	return (
		<div className={css.container}>
			<div className={css.childContainer}>
				<Header />
				<div className={css.mainContainer}>
					<div className={css.sideMenu}>
						<SideMenu>
							<DeviceList deviceList={deviceList} handleAction={() => getVideoList()}/>
						</SideMenu>
					</div>
					<div className={css.mainMenu}>
						<VideoList videoList={videoList} handleNavigate={handleVideoNavigate}/>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({device, video}) => {
	return {
		deviceList: device.deviceList,
		videoList: video.videoList
	}
}

const mapDispatchToState = dispatch => {
	return {
		handleNavigate: (path) => dispatch(changePath(path)),
		getDeviceList: () => dispatch(getDeviceList({
			subscribe: true
		})),
		getVideoList: (uri) => dispatch(getVideoList({
			uri: uri
		})),
		getVideoMetaData: (uri) => dispatch(getCurrentVideoMetaData({
			uri: uri
		}))
	}
}

export default connect(mapStateToProps, mapDispatchToState)(MainPanel);
