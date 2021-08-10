/**
 * Provides Goldstone-themed video player component with out of the box features.
 *
 * @module goldstone/VideoPlayer
 * @exports VideoPlayer
 */
import PropTypes from 'prop-types';
import VideoPlayerBase, {Video} from '@enact/sandstone/VideoPlayer';
import Button from '@enact/sandstone/Button';

const VideoPlayer = (
		{
			handleBack,
			handleNext,
			handlePrevious,
			playlist
		}
) => {

	return (
		<>
			<div style={{position: 'absolute', top: '0', right: '0', zIndex: '9999'}}>
				<Button
					icon="arrowlargeleft"
					onClick={handlePrevious}
				/>
				<Button
					icon="arrowlargeright"
					onClick={handleNext}
				/>
				<Button
					icon="arrowhookleft"
					onClick={handleBack}
				/>
			</div>
			<VideoPlayerBase
				feedbackHideDelay={0}
				onBack={handleBack}
				title={playlist.title}
				playbackRateHash={{
					fastForward: [1.25, '3/2', '2', '2.5', '4', '8'],
					rewind: ['-2', '-4', '-8', '-16'],
					slowForward: ['1/4', '1/2'],
					slowRewind: ['-1/2', '-1']
				}}
			>
				<Video>
					<source src={playlist.file_path} />
				</Video>
			</VideoPlayerBase>
		</>
	);
};

VideoPlayer.propTypes = {
	/**
	 * Label for Action guide Component
	 *
	 * @type {String}
	 * @default 'Press down button to Scroll'
	 * @public
	 */
	// actionGuideLabel: PropTypes.string,

	/**
	 * Function to handle navigation
	 *
	 * @type {Function}
	 */
	handleBack: PropTypes.func,

	/**
	 * Function to handle Next video
	 *
	 * @type {Function}
	 */
	handleNext: PropTypes.func,

	/**
	 * Function to handle Previous video
	 *
	 * @type {Function}
	 */
	handlePrevious: PropTypes.func,

	/**
	 * Contains the list of videos to be played
	 *
	 * @type {Array}
	 */
	playlist: PropTypes.object
};

VideoPlayer.defaultProps = {
	// actionGuideLabel: 'Press down button to Scroll'
};

export default VideoPlayer;
