import {LiveTable,
    LiveTableActionType,
    LiveTableActions,
    Insert as LiveTableInsertAction,
    Delete as LiveTableDeleteAction,
    Update as LiveTableUpdateAction,
    Move as LiveTableMoveAction
} from '../../types/live-table';


const insertData = (table: LiveTable, action: LiveTableInsertAction): LiveTable => {
    return [
        ...table.slice(0, action.data.pos),
        ...action.data.rows,
        ...table.slice(action.data.pos)
    ]
}

const deleteData = (table: LiveTable, action: LiveTableDeleteAction): LiveTable => {
    return table.filter(({id}) => !action.data.includes(id));
}

const updateData = (table: LiveTable, action: LiveTableUpdateAction): LiveTable => {
    return table.map(row => {
        const index = action.data.findIndex((updatedRow) => updatedRow.id === row.id);
        if (index !== -1) {
            return action.data[index];
        }
        return row;
    });
}

const moveData = (prevTable: LiveTable, action: LiveTableMoveAction): LiveTable => {
    const table = [...prevTable];
    action.data.forEach((move) => {
        table.splice(move.to, 0, table.splice(move.from, 1)[0]);
    });
    return table;
}

export const liveTableUpdate = (prevTable: LiveTable, actions: LiveTableActions): LiveTable => {
    let table = prevTable;
    actions.forEach((action) => {
        switch (action.type) {
            case LiveTableActionType.DATA:
                table = action.data;
                break;
            case LiveTableActionType.INSERT:
                table = insertData(table, action);
                break;
            case LiveTableActionType.DELETE:
                table = deleteData(table, action);
                break;
            case LiveTableActionType.UPDATE:
                table = updateData(table, action);
                break;
            case LiveTableActionType.MOVE:
                table = moveData(table, action);
                break;
        }
    });

    return table;
}
