/**
 * Provides Goldstone-themed video player component with out of the box features.
 *
 * @module goldstone/VideoPlayer
 * @exports VideoPlayer
 */
import PropTypes from 'prop-types';
import React, {useReducer, useCallback, useEffect} from 'react';
import VideoPlayerBase from './VideoPlayerBase/VideoPlayer';
import videoPlayerReducer from './Reducers/videoPlayerReducer';
import settingsReducer from './Reducers/settingsReducer';
import subtitleInitialState from './SubTitle/subtitleData';

import css from './VideoPlayer.module.less';

const initialState = {
	current: 0,
	repeat: {
		type: 0,
		loop: false
	},
	settings: {
		isOpen: false,
		position: 0
	},
	subTitle: {
		isOpen: false,
		position: 0
	}
};

const VideoPlayer = (
		{
			// actionGuideLabel,
			handleBack,
			playlist,
			...rest
		}
) => {

	// Video Player component state.
	const [state] = useReducer(videoPlayerReducer, initialState);
	const [subtitleState] = useReducer(settingsReducer, subtitleInitialState);
	// const subtitleRef = React.createRef();
	const handleSubtitleSettings = useCallback(value => {
		const videoPlayerTag = document.getElementsByTagName('video')[0];
		videoPlayerTag.className = `${videoPlayerTag.className.split(' ')[0]} ${css[value.color.value]} ${css[value.size.value]}`;
	}, []);

	// const handleSubtitleNavigate = useCallback((value) => {
	// 	dispatchSubtitle({type: 'navigate', payload: value});
	// }, []);

	// const handleSubtitleSelect = useCallback((item) => {
	// 	dispatchSubtitle({type: 'selected', payload: item.selected});
	// }, []);

	// const handleSubtitleRepeat = useCallback(() => {
	// 	dispatch({ type: 'repeat' })
	// }, []);

	// const handleSubtitleMenu = useCallback((event) => {
	// 	dispatch({type: 'toggle', payload: 'subTitle', position: event.pageX})
	// }, []);

	// const handleSettingsMenu = useCallback((event) => {
	// 	dispatch({type: 'toggle', payload: 'settings', position: event.pageX})
	// }, []);

	// handle subtitle color
	useEffect(() => {
		handleSubtitleSettings({
			position: {
				value: subtitleState.items.position.children.items[subtitleState.items.position.children.index].value
			},
			size: {
				value: subtitleState.items.size.children.items[subtitleState.items.size.children.index].value
			},
			color: {
				value: subtitleState.items.color.children.items[subtitleState.items.color.children.index].value
			}
		});
	}, [subtitleState.items.size.children.index, subtitleState.items.position.children.index, subtitleState.items.color.children.index, handleSubtitleSettings, subtitleState.items.position.children.items, subtitleState.items.size.children.items, subtitleState.items.color.children.items]);

	// const handleNext = useCallback(() => {
	// 	dispatch({type: 'jump', payload: {playlistLength: playlist.length - 1, playlistDirection: 'next'}})
	// }, [playlist.length]);
	// const handleNext = () => {
		// dispatch({type: 'jump', payload: {playlistLength: playlist.length - 1, playlistDirection: 'next'}})
	// };

	// const handlePrevious = useCallback(() => {
	// 	dispatch({type: 'jump', payload: {playlistLength: playlist.length - 1, playlistDirection: 'previous'}})
	// }, [playlist.length]);
	// const handlePrevious = () => {
		// dispatch({type: 'jump', payload: {playlistLength: playlist.length - 1, playlistDirection: 'previous'}})
	// };

	return (
		<VideoPlayerBase
			{...rest}
			// onJumpForward={handleNext}
			// onJumpBackward={handlePrevious}
			// onEnded={handleNext}
			onBack={handleBack}
			loop={state.repeat.loop}
			poster={playlist.thumbnail}
			thumbnailSrc={playlist.thumbnail}
			title={playlist.title}
			infoComponents={playlist.title}
		>
			<source src={playlist.file_path} type="video/mp4" />
			{/* <source src='file:///tmp/usb/sda/sda1/small.mp4' type="video/mp4" /> */}
			{/* <track ref={subtitleRef} id="subtitle-english" kind="subtitles" srcLang="en" src={playlist.track} label="English" default /> */}

			{/* <MediaControls
				// // actionGuideLabel={actionGuideLabel}
			>
				{
					state.settings.isOpen && <Settings position={state.settings.position} />
				}
				{
					state.subTitle.isOpen &&
					<SubTitle
						data={subtitleState}
						handleNavigate={handleSubtitleNavigate}
						handleSelect={handleSubtitleSelect}
						position={state.subTitle.position}
					/>
				}
				<Button
					onClick={handleSubtitleRepeat}
					icon={iconsTypes.repeat[state.repeat.type]}
					iconOnly
					size="small"
					backgroundOpacity="transparent"
				/>
				<Button onClick={handleSubtitleMenu} size="small" icon="subtitle" iconOnly backgroundOpacity="transparent" />
				<Button size="small" icon="demooptions" iconOnly backgroundOpacity="transparent" />
				<Button size="small" icon="pausejumpforward" iconOnly backgroundOpacity="transparent" />
				<Button size="small" icon="cc" iconOnly backgroundOpacity="transparent" />
				<Button onClick={handleSettingsMenu} size="small" icon="gear" iconOnly backgroundOpacity="transparent" />
			</MediaControls> */}
		</VideoPlayerBase>
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
