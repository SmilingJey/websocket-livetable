import {ActionType} from './actions';
import {LiveTable} from '../../types/live-table';
import {liveTableUpdate} from './live-table-update';

export enum ConnectionStatus {
  CONNECTING = 'CONNECTING...',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

export type LiveTableStore = {
    status: ConnectionStatus,
    connectionError: string
    table: LiveTable
}

const initialState: LiveTableStore = {
    status: ConnectionStatus.OFFLINE,
    connectionError: '',
    table: []
};

export const reducer = (state: LiveTableStore = initialState, action: any): LiveTableStore  => {
    switch (action.type) {
        case ActionType.SET_SERVER_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case ActionType.CONNECTION_ERROR:
            return {
                ...state,
                connectionError: action.payload
            }
        case ActionType.UPDATE_DATA:
            return {
                ...state,
                table: liveTableUpdate(state.table, action.payload)
            }
    }

    return state;
}
