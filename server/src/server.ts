import Websocket from 'ws';
import {DataTable} from './data-table';
import {insertRows, startTableMutation} from './data-table-mutation';

const MUTATION_INSERT_PERIOD = 2000;
const MUTATION_DELETE_PERIOD = 2000;
const MUTATION_UPDATE_PERIOD = 2000;
const MUTATION_MOVE_PERIOD = 2000;
const INIT_TABLE_SIZE = 100;

// init data table
const table = new DataTable();
insertRows(table, {minCount: INIT_TABLE_SIZE, maxCount: INIT_TABLE_SIZE});
startTableMutation(table, MUTATION_INSERT_PERIOD, 
                          MUTATION_DELETE_PERIOD, 
                          MUTATION_UPDATE_PERIOD, 
                          MUTATION_MOVE_PERIOD);

// init websocket server               
const server = new Websocket.Server({ port: 3001 });

server.on('connection', client => {
    console.log('client connected');
    client.send(JSON.stringify([{
        type: 'data',
        data: table.getTable()
    }]));
})

// init table change monitorung and distribution of data changes  
const onTableChange = (changes: any) => {
    console.clear();
    console.table(table.getTable());

    server.clients.forEach(client => {
        if (client.readyState === Websocket.OPEN) {
            client.send(JSON.stringify(changes));
        }
    });
};

table.on('insert', (data) => {
    onTableChange([{ type : 'insert', data }]);
});

table.on('update', (data) => {
    onTableChange([{ type : 'update', data }]);
});

table.on('delete', (data) => {
    onTableChange([{ type : 'delete', data }]);
});

table.on('move', (data) => {
    onTableChange([{ type : 'move', data }]);
});

