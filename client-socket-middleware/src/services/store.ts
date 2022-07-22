import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import rootReducer from './reducers';

import { socketMiddleware } from './middleware/socket-middleware';

//add to fix https://github.com/reduxjs/redux-thunk/issues/333
import type {} from 'redux-thunk/extend-redux'

import { 
  connect as LiveTableWsConnect, 
  disconnect as LiveTableWsDisconnect,
  wsConnecting as LiveTableWsConnecting,
  wsOpen as LiveTableWsOpen,
  wsClose as LiveTableWsClose,
  wsMessage as LiveTableWsNessage,
  wsError as LiveTableWsError 
} from "./reducers/live-table/actions";

import { TLiveTableActions } from './reducers/live-table/actions';
import {ThunkAction} from "redux-thunk";

const wsActions = {
  wsConnect: LiveTableWsConnect,
  wsDisconnect: LiveTableWsDisconnect,
  wsConnecting: LiveTableWsConnecting,
  onOpen: LiveTableWsOpen,
  onClose: LiveTableWsClose,
  onError: LiveTableWsError,
  onMessage: LiveTableWsNessage,
};

const liveTableMiddleware = socketMiddleware(wsActions);

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveTableMiddleware)
  }
})
/*
export type AppDispatch = typeof store.dispatch
export const useDispatch = () => dispatchHook<AppDispatch>()
*/

export type AppActions = TLiveTableActions;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>
/*
type Dispatch<TReturnType = void> = (action: AppActions | AppThunk) => TReturnType;
export const useDispatch = () => dispatchHook<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
*/

//fix Thunk typing https://github.com/reduxjs/redux-thunk/issues/333 
type AppDispatch<TReturnType = void> = (action: AppActions | AppThunk) => TReturnType;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;