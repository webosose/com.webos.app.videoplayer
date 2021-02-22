import React from 'react';
import {connect} from 'react-redux';
import {changePath} from '../../actions/navigationActions';
import VideoPlayer from '../../components/VideoPlayer';

const VideoPanel = ({videoMetaData, handleBack}) => {
	return (
		<VideoPlayer
			actionGuideLabel={'Press Down Button to Scroll'}
			autoCloseTimeout={7000}
			disabled={false}
			feedbackHideDelay={3000}
			handleBack={() => handleBack('home')}
			// loop={boolean('loop', Config, false)}
			miniFeedbackHideDelay={2000}
			muted={false}
			noAutoPlay={false}
			noAutoShowMediaControls={false}
			noMediaSliderFeedback={false}
			noMiniFeedback={false}
			noSlider={false}
			pauseAtEnd={true}
			playlist={videoMetaData}
			// poster={poster}
			seekDisabled={false}
			spotlightDisabled={false}
			// thumbnailSrc={poster}
			thumbnailUnavailable={true}
			title={'Sandstone VideoPlayer Sample Video'}
			titleHideDelay={4000}
		/>
	)
};

const mapStateToProps = ({video: {currentVideoMetaData}}) => {
	return {
		videoMetaData: currentVideoMetaData
	}
}

const mapDispatchToState = dispatch => {
	return {
		handleBack: (path) => dispatch(changePath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToState)(VideoPanel);
