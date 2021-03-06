/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Panels, Routable, Route} from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';
import VideoPanel from '../views/VideoPanel';

import {changePath} from '../actions/navigationActions';
import {getCurrentVideoMetaData} from '../actions/videoActions';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const App = ({handleNavigate, getVideoMetaData, path, ...rest}) => {

	const onLaunch = () => {
		const launchParams = JSON.parse(window.PalmSystem.launchParams);
		if (launchParams && launchParams.videoList && launchParams.videoList.count > 0) {
			getVideoMetaData(launchParams.videoList.results[0].uri, 0);
			handleNavigate('/videoplayer');
		}
	};

	useEffect(() => {
		if (typeof window === 'object' && window.PalmSystem) {
			onLaunch();
		}
		document.addEventListener('webOSRelaunch', onLaunch);
		document.addEventListener('webOSLocaleChange', () => {
			window.location.reload();
		});
	}, []);

	return (
		<RoutablePanels {...rest} path={path}>
			<Route path="home" component={MainPanel} title="Home Page" />
			<Route path="videoplayer" component={VideoPanel} title="Video Player" />
		</RoutablePanels>
	);
};

App.propTypes = {
	getVideoMetaData: PropTypes.func,
	handleNavigate: PropTypes.func,
	path: PropTypes.string

};

const mapStateToProps = ({path}) => {
	return {
		path: path.path
	};
};

const mapDispatchToState = dispatch => {
	return {
		handleNavigate: (path) => dispatch(changePath(path)),
		getVideoMetaData: (uri, index) => dispatch(getCurrentVideoMetaData({
			uri: uri,
			videoIndex: index
		}))
	};
};

export default connect(mapStateToProps, mapDispatchToState)(ThemeDecorator(App));
