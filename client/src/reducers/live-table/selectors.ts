import {LiveTable} from '../../types/live-table';
import NameScape from '../name-spaces';
import { ReduxStore } from '../index';
import {ConnectionStatus} from './reducer';

export const getTable = (state: ReduxStore):LiveTable => state[NameScape.LIVE_TABLE].table || [];

export const getConnectionStaus = (state: ReduxStore):ConnectionStatus => state[NameScape.LIVE_TABLE].status;
