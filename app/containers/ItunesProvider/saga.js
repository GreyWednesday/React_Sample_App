import { put, call, takeLatest, select } from 'redux-saga/effects';
import { fetchSongs, fetchSongForDetail } from '@app/services/itunesApi';
import { ItunesProviderTypes, ItunesProviderCreators } from './reducer';
import { selectSongs } from './selectors';

const { REQUEST_SONGS, REQUEST_SONG_DETAIL } = ItunesProviderTypes;
const { putSongs, putTrackDetails, failureGettingSongs } = ItunesProviderCreators;

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

export function* getSongsByTrackId(action) {
  const songs = yield select(selectSongs());
  const trackId = parseInt(action.trackId);
  const foundSong = songs?.results?.find((song) => song.trackId === trackId);
  if (foundSong) {
    yield put(putTrackDetails(foundSong));
  } else {
    const response = yield call(fetchSongForDetail, action.trackId);
    const { data, ok } = response;
    if (ok) {
      yield put(putTrackDetails(data.results[0]));
    }
  }
}

export default function* ItunesProviderSaga() {
  yield takeLatest(REQUEST_SONGS, getSongs);
  yield takeLatest(REQUEST_SONG_DETAIL, getSongsByTrackId);
}
