/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchSongForDetail, fetchSongs } from '@app/services/itunesApi';
import { apiResponseGenerator, timeout } from '@utils/testUtils';
import ItunesProviderSaga, { getSongs, getSongsByTrackId } from '../saga';
import { ItunesProviderTypes } from '../reducer';

describe('ItunesProvider saga tests', () => {
  const generator = ItunesProviderSaga();
  const songName = 'hey';
  const trackId = '1469577741';
  let getSongGenerator = getSongs({ songName });

  it('should start task to watch for REQUEST_SONG & REQUEST_SONG_DETAIL action', () => {
    expect(generator.next().value).toEqual(takeLatest(ItunesProviderTypes.REQUEST_SONGS, getSongs));
    expect(generator.next().value).toEqual(takeLatest(ItunesProviderTypes.REQUEST_SONG_DETAIL, getSongsByTrackId));
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

  it('should ensure that the action PUT_SONGS is dispatched when the api call succeeds', () => {
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

  it('should find song using trackid and then make an api call and then call action PUT_TRACK_DETAILS', async () => {
    let trackDetailGenerator = getSongsByTrackId({ trackId });
    const trackDetail = {
      results: [{ songName: songName }]
    };
    trackDetailGenerator.next();
    const res = trackDetailGenerator.next().value;
    await timeout(200);
    expect(res).toEqual(call(fetchSongForDetail, trackId));
    expect(trackDetailGenerator.next(apiResponseGenerator(true, trackDetail)).value).toEqual(
      put({
        type: ItunesProviderTypes.PUT_TRACK_DETAILS,
        data: trackDetail.results[0]
      })
    );
  });

  // it('should find song using trackid and then call action PUT_TRACK_DETAILS', async () => {
  //   const demoInfo = {
  //     trackId: 1469577741,
  //     trackName: 'Upside Down',
  //     previewUrl:
  //       'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/5b/3d/5e5b3df4-deb5-da78-5d64-fe51d8404d5c/mzaf_13341178261601361485.plus.aac.p.m4a',
  //     artworkUrl100:
  //       'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ae/4c/d4/ae4cd42a-80a9-d950-16f5-36f01a9e1881/source/100x100bb.jpg'
  //   }
  //   const songs = {
  //     results: [
  //       demoInfo
  //     ]
  //   };

  //   let trackDetailGenerator = getSongsByTrackId({ trackId });
  //   const trackDetail = {
  //     results: [demoInfo]
  //   };

  //   console.log("BOOM")
  //   trackDetailGenerator.next(() => ({songs}));
  //   console.log("BOOM END")
  //   //const res = trackDetailGenerator.next().value;
  //   await timeout(200);
  //   expect(trackDetailGenerator.next().value).toEqual(
  //     put({
  //       type: ItunesProviderTypes.PUT_TRACK_DETAILS,
  //       data: trackDetail.results[0]
  //     })
  //   );
  // });
});
