/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchSongs } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import ItunesProviderSaga, { getSongs } from '../saga';
import { ItunesProviderTypes } from '../reducer';

describe('ItunesProvider saga tests', () => {
  const generator = ItunesProviderSaga();
  const songName = 'hey';
  let getSongGenerator = getSongs({ songName });

  it('should start task to watch for REQUEST_SONG action', () => {
    expect(generator.next().value).toEqual(takeLatest(ItunesProviderTypes.REQUEST_SONGS, getSongs));
  });

  it('should ensure that the action FAILURE_GETTING_SONGS is dispatched when the api call fails', () => {
    const res = getSongGenerator.next().value;
    expect(res).toEqual(call(fetchSongs, songName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(getSongGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: ItunesProviderTypes.FAILURE_GETTING_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action FETCH_SONGS is dispatched when the api call succeeds', () => {
    let getSongsGenerator = getSongs({ songName });
    const res = getSongsGenerator.next().value;
    expect(res).toEqual(call(fetchSongs, songName));
    const songsResponse = {
      totalCount: 1,
      items: [{ songName: songName }]
    };
    expect(getSongsGenerator.next(apiResponseGenerator(true, songsResponse)).value).toEqual(
      put({
        type: ItunesProviderTypes.PUT_SONGS,
        data: songsResponse
      })
    );
  });
});
