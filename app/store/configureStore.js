import {applyMiddleware,createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistStore,autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import reducers from '../reducer';


const logger = store => next => action => {
	let result = next(action);
	return result;
}

let middlewares = [
	logger,
	thunk
];

let createAppStore = applyMiddleware(...middlewares)(createStore);


export default function configureStore(onComplete: ()=>void){
	const store = autoRehydrate()(createAppStore)(reducers);
	let opt = {
		storage: AsyncStorage,
		transform: [],
		//whitelist: ['userStore'],
	};
	persistStore(store, opt, onComplete);
	return store;
}