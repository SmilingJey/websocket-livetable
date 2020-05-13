import * as events from 'events';

interface TableRow {
    id: number;
    text: string;
}

interface TableShift {
    from: number;
    to: number;
}

class DataTable extends events.EventEmitter {
    private index: number = 0;
    private table: Array<TableRow> = [];

    private getNewId() : number {
        return this.index++;
    }

    getTable() {
        return this.table;
    }

    insert(data: Array<string>, pos = this.table.length) {
        const insertedData = data.map(text => ({id: this.getNewId(), text})) ;
        this.table.splice( pos, 0, ...insertedData);
        this.emit('insert', {rows: insertedData, pos});
    }

    delete(indexes: Array<number>) {
        this.table = this.table.filter(row => !indexes.includes(row.id));
        this.emit('delete', indexes);
    }

    update(rows: Array<TableRow>) {
        const updatedData: Array<TableRow> = [];
        rows.forEach(({id, text}) => {
            const index = this.table.findIndex((row) => row.id === id);
            if (index !== -1) {
                this.table[index].text = text;
                updatedData.push(this.table[index]);
            }
        });
        this.emit('update', updatedData);
    }

    move(shifts: Array<TableShift>) {
        shifts.forEach((shift) => {
            this.table.splice(shift.to, 0, this.table.splice(shift.from, 1)[0]);
        });
        this.emit('move', shifts);
    }
}

export {DataTable, TableRow, TableShift};