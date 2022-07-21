import { eventChannel } from 'redux-saga';
import { call, put, take, fork, cancel, cancelled } from 'redux-saga/effects';
import { ActionCreator as LiveTableActionCreator,
         ActionType as LiveTableActionType } from '../../reducers/live-table/actions';
import { LIVE_TABLE_SERVER_URL } from '../../config';
import { w3cwebsocket } from 'websocket';
import { ConnectionStatus } from '../../reducers/live-table/reducer';

const RECONNECT_TIME = 1000;

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

function createWebSocketConnection() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(LIVE_TABLE_SERVER_URL);

    socket.onclose = function(event) {}

    socket.onopen = function () {
      resolve(socket);
    };

    socket.onerror = function (evt) {
      reject(evt);
    }
  });
}

function createSocketChannel(socket: w3cwebsocket) {
  return eventChannel(emit => {
    socket.onmessage = (event) => {
      emit(event.data)
    };

    socket.onclose = () => {
      emit(new Error())
    };

    socket.onerror = (errorEvent) => {
      emit(new Error(errorEvent.message))
    }

    const unsubscribe = () => {
      socket.onmessage = () => {}
      socket.close();
    };

    return unsubscribe;
  });
}

function* listenForSocketMessages() {
  let socket;
  let socketChannel;

  try {
    while (true) {
      try {
        yield put(LiveTableActionCreator.setConnectionStatus(ConnectionStatus.CONNECTING));
        socket = yield call(createWebSocketConnection);
        socketChannel = yield call(createSocketChannel, socket);
        yield put(LiveTableActionCreator.setConnectionStatus(ConnectionStatus.ONLINE));
        while (true) {
          const payload = yield take(socketChannel);
          yield put(LiveTableActionCreator.updateData(JSON.parse(payload)));
        }
      } catch (error) {
        yield put(LiveTableActionCreator.connectionError(`WebSocket error: ${error}`));
      } finally {
        if (socket) socket.close();
        if (socketChannel) socketChannel.close();
        yield delay(RECONNECT_TIME);
      }
    }
  }finally {
    if (yield cancelled()) {
      if (socketChannel) socketChannel.close();
      if (socket) socket.close();
      yield put(LiveTableActionCreator.setConnectionStatus(ConnectionStatus.OFFLINE));
    }
  }

}

export function* liveTableConnect() {
  while (true) {
    yield take(LiveTableActionType.CONNECT);
    const socketTask = yield fork(listenForSocketMessages);
    yield take(LiveTableActionType.DISCONNECT);
    yield cancel(socketTask);
  }
}
