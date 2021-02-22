import ThemeDecorator from '../components/ThemeDecorator';
import React from 'react';
import PropTypes from 'prop-types';
import {Panels, Routable, Route} from '../components/Panels';
import {connect} from 'react-redux';

import MainPanel from '../views/MainPanel';
import VideoPanel from '../views/VideoPanel';

const RoutablePanels = Routable({navigate: 'onBack'}, Panels);

const App = ({path, ...rest}) => {
	return (
		<div>
			<RoutablePanels {...rest} path={path}>
				<Route path="home" component={MainPanel} title="Home Page" />
				<Route path="videoplayer" component={VideoPanel} title="Video Player" />
			</RoutablePanels>
		</div>
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

export default connect(mapStateToProps)(ThemeDecorator(App));
