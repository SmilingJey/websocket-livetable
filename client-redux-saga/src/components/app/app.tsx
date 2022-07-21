import * as React from 'react';
import './app.css';
import LiveTable from '../live-table/live-table';
import { connect } from 'react-redux';
import { getTable, getConnectionStaus } from '../../reducers/live-table/selectors';
import { ActionCreator as LiveTableActionCreator} from '../../reducers/live-table/actions';
import { LiveTable as LiveTableData} from '../../types/live-table';
import { ReduxStore } from '../../reducers/';
import { ConnectionStatus } from '../../reducers/live-table/reducer';

interface IStateProps {
  table: LiveTableData,
  connectionStatus: ConnectionStatus
}

interface IActionProps {
  connect: () => void,
  disconnect: () => void,
}

class App extends React.Component<IStateProps & IActionProps, {}> {
  componentDidMount() {
    this.props.connect()
  }

  componentWillUnmount() {
    //this.disconnectFromServer();
  }

  render() {
    const { table, connectionStatus, connect, disconnect } = this.props;
    const isDisconnected = connectionStatus !== ConnectionStatus.OFFLINE;

    let className = 'app__status';
    switch (connectionStatus) {
      case ConnectionStatus.ONLINE:
        className += ' app__status--online';
        break;
      case ConnectionStatus.OFFLINE:
        className += ' app__status--offline';
        break;
      case ConnectionStatus.CONNECTING:
        className += ' app__status--connecting';
        break;
    }

    return (
      <div className='app'>
        <h3 className='app__header'>Live table</h3>
        <p>
          Connection status: <span className={className}>{connectionStatus}</span>
        </p>
        <div>
          <button className='app__button app__button--connect' onClick={connect} disabled={isDisconnected}>Connect</button>
          <button className='app__button app__button--disconnect' onClick={disconnect} disabled={!isDisconnected}>Disconnect</button>
        </div>
        <LiveTable table={table}/>
      </div>
    );
  }


}

const mapStateToProps = (state: ReduxStore): IStateProps => ({
  table: getTable(state),
  connectionStatus: getConnectionStaus(state),
});

const mapDispatchToProps = (dispatch : (action: any) => void): IActionProps => ({
  connect: () => dispatch(LiveTableActionCreator.connect()),
  disconnect: () => dispatch(LiveTableActionCreator.disconnect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


