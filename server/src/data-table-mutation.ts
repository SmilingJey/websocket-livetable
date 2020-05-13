import {DataTable, TableRow, TableShift} from './data-table';

const WORDS = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
sunt in culpa qui officia deserunt mollit anim id est laborum.`.split(' ');


interface mutationConfig {
    minCount: number,
    maxCount: number
}

const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomWords = (): string => {
    const word1Index = Math.floor(Math.random() *  WORDS.length);
    const word2Index = Math.floor(Math.random() *  WORDS.length);
    const word3Index = Math.floor(Math.random() *  WORDS.length);
    return WORDS[word1Index] + ' ' + WORDS[word2Index] + ' ' + WORDS[word3Index];
}

const insertRows = (dataTable: DataTable, {minCount, maxCount}: mutationConfig) => {
    const wordsCount = getRandomInt(minCount, maxCount)
    const words = new Array(wordsCount).fill('').map(getRandomWords);
    dataTable.insert(words);
}

const deleteRows = (dataTable: DataTable, {minCount, maxCount}: mutationConfig) => {
    const table = dataTable.getTable();
    const deleteCount = getRandomInt(minCount, maxCount);
    let deleteIndexes: Array<number> = [];
    if (deleteCount >= table.length) {
        deleteIndexes = table.map(item => item.id);
    } else {
        while(deleteIndexes.length < deleteCount) {
            const id = table[Math.floor(Math.random() *  table.length)].id;
            if (!deleteIndexes.includes(id)) deleteIndexes.push(id);
        }
    } 

    dataTable.delete(deleteIndexes);
}

const updateRows = (dataTable: DataTable, {minCount, maxCount}: mutationConfig) => {
    const table = dataTable.getTable();
    const updateCount = getRandomInt(minCount, maxCount);
    let updateIndexes: Array<number> = [];
    if (updateCount >= table.length) {
        updateIndexes = table.map(item => item.id);
    } else {
        while(updateIndexes.length < updateCount) {
            const id = table[Math.floor(Math.random() *  table.length)].id;
            if (!updateIndexes.includes(id)) updateIndexes.push(id);
        }
    } 

    const updatedData = updateIndexes.map( id => ({
        id, text: getRandomWords()
    }));

    dataTable.update(updatedData);
}

const moveRows = (dataTable: DataTable, {minCount, maxCount}: mutationConfig) => {
    const tableLength = dataTable.getTable().length;
    if (tableLength < 2) return;
    const moveCount = getRandomInt(minCount, maxCount);
    const shifts: Array<TableShift> = [];
    while(shifts.length < moveCount) {
        const to = Math.floor(Math.random() * tableLength);
        const from = Math.floor(Math.random() * tableLength);
        if (to !== from) shifts.push({ to, from});
    }
    dataTable.move(shifts);
}

const startTableMutation = (table: DataTable , insertPeriod: number, deletePereiod: number,
                            updatePeriod: number, movePeriod: number) => {
    setInterval(updateRows, updatePeriod, table, {minCount: 1, maxCount: 5});
    setInterval(moveRows, movePeriod, table, {minCount: 1, maxCount: 5});
    setInterval(insertRows, insertPeriod, table, {minCount: 1, maxCount: 5});
    setTimeout(() => {
        setInterval(deleteRows, deletePereiod, table, {minCount: 1, maxCount: 5});
    }, insertPeriod/2);
}

export {insertRows, deleteRows, updateRows, moveRows, startTableMutation};