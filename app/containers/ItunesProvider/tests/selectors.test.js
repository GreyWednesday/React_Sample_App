import { selectItunesProvider, selectSongName, selectSongs, selectError } from '../selectors';

describe('ItunesProvider selector tests', () => {
  let mockedState;
  let songName;
  let songs;
  let songError;

  beforeEach(() => {
    songName = 'hey';
    songs = { totalCount: 1, items: [{ songName }] };
    songError = 'Unable to fetch songs';

    mockedState = {
      ItunesProvider: {
        songName,
        songs,
        error: songError
      }
    };
  });
  it('should select the ItunesProvider state', () => {
    const ItunesProviderSelector = selectItunesProvider();
    expect(ItunesProviderSelector(mockedState)).toEqual(mockedState.ItunesProvider);
  });
  it('should select the song name', () => {
    const songSelector = selectSongName();
    expect(songSelector(mockedState)).toEqual(songName);
  });

  it('should select songs', () => {
    const songsSelector = selectSongs();
    expect(songsSelector(mockedState)).toEqual(songs);
  });

  it('should select the error', () => {
    const errorSelector = selectError();
    expect(errorSelector(mockedState)).toEqual(songError);
  });
});
