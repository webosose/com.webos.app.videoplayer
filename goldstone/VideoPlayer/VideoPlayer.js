/**
 * Provides Goldstone-themed video player component with out of the box features.
 *
 * @module goldstone/VideoPlayer
 * @exports VideoPlayer
 */
import PropTypes from 'prop-types';
import React, {useReducer, useCallback, useEffect} from 'react';
import Button from '../Button';
import VideoPlayerBase, {MediaControls} from './VideoPlayerBase/VideoPlayer';
import Settings from './Settings';
import SubTitle from './SubTitle';
import videoPlayerReducer from './Reducers/videoPlayerReducer';
import settingsReducer from './Reducers/settingsReducer';
import subtitleInitialState from './SubTitle/subtitleData';

import css from './VideoPlayer.module.less';

const iconsTypes = {
	repeat: [
		'repeatall',
		'repeatone',
		'repeatnone'
	]
};

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
			actionGuideLabel,
			playlist,
			...rest
		}
) => {

	// Video Player component state.
	const [state, dispatch] = useReducer(videoPlayerReducer, initialState);
	const [subtitleState, dispatchSubtitle] = useReducer(settingsReducer, subtitleInitialState);
	const subtitleRef = React.createRef();
	const handleSubtitleSettings = useCallback(value => {
		const videoPlayerTag = document.getElementsByTagName('video')[0];
		videoPlayerTag.className = `${videoPlayerTag.className.split(' ')[0]} ${css[value.color.value]} ${css[value.size.value]}`;
	}, []);

	const handleSubtitleNavigate = useCallback((value) => {
		dispatchSubtitle({type: 'navigate', payload: value});
	}, []);

	const handleSubtitleSelect = useCallback((item) => {
		dispatchSubtitle({type: 'selected', payload: item.selected});
	}, []);

	const handleSubtitleRepeat = useCallback(() => {
		dispatch({ type: 'repeat' })
	}, []);

	const handleSubtitleMenu = useCallback((event) => {
		dispatch({type: 'toggle', payload: 'subTitle', position: event.pageX})
	}, []);

	const handleSettingsMenu = useCallback((event) => {
		dispatch({type: 'toggle', payload: 'settings', position: event.pageX})
	}, []);

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

	const handleNext = useCallback(() => {
		dispatch({type: 'jump', payload: {playlistLength: playlist.length - 1, playlistDirection: 'next'}})
	}, [playlist.length]);

	const handlePrevious = useCallback(() => {
		dispatch({type: 'jump', payload: {playlistLength: playlist.length - 1, playlistDirection: 'previous'}})
	}, [playlist.length]);

	return (
		<VideoPlayerBase
			{...rest}
			onJumpForward={handleNext}
			onJumpBackward={handlePrevious}
			onEnded={handleNext}
			loop={state.repeat.loop}
			poster={playlist[state.current].poster}
			thumbnailSrc={playlist[state.current].poster}
			title={playlist[state.current].videoTitle}
			infoComponents={playlist[state.current].videoDescription}
		>
			<source src={playlist[state.current].source} type="video/mp4" />
			<track ref={subtitleRef} id="subtitle-english" kind="subtitles" srcLang="en" src={playlist[state.current].track} label="English" default />

			<MediaControls
				actionGuideLabel={actionGuideLabel}
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
			</MediaControls>
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
	actionGuideLabel: PropTypes.string,

	/**
	 * Contains the list of videos to be played
	 *
	 * @type {Array}
	 */
	playlist: PropTypes.array
};

VideoPlayer.defaultProps = {
	actionGuideLabel: 'Press down button to Scroll'
};

export default VideoPlayer;
