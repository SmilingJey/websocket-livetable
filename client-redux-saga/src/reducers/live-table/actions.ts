import {LiveTableActions} from '../../types/live-table';
import {ConnectionStatus} from './reducer';

enum ActionType {
    CONNECT = 'LIVE_TABLE_CONNECT',
    DISCONNECT = 'LIVE_TABLE_DISCONNECT',
    SET_SERVER_STATUS = 'LIVE_TABLE_SET_SERVER_STATUS',
    CONNECTION_ERROR = 'LIVE_TABLE_CONNECTION_ERROR',
    UPDATE_DATA = 'LIVE_TABLE_UPDATE_DATA',
}

interface Action {
    type: ActionType,
    payload: any
}

const ActionCreator = {
    connect: () => ({
      type: ActionType.CONNECT,
      payload: null
    }),

    disconnect: () => ({
      type: ActionType.DISCONNECT,
      payload: null
    }),

    connectionError: (error: string) => ({
      type: ActionType.CONNECTION_ERROR,
      payload: error
    }),

    setConnectionStatus: (status: ConnectionStatus) => ({
      type: ActionType.SET_SERVER_STATUS,
      payload: status
    }),

    updateData: (changes: LiveTableActions) => ({
      type: ActionType.UPDATE_DATA,
      payload: changes
    }),
  };

export {ActionType, ActionCreator };
