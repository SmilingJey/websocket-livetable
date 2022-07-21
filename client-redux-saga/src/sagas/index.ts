import {all} from 'redux-saga/effects';

import {liveTableConnect} from './live-table/live-table';

export default function* rootSaga() {
  yield all([
    liveTableConnect(),
  ]);
}

