const VideoPlayerReducer = (state, action) => {
	switch (action.type) {
		case 'repeat': {
			let repeatType = 0;
			let isLoop = false;
			if (state.repeat.type === 0) {
				repeatType = 1;
				isLoop = true;
			} else if (state.repeat.type === 1) {
				repeatType = 2;
				isLoop = false;
			} else {
				repeatType = 0;
				isLoop = false;
			}

			return {
				...state,
				repeat: {
					type: repeatType,
					loop: isLoop
				}
			};
		}

		case 'jump': {
			let isRepeat = 0;
			if (state.repeat.type === 0) {
				if (action.payload.playlistDirection === 'next') {
					isRepeat = action.payload.playlistLength === state.current ? 0 : state.current + 1;
				} else {
					isRepeat = state.current === 0 ? action.payload.playlistLength : state.current - 1;
				}
			} else if (state.repeat.type === 1) {
				isRepeat = state.current;
			} else {
				isRepeat = state.current;
			}
			return {
				...state,
				current: isRepeat
			};
		}

		case 'toggle': {
			return {
				...state,
				settings: {
					isOpen: false,
					position: action.position
				},
				subTitle: {
					isOpen: false,
					position: action.position
				},
				[action.payload]: {
					isOpen: !state[action.payload].isOpen,
					position: action.position
				}
			};
		}

		default:
			return state;
	}
};

export default VideoPlayerReducer;
