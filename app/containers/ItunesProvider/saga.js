import { put, call, takeLatest } from 'redux-saga/effects';
import { fetchSongs } from '@app/services/itunesApi';
import { ItunesProviderTypes, ItunesProviderCreators } from './reducer';

const { REQUEST_SONGS } = ItunesProviderTypes;
const { putSongs, failureGettingSongs } = ItunesProviderCreators;

export function* getSongs(action) {
  const response = yield call(fetchSongs, action.songName);
  const { data, ok } = response;
  if (ok) {
    ///API CALL SUCCESSFULL
    yield put(putSongs(data));
  } else {
    yield put(failureGettingSongs(data));
  }
}

export default function* ItunesProviderSaga() {
  yield takeLatest(REQUEST_SONGS, getSongs);
}
