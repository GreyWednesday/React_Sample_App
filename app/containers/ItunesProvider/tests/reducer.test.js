import { ItunesProviderReducer, initialState, ItunesProviderTypes } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ItunesProvider reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(ItunesProviderReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type GET_SONG is dispatched', () => {
    const songName = 'hey';
    const expectedResult = { ...state, songName };
    expect(
      ItunesProviderReducer(state, {
        type: ItunesProviderTypes.REQUEST_SONGS,
        songName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the song data is present in store when PUT_SONGS is dispatched', () => {
    const data = { song: 'Hey' };
    const expectedResult = { ...state, songs: data };
    expect(
      ItunesProviderReducer(state, {
        type: ItunesProviderTypes.PUT_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data when FAILURE_GETTING_SONG is dispatched', () => {
    const error = 'Unable to fetch songs';
    const expectedResult = { ...state, error: error };
    expect(
      ItunesProviderReducer(state, {
        type: ItunesProviderTypes.FAILURE_GETTING_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should return the initial state when CLEAR_SONGS is dispatched', () => {
    expect(
      ItunesProviderReducer(state, {
        type: ItunesProviderTypes.CLEAR_SONGS
      })
    ).toEqual(state);
  });
});
