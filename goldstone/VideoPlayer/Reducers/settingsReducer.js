const settingsReducer = (state, action) => {
	switch (action.type) {
		case 'navigate':
			return {
				...state,
				level: action.payload
			};
		case 'selected':
			return {
				...state,
				level: '',
				items: {
					...state.items,
					[state.level]: {
						...state.items[state.level],
						children: {
							...state.items[state.level].children,
							index: action.payload
						}
					}
				}
			};
		default:
			return state;
	}
};

export default settingsReducer;
