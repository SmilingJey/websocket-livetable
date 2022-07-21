import {combineReducers} from 'redux';
import {reducer as liveTableReducer} from './live-table/reducer';
import NameSpace from './name-spaces';

export const rootReducer = combineReducers({
  [NameSpace.LIVE_TABLE]: liveTableReducer,
});

export type ReduxStore = ReturnType<typeof rootReducer>
