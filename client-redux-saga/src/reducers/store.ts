import {createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';

import { rootReducer } from './index';
import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();

const store = {
  ...createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware))),
  runSaga: sagaMiddleware.run,
};

store.runSaga(rootSaga);

export default store;
