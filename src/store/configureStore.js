import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from '../reducers';

const configureStore = () => {
	const middleware = [thunk];
	if (process.env.NODE_ENV !== 'production') {
		middleware.push(logger);
	}
	const middlewareEnhancer = applyMiddleware(...middleware);
	const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));
	return store;
};


export default configureStore;
