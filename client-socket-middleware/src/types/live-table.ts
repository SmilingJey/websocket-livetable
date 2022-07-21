export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface TableRow {
    id: number;
    text: string;
}

export type LiveTable = Array<TableRow>;

export enum LiveTableActionType {
    DATA = 'data',
    INSERT = 'insert',
    DELETE = 'delete',
    UPDATE = 'update',
    MOVE = 'move',
}

export type Data = {
    type: LiveTableActionType.DATA,
    data: LiveTable
}

export type Insert = {
    type: LiveTableActionType.INSERT,
    data: {
        rows: Array<TableRow>,
        pos: number
    }
}

export type Update = {
    type: LiveTableActionType.UPDATE,
    data: LiveTable
}

export type Delete = {
    type: LiveTableActionType.DELETE,
    data: Array<number>
}

export type Move = {
    type: LiveTableActionType.MOVE,
    data: Array<{from: number, to: number}>
}

export type LiveTableAction = Insert | Data | Delete | Update | Move;

export type LiveTableActions = Array<LiveTableAction>;


