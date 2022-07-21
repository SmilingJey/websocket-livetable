import * as React from 'react';
import './app.module.css';
import LiveTable from '../live-table/live-table';

import { useDispatch, useSelector } from '../../services/store';

import {connect as connectLiveTable, disconnect as disconnectLiveTable} from '../../services/reducers/live-table/actions';
import { WebsocketStatus } from '../../types/live-table';

export const LIVE_TABLE_SERVER_URL = 'ws://localhost:3001';

const App = () => {
  const dispatch = useDispatch();
  const { table, status } = useSelector(state => state.liveTable);
  const isDisconnected = status !== WebsocketStatus.OFFLINE;

  const connect = () => dispatch(connectLiveTable(LIVE_TABLE_SERVER_URL));
  const disconnect = () => dispatch(disconnectLiveTable());

  /*dispatch((dispatch) => {
    dispatch(connectLiveTable(LIVE_TABLE_SERVER_URL))
    dispatch({
      type: "LIVE_TABLE_CONNECT",
      payload: 4563456 //ts проверит тип экшена
    })
  })*/

  let className = 'app__status';
  switch (status) {
    case WebsocketStatus.ONLINE:
      className += ' app__status--online';
      break;
    case WebsocketStatus.OFFLINE:
      className += ' app__status--offline';
      break;
    case WebsocketStatus.CONNECTING:
      className += ' app__status--connecting';
      break;
  }

  return (
    <div className='app'>
      <h3 className='app__header'>Live table</h3>
      <p>
        Connection status: <span className={className}>{status}</span>
      </p>
      <div>
        <button className='app__button app__button--connect' onClick={connect} disabled={isDisconnected}>Connect</button>
        <button className='app__button app__button--disconnect' onClick={disconnect} disabled={!isDisconnected}>Disconnect</button>
      </div>
      <LiveTable table={table}/>
    </div>
  );
}

export default App;


