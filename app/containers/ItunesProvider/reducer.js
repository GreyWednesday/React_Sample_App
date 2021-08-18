import { createActions } from 'reduxsauce';
import produce from 'immer';
import get from 'lodash/get';

export const { Types: ItunesProviderTypes, Creators: ItunesProviderCreators } = createActions({
  requestSongs: ['songName'],
  requestSongDetail: ['trackId'],
  putSongs: ['data'],
  putTrackDetails: ['data'],
  failureGettingSongs: ['error'],
  clearSongs: [],
  clearTrackDetails: []
});

export const initialState = { songName: null, trackDetails: null, songs: {}, error: null };

export const ItunesProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ItunesProviderTypes.REQUEST_SONGS:
        draft.songName = action.songName;
        break;
      case ItunesProviderTypes.PUT_SONGS:
        draft.songs = action.data;
        break;
      case ItunesProviderTypes.PUT_TRACK_DETAILS:
        draft.trackDetails = action.data;
        break;
      case ItunesProviderTypes.FAILURE_GETTING_SONGS:
        draft.error = get(action.error, 'message', 'Unable to fetch songs');
        break;
      case ItunesProviderTypes.CLEAR_SONGS:
        return initialState;
      case ItunesProviderTypes.CLEAR_TRACK_DETAILS:
        draft.trackDetails = null;
        break;
      default:
        return;
    }
  });

export default ItunesProviderReducer;
