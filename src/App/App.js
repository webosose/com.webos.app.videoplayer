import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Panels, Routable, Route} from '@enact/goldstone/Panels';
import ThemeDecorator from '@enact/goldstone/ThemeDecorator';

import MainPanel from '../views/MainPanel';
import VideoPanel from '../views/VideoPanel';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const App = ({path, ...rest}) => {
	return (
		<RoutablePanels {...rest} path={path}>
			<Route path="home" component={MainPanel} title="Home Page" />
			<Route path="videoplayer" component={VideoPanel} title="Video Player" />
		</RoutablePanels>
	);
};

App.propTypes = {
	path: PropTypes.string
};

const mapStateToProps = ({path}) => {
	return {
		path: path.path
	};
};

export default connect(mapStateToProps, {})(ThemeDecorator(App));
